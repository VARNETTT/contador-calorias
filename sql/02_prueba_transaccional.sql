-- SOLO copia de prueba. Reemplazar ambos valores por los UUID de usuarios ficticios.
begin;
select set_config('ctqa.a','REEMPLAZAR_UUID_A',true),
       set_config('ctqa.b','REEMPLAZAR_UUID_B',true);
do $$
begin
 if current_setting('ctqa.a')::uuid = current_setting('ctqa.b')::uuid
 or (select count(*) from auth.users where id in (current_setting('ctqa.a')::uuid,current_setting('ctqa.b')::uuid)) <> 2
 then raise exception 'Se necesitan dos cuentas ficticias distintas'; end if;
end $$;
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('ctqa.a'),true),
       set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('ctqa.a'),'role','authenticated')::text,true);
do $$
declare
 a uuid := auth.uid(); b uuid := current_setting('ctqa.b')::uuid;
 k uuid := gen_random_uuid(); token uuid := gen_random_uuid();
 op jsonb; reply jsonb; removal jsonb; first_reply jsonb; snap jsonb;
begin
 if a is distinct from current_setting('ctqa.a')::uuid then raise exception 'Identidad A inválida'; end if;
 op := jsonb_build_object('owner',a,'id',token,'item',k,'entity','meals','action','put','base',null,
                          'value',jsonb_build_object('date',current_date,'description','QA transaccional','calories',100));
 first_reply := public.ct_apply_v3(op);
 if first_reply->>'status' is distinct from 'applied' then raise exception 'Alta fallida'; end if;
 if (select count(*) from public.meals where id=k) <> 1 then raise exception 'Fila propia ausente'; end if;
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'role','authenticated')::text,true);
 snap := public.ct_snapshot_v3();
 if snap->>'owner' is distinct from b::text or exists(select from public.meals where id=k)
 or exists(select from jsonb_array_elements(snap->'meals') x where x->>'id'=k::text)
 then raise exception 'Aislamiento fallido'; end if;
 perform set_config('request.jwt.claim.sub',a::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',a,'role','authenticated')::text,true);
 removal:=op||jsonb_build_object('id',gen_random_uuid(),'base',token,'action','delete','value',null);
 reply:=public.ct_apply_v3(removal);
 if reply->>'status' is distinct from 'applied' then raise exception 'Borrado fallido'; end if;
 if public.ct_apply_v3(op) is distinct from first_reply then raise exception 'Recibo alterado'; end if;
 if exists(select from public.meals where id=k) then raise exception 'El alta reapareció'; end if;
 op:=jsonb_build_object('owner',a,'entity','goal','item','self','id',gen_random_uuid(),
    'action','put','base',public.ct_snapshot_v3()->'versions'->'goal:self',
    'value',jsonb_build_object('calories',1800,'protein',120,'carbs',null,'fats',null));
 reply:=public.ct_apply_v3(op);
 if reply->>'status' is distinct from 'applied' then raise exception 'Objetivo inicial fallido'; end if;
 reply:=public.ct_apply_v3(op||jsonb_build_object('id',gen_random_uuid()));
 if reply->>'status' is distinct from 'conflict' then raise exception 'Conflicto de objetivo ignorado'; end if;
end $$;
rollback;
