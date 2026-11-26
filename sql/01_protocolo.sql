-- Migración inicial, una sola vez en una copia de prueba. Todo o nada.
begin;
set local lock_timeout = '5s';
-- Impedir la instalación accidental sobre una copia sin RLS o sin las tablas esperadas.
do $$
declare t text;
begin
 foreach t in array array['meals','water_entries','daily_steps','goals'] loop
   if not exists (select from pg_class where oid=to_regclass(format('public.%I',t))
                  and relkind='r' and relrowsecurity) then
     raise exception 'Falta la tabla con RLS activa: %', t;
   end if;
 end loop;
end $$;
create role ct_sync_executor nologin inherit nobypassrls;
grant authenticated to ct_sync_executor;
grant ct_sync_executor to current_user;
create schema ct_sync_private;
revoke all on schema ct_sync_private from public, anon, authenticated;
grant usage on schema ct_sync_private, public, auth to ct_sync_executor;
grant select, insert, update, delete on public.meals, public.water_entries, public.daily_steps, public.goals to ct_sync_executor;

create table ct_sync_private.heads (
  owner_id uuid not null references auth.users(id) on delete cascade,
  entity text not null, item text not null, version uuid not null, removed boolean not null,
  primary key(owner_id,entity,item)
);
create table ct_sync_private.receipts (
  owner_id uuid not null references auth.users(id) on delete cascade,
  operation uuid not null, fingerprint text not null, result jsonb not null,
  primary key(owner_id,operation)
);
alter table ct_sync_private.heads enable row level security;
alter table ct_sync_private.receipts enable row level security;
create policy own_heads on ct_sync_private.heads to ct_sync_executor
 using(owner_id=auth.uid()) with check(owner_id=auth.uid());
create policy own_receipts on ct_sync_private.receipts to ct_sync_executor
 using(owner_id=auth.uid()) with check(owner_id=auth.uid());
revoke all on all tables in schema ct_sync_private from public,anon,authenticated;
grant select,insert,update on ct_sync_private.heads to ct_sync_executor;
grant select,insert on ct_sync_private.receipts to ct_sync_executor;

-- Una sola sentencia SELECT: las filas y sus versiones son de la misma instantánea.
create function public.ct_snapshot_v3() returns jsonb
language sql stable security definer set search_path = '' as $$
 select jsonb_build_object('owner',auth.uid(),
  'meals',coalesce((select jsonb_agg(to_jsonb(m) order by created_at,id) from public.meals m where user_id=auth.uid()),'[]'),
  'water',coalesce((select jsonb_agg(to_jsonb(w) order by created_at,id) from public.water_entries w where user_id=auth.uid()),'[]'),
  'steps',coalesce((select jsonb_object_agg(entry_date,steps) from public.daily_steps where user_id=auth.uid()),'{}'),
  'goal',(select to_jsonb(g) from public.goals g where user_id=auth.uid()),
  'versions',coalesce((select jsonb_object_agg(entity||':'||item,version) from ct_sync_private.heads where owner_id=auth.uid()),'{}'))
$$;

create function public.ct_apply_v3(op jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
 u uuid := auth.uid(); oid_op uuid := (op->>'id')::uuid;
 entity_key text := op->>'entity'; item_key text := op->>'item';
 base uuid := (op->>'base')::uuid; v uuid; deleted boolean;
 payload jsonb := op->'value'; action text := op->>'action';
 reply jsonb; receipt ct_sync_private.receipts%rowtype;
 digest_text text := encode(sha256(convert_to(op::text,'UTF8')),'hex');
begin
 if u is null or (op->>'owner')::uuid is distinct from u then raise exception 'Cuenta incorrecta'; end if;
 if oid_op is null or not (op ? 'base') or item_key is null or action is null or entity_key is null
 or entity_key not in ('meals','water','steps','goal') or action not in ('put','delete')
 or (entity_key='goal' and (item_key<>'self' or action='delete')) then raise exception 'Operación inválida'; end if;
 if entity_key in ('meals','water') and (item_key::uuid)::text <> item_key then raise exception 'UUID no canónico'; end if;
 if entity_key='steps' and (item_key::date)::text <> item_key then raise exception 'Fecha no canónica'; end if;
 perform pg_advisory_xact_lock(hashtextextended(u::text,0));
 select * into receipt from ct_sync_private.receipts where owner_id=u and operation=oid_op;
 if found then
   if receipt.fingerprint<>digest_text then raise exception 'ID reutilizado con otro contenido'; end if;
   return receipt.result;
 end if;
 select version,removed into v,deleted from ct_sync_private.heads
 where owner_id=u and entity=entity_key and item=item_key;
 -- NULL designa la revisión inicial, también para filas anteriores a la migración.
 if base is distinct from v or (action='put' and entity_key in ('meals','water') and v is not null) then
   reply := jsonb_build_object('status','conflict','version',v,'removed',deleted);
 else
   if action='delete' then
     case entity_key
       when 'meals' then delete from public.meals where user_id=u and id=item_key::uuid;
       when 'water' then delete from public.water_entries where user_id=u and id=item_key::uuid;
       when 'steps' then delete from public.daily_steps where user_id=u and entry_date=item_key::date;
     end case;
   elsif entity_key='steps' then
     insert into public.daily_steps(user_id,entry_date,steps) values(u,item_key::date,(payload->>'steps')::integer)
     on conflict(user_id,entry_date) do update set steps=excluded.steps;
   elsif entity_key='goal' then
     insert into public.goals(user_id,calories,protein,carbs,fats,updated_at)
     values(u,(payload->>'calories')::numeric,(payload->>'protein')::numeric,(payload->>'carbs')::numeric,(payload->>'fats')::numeric,now())
     on conflict(user_id) do update set calories=excluded.calories, protein=excluded.protein,
       carbs=excluded.carbs,fats=excluded.fats,updated_at=now();
   else
     begin
       if entity_key='meals' then
         insert into public.meals(id,user_id,meal_date,name,calories,protein,carbs,fats,details)
         values(item_key::uuid,u,(payload->>'date')::date,coalesce(payload->>'description',payload->>'type','Comida'),
         (payload->>'calories')::numeric,(payload->>'protein')::numeric,(payload->>'carbs')::numeric,(payload->>'fats')::numeric,payload);
       else
         insert into public.water_entries(id,user_id,entry_date,amount_ml,details)
         values(item_key::uuid,u,(payload->>'date')::date,(payload->>'ml')::numeric,payload);
       end if;
     exception when unique_violation then
       reply := jsonb_build_object('status','conflict','version',v);
     end;
   end if;
   if reply is null then
     insert into ct_sync_private.heads values(u,entity_key,item_key,oid_op,action='delete')
     on conflict(owner_id,entity,item) do update set version=excluded.version,removed=excluded.removed;
     reply := jsonb_build_object('status','applied','version',oid_op);
   end if;
 end if;
 insert into ct_sync_private.receipts values(u,oid_op,digest_text,reply);
 return reply;
end $$;
grant create on schema public to ct_sync_executor;
alter function public.ct_apply_v3(jsonb) owner to ct_sync_executor;
alter function public.ct_snapshot_v3() owner to ct_sync_executor;
revoke create on schema public from ct_sync_executor;
revoke all on function public.ct_apply_v3(jsonb),public.ct_snapshot_v3() from public,anon,authenticated;
grant execute on function public.ct_apply_v3(jsonb),public.ct_snapshot_v3() to authenticated;
-- Las escrituras directas antiguas no participan en el control de versión.
-- Políticas adicionales solo para escritura; se conservan las políticas de propietario.
do $$
declare t text;
begin
 foreach t in array array['meals','water_entries','daily_steps','goals'] loop
   execute format('create policy ct_protocol_insert on public.%I as restrictive for insert to authenticated with check (current_user = %L)',t,'ct_sync_executor');
   execute format('create policy ct_protocol_update on public.%I as restrictive for update to authenticated using (current_user = %L) with check (current_user = %L)',t,'ct_sync_executor','ct_sync_executor');
   execute format('create policy ct_protocol_delete on public.%I as restrictive for delete to authenticated using (current_user = %L)',t,'ct_sync_executor');
 end loop;
end $$;
commit;
