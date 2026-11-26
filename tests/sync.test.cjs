const test=require('node:test');
const assert=require('node:assert/strict');
const {randomUUID}=require('node:crypto');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const window={};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../sync.js'),'utf8'),{window,structuredClone,crypto:{randomUUID}});
const {create}=window.CalorieTrackSync;
const keys={meals:'calorietrack_meals_v2',water:'calorietrack_water_v1',steps:'calorietrack_steps_v1',goal:'calorietrack_goal_v2'};
const date='2026-11-22';
function storage(){
  return Object.assign(Object.create({
    getItem(k){return this[k]??null;},setItem(k,v){this[k]=v;}
  }),{});
}
// Modelo contractual; la guía del piloto describe la validación contra PostgreSQL.
class Server {
  accounts=new Map();
  state(user) {
    if (!this.accounts.has(user)) this.accounts.set(user,{versions:{},receipts:{},rows:{}});
    return this.accounts.get(user);
  }
  apply(user,op) {
    assert.equal(user,op.owner);
    const s=this.state(user), key=op.entity+':'+op.item;
    const prior=s.receipts[op.id];
    if(prior){assert.deepEqual(structuredClone(prior.op),structuredClone(op));return prior.reply;}
    const v=s.versions[key]??null;
    const conflict=op.base!==v || (op.action==='put' && ['meals','water'].includes(op.entity) && v!==null);
    const reply=conflict?{status:'conflict',version:v}:{status:'applied',version:op.id};
    if(!conflict){
      s.versions[key]=op.id;
      if(op.action==='delete') delete s.rows[key]; else s.rows[key]=op.value;
    }
    s.receipts[op.id]={op,reply};return reply;
  }
  snapshot(user){
    const {versions,rows}=this.state(user);
    const s={owner:user,versions:structuredClone(versions),meals:[],water:[],steps:{},goal:null};
    for(const [key,row] of Object.entries(rows)){
      const [entity,item]=key.split(':');
      if(entity==='steps') s.steps[item]=row.steps;
      if(entity==='goal') s.goal=row;
      if(entity==='meals') s.meals.push({...row,details:row,meal_date:row.date});
      if(entity==='water') s.water.push({...row,details:row,entry_date:row.date,amount_ml:row.ml});
    }
    return s;
  }
}
async function device(server,user='A',disk=storage(),online=true){
  const wire={online,drop:false};
  const api={auth:{getSession:async()=>({data:{session:{user:{id:user}}}})},rpc:async(name,{op}={})=>{
    if(!wire.online)throw Error('offline');
    const data=name==='ct_apply_v3'?server.apply(user,op):server.snapshot(user);
    if(wire.drop){wire.drop=false;wire.online=false;throw Error('ACK perdido');}
    return {data:structuredClone(data)};
  }};
  const engine=create(api,user,disk,()=>{});
  await engine.initialize();
  const write=(e,v,c)=>engine.persist(keys[e],v,c);
  return {engine,disk,wire,write};
}
for(const e of ['meals','water','steps']){
  test(e+': ACK perdido, borrado desde B, recarga offline en A y reintento antiguo',async()=>{
    const server=new Server(), a=await device(server);
    const item={id:randomUUID(),date,ml:250,calories:100};
    const key=e==='steps'?date:item.id;
    a.wire.drop=true;
    a.write(e,e==='steps'?{[date]:400}:[item],e==='steps'?{date,steps:400}:{add:item});
    await assert.rejects(a.engine.flush());
    const b=await device(server);
    b.write(e,e==='steps'?{}:[],{remove:key});
    await b.engine.flush();
    const restarted=await device(server,'A',a.disk,false);
    assert.equal(restarted.engine.pending(),1);
    restarted.wire.online=true;
    await restarted.engine.flush();
    assert.equal(server.state('A').rows[e+':'+key],undefined);
    assert.equal(Object.keys(server.state('A').receipts).length,2);
    assert.equal(restarted.engine.pending(),0);
  });
}
for(const e of ['steps','goal']){
  test(e+': dos ediciones de una revisión, conflicto conserva el intento',async()=>{
    const server=new Server(), a=await device(server), b=await device(server);
    function write(d,n){d.write(e,e==='steps'?{[date]:n}:{calories:n,protein:100},e==='steps'?{date,steps:n}:undefined);}
    a.wire.online=false;write(a,300);await assert.rejects(a.engine.flush());
    write(b,700);await b.engine.flush();a.wire.online=true;await a.engine.flush();
    const key=e==='steps'?'steps:'+date:'goal:self', field=e==='steps'?'steps':'calories';
    assert.equal(server.state('A').rows[key][field],700);
    assert.equal(a.engine.conflicts()[0].op.value[field],300);
    const reload=await device(server,'A',a.disk);
    assert.equal(reload.engine.conflicts().length,1);
    write(reload,800);await reload.engine.flush();
    assert.equal(server.state('A').rows[key][field],800);
  });
}
test('Dos ediciones offline consecutivas conservan sus revisiones al recargar',async()=>{
  const server=new Server(),a=await device(server);
  a.wire.online=false;
  for(const steps of [200,300]) a.write('steps',{[date]:steps},{date,steps});
  await assert.rejects(a.engine.flush());
  const b=await device(server,'A',a.disk);
  assert.equal(b.engine.pending(),0);
  assert.equal(b.engine.read(keys.steps)[date],300);
});
test('La cola y los datos quedan aislados por cuenta',async()=>{
  const server=new Server(),a=await device(server);
  a.wire.online=false;a.write('steps',{[date]:123},{date,steps:123});await assert.rejects(a.engine.flush());
  const b=await device(server,'B',a.disk);
  assert.equal(b.engine.pending(),0);assert.equal(b.engine.read(keys.steps)[date],undefined);
  assert.equal(a.engine.pending(),1);
});
test('Fallo de almacenamiento al guardar: ni cola ni datos cambian',async()=>{
  const a=await device(new Server());
  a.disk.setItem=()=>{throw Error('sin espacio');};
  assert.throws(()=>a.write('steps',{[date]:100},{date,steps:100}));
  assert.equal(a.engine.pending(),0);assert.equal(a.engine.read(keys.steps)[date],undefined);
});
test('Se conserva y bloquea una cola antigua sin revisión verificable',async()=>{
  const disk=storage();disk.setItem('calorietrack_user_A_pending_v2_123','{}');
  await assert.rejects(device(new Server(),'A',disk),/v2/);
  assert.equal(disk.getItem('calorietrack_user_A_pending_v2_123'),'{}');
});

test('Dos dispositivos envían objetivos a la vez: se aplica uno y se conserva el otro',async()=>{
  const s=new Server(),a=await device(s),b=await device(s);
  a.write('goal',{calories:1800,protein:110});
  b.write('goal',{calories:2100,protein:115});
  await Promise.all([a.engine.flush(),b.engine.flush()]);
  const losers=[...a.engine.conflicts(),...b.engine.conflicts()];
  assert.equal(losers.length,1);
  const saved=s.state('A').rows['goal:self'];
  assert.deepEqual([saved.calories,losers[0].op.value.calories].sort(),[1800,2100]);
});

test('Un registro nuevo en un equipo no borra el alta independiente del otro',async()=>{
  const s=new Server(),a=await device(s),b=await device(s);
  const one={id:randomUUID(),date,ml:125},two={id:randomUUID(),date,ml:250};
  a.write('water',[one],{add:one});b.write('water',[two],{add:two});
  await Promise.all([a.engine.flush(),b.engine.flush()]);
  const fresh=await device(s);
  assert.deepEqual(fresh.engine.read(keys.water).map(w=>w.ml).sort(),[125,250]);
});
