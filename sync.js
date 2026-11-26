/* Protocolo v3. Cargar este archivo solo define una API; el piloto llama iniciar(). */
(() => {
  'use strict';
  const fields = {
    calorietrack_meals_v2:'meals', calorietrack_water_v1:'water',
    calorietrack_steps_v1:'steps', calorietrack_goal_v2:'goal', calorietrack_products_v1:'products'
  };
  function create(client, owner, storage, notice) {
    const prefix = 'calorietrack_user_' + owner + '_';
    const key = prefix + 'sync_v3';
    let state = JSON.parse(storage.getItem(key) || 'null');
    let running = Promise.resolve();
    let blocked = new Set();
    function commit(next) {
      storage.setItem(key, JSON.stringify(next));
      state = next;
    }
    async function checkSession() {
      const {data,error} = await client.auth.getSession();
      if (error || data?.session?.user?.id !== owner) throw Error('La sesión de la cuenta cambió.');
    }
    async function send() {
      while (state?.pending.length) {
        const op = state.pending[0];
        await checkSession();
        const {data,error} = await client.rpc('ct_apply_v3', {op});
        if (error) throw error;
        if (!['applied','conflict'].includes(data?.status)) throw Error('Respuesta de sincronización desconocida.');
        const next = structuredClone(state);
        next.pending.shift();
        if (data.status === 'conflict') {
          next.conflicts.push({op, result:data});
          blocked.add(op.entity + ':' + op.item);
        }
        commit(next);
      }
      notice(state?.conflicts.length ? 'Hay conflictos guardados. Revisalos y recargá para consultar la versión del servidor.' : 'Sincronización al día.');
    }
    function flush() {
      running = running.catch(() => {}).then(send);
      return running;
    }
    async function initialize() {
      if (Object.keys(storage).some(k => k.startsWith(prefix+'pending_v2_'))) {
        throw Error('Hay operaciones v2 sin versión verificable. Conservá esta copia para conciliación manual.');
      }
      await checkSession();
      try {
        await flush();
        const {data:s,error} = await client.rpc('ct_snapshot_v3');
        if (error) throw error;
        if (s.owner !== owner) throw Error('Instantánea de otra cuenta.');
        const legacy = name => JSON.parse(storage.getItem(prefix+name) || 'null');
        const localGoal = state?.records.goal ?? legacy('calorietrack_goal_v2');
        const goal = s.goal ? {...localGoal,calories:s.goal.calories,protein:s.goal.protein,carbs:s.goal.carbs,fats:s.goal.fats} : localGoal;
        commit({records:{
          meals:s.meals.map(r=>({...r.details,id:r.id,date:r.meal_date,calories:r.calories,protein:r.protein,carbs:r.carbs,fats:r.fats})),
          water:s.water.map(r=>({...r.details,id:r.id,date:r.entry_date,ml:r.amount_ml})),
          steps:s.steps,goal,products:state?.records.products ?? legacy('calorietrack_products_v1') ?? []
        }, versions:s.versions,pending:[],conflicts:state?.conflicts || []});
        blocked.clear();
      } catch (e) {
        if (!state) throw e;
        blocked = new Set(state.conflicts.map(c=>c.op.entity+':'+c.op.item));
        notice('Se abrió la copia de esta cuenta. La actualización remota está pendiente.');
      }
    }
    function persist(key,value,change) {
      const entity = fields[key];
      if (!entity) return false;
      const next = structuredClone(state);
      if (entity !== 'products') {
        const item = entity === 'goal' ? 'self' : change.remove ?? change.date ?? change.add.id;
        const target = entity + ':' + item;
        if (blocked.has(target)) throw Error('Recargá y revisá el conflicto antes de editar este registro.');
        const id = crypto.randomUUID();
        const action = change?.remove !== undefined ? 'delete' : 'put';
        let payload = null;
        if (action === 'put') {
          if (entity === 'goal') {
            const {calories,protein,carbs,fats} = value;
            payload = {calories,protein,carbs:carbs??null,fats:fats??null};
          } else if (entity === 'steps') payload = {steps:change.steps};
          else payload = change.add;
        }
        next.pending.push({owner,id,item,entity,action,base:next.versions[target]??null,value:structuredClone(payload)});
        next.versions[target] = id;
      }
      next.records[entity] = structuredClone(value);
      commit(next); // La cola, las revisiones y el dato local se confirman juntos.
      if (next.pending.length) flush().catch(()=>notice('Cambios guardados en este dispositivo, pendientes de envío.'));
      return true;
    }
    return {initialize,flush,persist,read:(key,fallback)=>state?.records[fields[key]]??fallback,
      conflicts:()=>structuredClone(state?.conflicts||[]),pending:()=>state?.pending.length||0};
  }
  async function iniciar(client,notice) {
    const {data,error} = await client.auth.getSession();
    const owner = data?.session?.user?.id;
    if (error || !owner) throw Error('Iniciá sesión con una cuenta de prueba.');
    if (!navigator.locks) throw Error('Se necesita HTTPS o localhost y Web Locks.');
    // Mantener un único escritor de esta cuenta por origen, incluso durante la hidratación.
    return new Promise((resolve,reject)=>{
      navigator.locks.request('ct-v3:'+owner,{ifAvailable:true},async lock=>{
        if (!lock) throw Error('Esta cuenta ya está abierta en otra pestaña de este navegador.');
        const engine = create(client,owner,localStorage,notice);
        await engine.initialize();
        window.CTSync = engine;
        window.addEventListener('online',()=>engine.flush().catch(()=>notice('Pendiente de conexión.')));
        client.auth.onAuthStateChange((_event,session)=>{
          if (session?.user?.id !== owner) location.reload();
        });
        resolve(engine);
        await new Promise(()=>{}); // El navegador libera el bloqueo al cerrar la página.
      }).catch(reject);
    });
  }
  window.CalorieTrackSync = {create,iniciar};
})();
