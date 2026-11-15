/* Control del Coach flotante. No modifica coach.js ni las llamadas a Gemini. */
(()=>{'use strict';
const panel=document.getElementById('coach');
const openButton=document.getElementById('coachFloatingButton');
const closeButton=document.getElementById('coachFloatingClose');
const messages=document.getElementById('coachMessages');
const suggestions=panel?.querySelector('.coach-suggestions');
if(!panel||!openButton||!closeButton||!messages)return;
let lastFocus=null;
if(suggestions){
 const toggle=document.createElement('button');
 toggle.type='button';toggle.className='coach-suggestions-toggle';
 toggle.setAttribute('aria-controls','coachSuggestions');
 suggestions.id='coachSuggestions';
 suggestions.classList.add('coach-suggestions-collapsed');
 toggle.setAttribute('aria-expanded','false');
 toggle.textContent='Sugerencias rápidas  ▾';
 suggestions.before(toggle);
 toggle.addEventListener('click',()=>{
  const expanded=toggle.getAttribute('aria-expanded')!=='true';
  toggle.setAttribute('aria-expanded',String(expanded));
  toggle.textContent=expanded?'Ocultar sugerencias  ▴':'Sugerencias rápidas  ▾';
  suggestions.classList.toggle('coach-suggestions-collapsed',!expanded);
 });
}
function openChat(){
 if(document.body.classList.contains('coach-chat-open'))return;
 lastFocus=document.activeElement;
 document.body.classList.add('coach-chat-open');
 panel.setAttribute('aria-hidden','false');
 openButton.setAttribute('aria-expanded','true');
 requestAnimationFrame(()=>{closeButton.focus({preventScroll:true});messages.scrollTop=messages.scrollHeight;});
}
function closeChat(){
 if(!document.body.classList.contains('coach-chat-open'))return;
 document.body.classList.remove('coach-chat-open');
 panel.setAttribute('aria-hidden','true');
 openButton.setAttribute('aria-expanded','false');
 if(lastFocus?.isConnected&&lastFocus!==document.body)lastFocus.focus({preventScroll:true});
 else openButton.focus({preventScroll:true});
}
openButton.addEventListener('click',openChat);
closeButton.addEventListener('click',closeChat);
panel.addEventListener('click',e=>{if(e.target===panel)closeChat();});
document.addEventListener('keydown',e=>{
 if(!document.body.classList.contains('coach-chat-open'))return;
 if(e.key==='Escape'){e.preventDefault();closeChat();return;}
 if(e.key==='Tab'){
  const focusables=[...panel.querySelectorAll('button:not([disabled]),textarea:not([disabled]),input:not([disabled]),a[href]')].filter(el=>el.getClientRects().length);
  if(!focusables.length)return;
  const first=focusables[0],last=focusables[focusables.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 }
});
document.querySelectorAll('a[href="#coach"]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();openChat();}));
if(window.location.hash==='#coach'){openChat();history.replaceState(null,'',location.pathname+location.search);}
})();
