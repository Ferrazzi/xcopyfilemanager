(function(){
  const browser=(navigator.language||'en').toLowerCase().startsWith('it')?'it':'en';
  const initial=localStorage.getItem('xcopy-lang')||browser;
  function setLang(l){
    document.documentElement.setAttribute('data-language',l);
    localStorage.setItem('xcopy-lang',l);
    document.querySelectorAll('[data-set-lang]').forEach(b=>b.classList.toggle('active',b.dataset.setLang===l));
    document.querySelectorAll('[data-search-guide]').forEach(input=>input.dispatchEvent(new Event('input')));
  }
  document.addEventListener('DOMContentLoaded',()=>{
    setLang(initial);
    document.querySelectorAll('[data-set-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.setLang)));
    document.querySelectorAll('.shot-media img').forEach(img=>{
      const ok=()=>img.classList.add('loaded');
      if(img.complete && img.naturalWidth) ok(); else img.addEventListener('load',ok);
    });
    document.querySelectorAll('[data-search-guide]').forEach(input=>{
      input.addEventListener('input',()=>{
        const q=(input.value||'').trim().toLowerCase();
        const lang=document.documentElement.getAttribute('data-language')||'en';
        document.querySelectorAll('.article-card').forEach(card=>{
          const block=card.querySelector('[data-lang="'+lang+'"]');
          const text=(block?block.textContent:card.textContent).toLowerCase();
          card.style.display=(!q || text.includes(q))?'block':'none';
        });
        document.querySelectorAll('.guide-category').forEach(cat=>{
          const visible=[...cat.querySelectorAll('.article-card')].some(c=>c.style.display!=='none');
          cat.style.display=visible?'block':'none';
        });
      });
    });
  });
})();
