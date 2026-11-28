(function(root){'use strict';
const key='calorietrack_training_v1';
const today=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const norm=s=>s.trim().replace(/\s+/g,' ').toLocaleLowerCase('es');
function series(weight,reps){const w=String(weight).trim().replace(',','.');const r=String(reps).trim();if(!/^\d+(?:\.\d+)?$/.test(w)||!/^\d+$/.test(r)||!Number.isFinite(+w)||+w>100000||+r<1||+r>10000)throw Error('Ingresá peso válido y repeticiones enteras positivas.');return {weight:+w,reps:+r};}
function load(storage){const raw=storage.getItem(key);if(raw===null)return [];const data=JSON.parse(raw);if(!Array.isArray(data))throw Error('Historial inválido');return data;}
function save(storage,sessions){storage.setItem(key,JSON.stringify(sessions));}
function matching(sessions,exercise,machine){return sessions.flatMap(s=>s.exercises.filter(e=>norm(e.exercise)===norm(exercise)&&norm(e.machine)===norm(machine)).map(e=>({id:s.id,date:s.date,sets:e.sets}))).sort((a,b)=>a.date.localeCompare(b.date));}
function points(rows){return rows.map(r=>{const best=r.sets.reduce((a,b)=>b.weight>a.weight||(b.weight===a.weight&&b.reps>a.reps)?b:a);return {...r,best,volume:Math.round(r.sets.reduce((a,b)=>a+b.weight*b.reps,0)*100)/100};});}
function last(sessions,exercise,machine,date,exclude){return matching(sessions.filter(s=>s.id!==exclude&&s.date<=date),exercise,machine).at(-1);}
function filter(rows,months,now=new Date()){if(!months)return rows;const d=new Date(now);const day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()-months);d.setDate(Math.min(day,new Date(d.getFullYear(),d.getMonth()+1,0).getDate()));return rows.filter(r=>r.date>=today(d)&&r.date<=today(now));}
const api={key,today,norm,series,load,save,matching,points,last,filter};if(typeof module==='object')module.exports=api;else root.CTTraining=api;
})(typeof window==='object'?window:globalThis);
