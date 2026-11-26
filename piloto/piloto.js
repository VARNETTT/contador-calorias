'use strict';
const el = id => document.getElementById(id);
const msg = text => { el('msg').textContent = text; };
const fields = {meals:'calorietrack_meals_v2',water:'calorietrack_water_v1',steps:'calorietrack_steps_v1',goal:'calorietrack_goal_v2'};
let engine;
const today = new Date();
el('date').value = [today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
function draw(){
  const data = Object.fromEntries(Object.entries(fields).map(([name,key])=>[name,engine.read(key,null)]));
  const selector=el('items');
  selector.replaceChildren();
  for(const kind of ['meals','water','steps']){
    const ids=kind==='steps'?Object.keys(data.steps||{}):(data[kind]||[]).map(r=>r.id);
    for(const id of ids) selector.add(new Option(kind+' · '+id,JSON.stringify([kind,id])));
  }
  el('state').textContent=JSON.stringify({datos:data,pendientes:engine.pending(),conflictos:engine.conflicts()},null,2);
}
function button(id,fn){
  el(id).onclick=async()=>{try{await fn();}catch(e){msg(e.message||String(e));}finally{if(engine)draw();}};
}
el('login').onsubmit=async event=>{
  event.preventDefault();
  try{
    const url=new URL(el('url').value);
    if(!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url.origin)||url.hostname==='sbvpzvqysmjkmjfmdnqc.supabase.co'||url.username||url.password) throw Error('Indicá la URL HTTPS de una copia de prueba.');
    const key=el('key').value.trim();
    if(!key.startsWith('sb_publishable_')) throw Error('Usá la publishable key de la copia.');
    const headers={apikey:key,'Content-Type':'application/json'};
    const response=await fetch(url.origin+'/auth/v1/token?grant_type=password',{method:'POST',headers,
      body:JSON.stringify({email:el('email').value,password:el('pw').value})});
    el('pw').value='';
    if(!response.ok)throw Error('Revisá el acceso de la cuenta de prueba.');
    const session=await response.json();
    const client={auth:{getSession:async()=>({data:{session}}),onAuthStateChange(){}},
      async rpc(name,args){
        if(el('offline').checked)throw Error('Envíos pausados por la prueba.');
        const r=await fetch(url.origin+'/rest/v1/rpc/'+name,{method:'POST',
          headers:{...headers,Authorization:'Bearer '+session.access_token},body:JSON.stringify(args||{})});
        if(!r.ok)throw Error('Supabase: '+r.status+' '+(await r.text()).slice(0,250));
        const data=await r.json();
        if(name==='ct_apply_v3' && el('lost').checked){
          el('lost').checked=false;el('offline').checked=true;
          throw Error('Respuesta descartada por la prueba.');
        }
        return {data};
      }};
    engine=await window.CalorieTrackSync.iniciar(client,msg);
    el('owner').textContent='Cuenta de prueba: '+session.user.email;
    el('login').hidden=true;el('controls').hidden=false;draw();
  }catch(e){msg(e.message);}
};
for(const kind of ['steps','goal','meal','water'])button(kind,async()=>{
  const n=Number(el('amount').value),date=el('date').value;
  if(!date||!Number.isSafeInteger(n)||n<=0)throw Error('Revisá la fecha y la cantidad.');
  if(kind==='steps')engine.persist(fields.steps,{...engine.read(fields.steps,{}),[date]:n},{date,steps:n});
  else if(kind==='goal')engine.persist(fields.goal,{calories:n,protein:100,carbs:null,fats:null});
  else{
    const key=kind==='meal'?fields.meals:fields.water;
    const row=kind==='meal'?{id:crypto.randomUUID(),date,description:'Prueba de sincronización',calories:100,protein:3}
      :{id:crypto.randomUUID(),date,ml:250};
    engine.persist(key,[...engine.read(key,[]),row],{add:row});
  }
  await engine.flush();
});
button('del',async()=>{
  if(!el('items').value)throw Error('Elegí el registro ficticio.');
  const [kind,id]=JSON.parse(el('items').value), key=fields[kind];
  const old=engine.read(key,null);
  let next;
  if(kind==='steps'){next={...old};delete next[id];}else next=old.filter(r=>r.id!==id);
  engine.persist(key,next,{remove:id});await engine.flush();
});
button('retry',()=>engine.flush());
button('refresh',()=>location.reload());
button('exit',()=>location.reload());
