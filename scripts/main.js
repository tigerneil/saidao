(function(){
  const toggle = document.getElementById('menu-toggle');
  const header = document.querySelector('.site-header');
  if(toggle && header){
    toggle.addEventListener('click', ()=> header.classList.toggle('open'));
  }
  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id && id.length > 1){
        const el = document.querySelector(id);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
          history.replaceState(null,'',id);
        }
      }
    });
  });
  // Language preference handling
  const setPref = (lang)=>{ try { localStorage.setItem('pref-lang', lang); } catch(_){} };
  const pref = (()=>{ try { return localStorage.getItem('pref-lang'); } catch(_) { return null }})();
  document.querySelectorAll('a.lang[data-lang]').forEach(a=>{
    a.addEventListener('click', ()=> setPref(a.dataset.lang));
  });
  // Redirect root to preferred language (only from "/")
  if(location.pathname === '/' && pref === 'en'){
    location.replace('/en/');
  }
})();
