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

    const io=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}
      });
    },{threshold:.12,rootMargin:'0px 0px -30px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    document.querySelectorAll('[data-search-guide]').forEach(input=>{
      input.addEventListener('input',()=>{
        const q=(input.value||'').trim().toLowerCase();
        const lang=document.documentElement.getAttribute('data-language')||'en';
        document.querySelectorAll('.article-card').forEach(card=>{
          const block=card.querySelector('[data-lang="'+lang+'"]');
          const text=(block?block.textContent:card.textContent).toLowerCase();
          card.style.display=(!q||text.includes(q))?'block':'none';
        });
        document.querySelectorAll('.guide-category').forEach(cat=>{
          const visible=[...cat.querySelectorAll('.article-card')].some(c=>c.style.display!=='none');
          cat.style.display=visible?'block':'none';
        });
      });
    });

    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      const hero=document.querySelector('.hero-landscape');
      window.addEventListener('scroll',()=>{
        const y=Math.min(window.scrollY*.035,14);
        document.querySelectorAll('.parallax-soft').forEach((el,i)=>{
          el.style.transform='translateY('+(y*(i%2?-.5:.5))+'px)';
        });
      },{passive:true});
    }
  });
})();
