(()=>{'use strict';
const dialogs=[...document.querySelectorAll('.ct-float-dialog')];
function openPanel(name){const target=document.getElementById('ctDialog-'+name);if(!target||target.open)return;for(const d of dialogs)if(d.open)d.close();target.showModal();if(name==='coach'){const messages=document.getElementById('coachMessages');if(messages)messages.scrollTop=messages.scrollHeight;}}
for(const b of document.querySelectorAll('[data-ct-panel]'))b.addEventListener('click',()=>openPanel(b.dataset.ctPanel));
for(const a of document.querySelectorAll('a[href="#agua"],a[href="#coach"]'))a.addEventListener('click',e=>{e.preventDefault();openPanel(a.hash.slice(1));});
for(const d of dialogs){d.querySelector('[data-ct-close]').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});}
const total=document.getElementById('waterCircleTotal'),label=document.getElementById('ctFloatWater');if(total&&label){const update=()=>{label.textContent='Agua · '+total.textContent.trim();};new MutationObserver(update).observe(total,{childList:true,characterData:true,subtree:true});update();}
})();
