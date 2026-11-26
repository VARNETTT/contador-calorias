/* Presentation only: reuse existing controls and render output. */
(() => {
  const update = () => {
    const date = document.getElementById('ctDate');
    if (date) date.textContent = new Intl.DateTimeFormat('es-AR',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
    const input = document.getElementById('stepsInput');
    const value = Math.max(0, Number(input?.value) || 0);
    const bar = document.getElementById('ctStepsBar');
    if (bar) bar.value = value;
    const label = document.getElementById('ctStepsValue');
    if (label) label.textContent = `${value.toLocaleString('es-AR')} pasos`;
  };
  document.addEventListener('DOMContentLoaded', () => {
    update();
    document.getElementById("compactGoal")?.addEventListener("click",()=>document.getElementById("openGoalModal")?.click());
    document.addEventListener('calorietrack:steps-updated',update);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)update();});
    document.querySelectorAll('[data-ct-water]').forEach(button=>button.addEventListener('click',()=>{
      const original=document.querySelector(`#waterTrackerMount [data-water-ml="${button.dataset.ctWater}"]`);
      if(original) original.click();
    }));
  });
})();
(() => {
 const $=id=>document.getElementById(id);
 const number=s=>Number(String(s).replace(/\./g,'').replace(',','.').match(/\d+(?:\.\d+)?/)?.[0]||0);
 function refresh(){
  $('ctRemainingDisplay').textContent=number($('dailyRemainingCalories').textContent).toLocaleString('es-AR')+' kcal';
  document.querySelector('.ct-cal-bar span').style.width=$('calorieCircle').style.getPropertyValue('--progress')||'0%';
  $('ctWaterLiters').textContent=(number($('waterCircleTotal').textContent)/1000).toLocaleString('es-AR')+' L';
  let meals=[];try{meals=JSON.parse(localStorage.getItem('calorietrack_meals_v2')||'[]');if(!Array.isArray(meals))meals=[]}catch{}
  const now=new Date(),today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
  const root=$('ctMealGroups');root.replaceChildren();
  for(const [name,icon] of [['Desayuno','☕'],['Almuerzo','☼'],['Merienda','◕'],['Cena','☾'],['Colación','◇']]){
   const list=meals.filter(m=>m.date===today&&m.type===name);if(name==='Colación'&&!list.length)continue;
   const row=document.createElement('div');row.className='ct-meal-row';const symbol=document.createElement('span');symbol.className='ct-meal-icon';symbol.textContent=icon;const label=document.createElement('div');label.className='ct-meal-label';const title=document.createElement('strong');title.textContent=name;const sub=document.createElement('small');sub.textContent=list.length?Math.round(list.reduce((a,m)=>a+(Number(m.calories)||0),0)).toLocaleString('es-AR')+' kcal':'Sin registros';label.append(title,sub);const add=document.createElement('button');add.type='button';add.className='ct-meal-add';add.textContent='⊕';add.setAttribute('aria-label','Registrar '+name);add.onclick=()=>{$('openMealModal').click();$('mealType').value=name};row.append(symbol,label,add);root.append(row);
  }
 }
 document.addEventListener('DOMContentLoaded',()=>{
  $('calendarTitle').textContent='Hoy, '+new Date().toLocaleDateString('es-AR',{day:'numeric',month:'long'});
  document.querySelector('.ct-history').onclick=()=>{if($('calendarExpanded').hidden)$('calendarToggle').click();$('calendario').scrollIntoView({behavior:'smooth'})};
  const observer=new MutationObserver(refresh);for(const id of ['dailyRemainingCalories','dailyConsumedCalories','waterCircleTotal','mealList'])observer.observe($(id),{childList:true,subtree:true,characterData:true});observer.observe($('calorieCircle'),{attributes:true,attributeFilter:['style']});refresh();
 });
})();
