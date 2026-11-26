/* CalorieTrack: autenticación. NO modifica los registros de localStorage. */
(() => {
  'use strict';
  const el = id => document.getElementById(id);
  const cfg = window.CALORIETRACK_SUPABASE || {};
  const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(cfg.url || '') && /^sb_publishable_/.test(cfg.publishableKey || '');
  const client = configured && window.supabase?.createClient ? window.supabase.createClient(cfg.url, cfg.publishableKey) : null;
  let mode = 'login';
  let user = null;
  let busy = false;
  let recovering = false;
  const msg = (value, error=false) => { el('authMessage').textContent = value; el('authMessage').classList.toggle('is-error',error); };
  const errorMessage = error => {
    const m = String(error?.message || 'No se pudo completar la operación.');
    if (/invalid login credentials/i.test(m)) return 'Correo o contraseña incorrectos, o correo todavía sin confirmar.';
    if (/email not confirmed/i.test(m)) return 'Revisá tu correo y confirmá tu cuenta antes de ingresar.';
    if (/already registered/i.test(m)) return 'Este correo ya está registrado.';
    if (/rate limit/i.test(m)) return 'Demasiados intentos. Probá más tarde.';
    return m;
  };
  const render = () => {
    el('authSignedOut').hidden = !!user;
    el('authSignedIn').hidden = !user;
    el('authUserEmail').textContent = user?.email || '';
    el('authOpen').setAttribute('aria-label', user ? 'Mi perfil' : 'Mi cuenta');
    el('authOpen').title = user ? 'Mi perfil' : 'Mi cuenta';
    el('authRecovery').hidden = !recovering;
    if(recovering){el('authSignedIn').hidden=true;el('authSignedOut').hidden=true;}
  };
  const setMode = value => {
    mode = value;
    el('authLoginTab').classList.toggle('is-selected',mode==='login');
    el('authRegisterTab').classList.toggle('is-selected',mode==='register');
    el('authSubmit').textContent = mode==='login' ? 'Iniciar sesión' : 'Crear cuenta';
    el('authPassword').autocomplete = mode==='login' ? 'current-password' : 'new-password';
    el('authReset').hidden = mode!=='login';
    msg('');
  };
  const open = () => {
    el('authModal').hidden = false;
    document.body.style.overflow = 'hidden';
    msg(!client ? 'Primero configurá supabase-config.js con la URL del proyecto y la Publishable key.' : '');
    el('authSignedOut').querySelector('input')?.focus();
  };
  const close = () => { el('authModal').hidden = true; document.body.style.overflow = ''; el('authOpen').focus(); };
  document.addEventListener('DOMContentLoaded', async () => {
    el('authOpen').addEventListener('click', open);
    document.querySelectorAll('[data-auth-close]').forEach(x=>x.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!el('authModal').hidden)close();});
    el('authLoginTab').addEventListener('click',()=>setMode('login'));
    el('authRegisterTab').addEventListener('click',()=>setMode('register'));
    el('authForm').addEventListener('submit',async e=>{
      e.preventDefault(); if(busy)return;
      if(!client){msg('Configurá primero supabase-config.js.',true);return;}
      const email=el('authEmail').value.trim(),password=el('authPassword').value;
      if(password.length<6){msg('La contraseña debe tener al menos 6 caracteres.',true);return;}
      busy=true;el('authSubmit').disabled=true;msg('Procesando…');
      try {
        if(mode==='register') {
          const {data,error}=await client.auth.signUp({email,password,options:{emailRedirectTo:'https://varnettt.github.io/contador-calorias/'}});
          if(error)throw error;
          msg(data.session?'Cuenta creada. Ya iniciaste sesión.':'Revisá tu correo para confirmar la cuenta. Si ya existe, intentá iniciar sesión.');
        } else {
          const {error}=await client.auth.signInWithPassword({email,password});
          if(error)throw error;
          msg('¡Sesión iniciada!');
          el('authPassword').value='';
        }
      } catch(error){msg(errorMessage(error),true);}
      finally{busy=false;el('authSubmit').disabled=false;}
    });
    el('authReset').addEventListener('click',async()=>{
      if(!client){msg('Configurá primero supabase-config.js.',true);return;}
      const email=el('authEmail').value.trim();
      if(!email){msg('Escribí tu correo electrónico primero.',true);return;}
      const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:'https://varnettt.github.io/contador-calorias/'});
      msg(error?errorMessage(error):'Si existe una cuenta con ese correo, recibirás un enlace para restablecer la contraseña.',!!error);
    });
    el('authLogout').addEventListener('click',async()=>{
      if(!client)return;
      const {error}=await client.auth.signOut();
      msg(error?errorMessage(error):'Sesión cerrada. Los registros locales no se modificaron.',!!error);
    });
    el('authRecovery').addEventListener('submit', async e=>{
      e.preventDefault(); if(!client || busy)return;
      busy=true;
      try { const {error}=await client.auth.updateUser({password:el('authNewPassword').value}); if(error)throw error; recovering=false;el('authNewPassword').value='';render();msg('Contraseña actualizada.'); }
      catch(error){msg(errorMessage(error),true);} finally{busy=false;}
    });
    if(client){
      client.auth.onAuthStateChange((event,session)=>{
        user=session?.user||null;
        if(event==='PASSWORD_RECOVERY'){recovering=true;render();open();el('authNewPassword').focus();}
        else render();
      });
      try { const {data,error}=await client.auth.getSession(); if(error)throw error;user=data?.session?.user||null;render(); } catch(error){msg(errorMessage(error),true);}
    } else render();
  });
})();
