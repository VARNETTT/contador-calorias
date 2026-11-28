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
  $('ctWaterLiters').textContent=(number($('waterCircleTotal').textContent)/1000).toLocaleString('es-AR')+' L';

 }
 document.addEventListener('DOMContentLoaded',()=>{
  $('calendarTitle').textContent='Hoy, '+new Date().toLocaleDateString('es-AR',{day:'numeric',month:'long'});
  document.querySelector('.ct-history').onclick=()=>{if($('calendarExpanded').hidden)$('calendarToggle').click();$('calendario').scrollIntoView({behavior:'smooth'})};
  const observer=new MutationObserver(refresh);for(const id of ['dailyRemainingCalories','dailyConsumedCalories','waterCircleTotal','mealList'])observer.observe($(id),{childList:true,subtree:true,characterData:true});observer.observe($('calorieCircle'),{attributes:true,attributeFilter:['style']});refresh();
 });
})();
