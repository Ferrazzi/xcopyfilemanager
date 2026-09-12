
(function(){
 const browser=(navigator.language||'en').toLowerCase().startsWith('it')?'it':'en';
 const initial=localStorage.getItem('xcopy-lang')||browser;
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

 function setLang(l){
   document.documentElement.setAttribute('data-language',l);
   localStorage.setItem('xcopy-lang',l);
   document.querySelectorAll('[data-set-lang]').forEach(b=>b.classList.toggle('active',b.dataset.setLang===l));
   document.querySelectorAll('[data-search-guide]').forEach(i=>i.dispatchEvent(new Event('input')));
 }

 document.addEventListener('DOMContentLoaded',()=>{
   setLang(initial);
   document.querySelectorAll('[data-set-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.setLang)));

   if(!reduce){
     const io=new IntersectionObserver(entries=>{
       entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }});
     },{threshold:.12,rootMargin:'0px 0px -30px 0px'});
     document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

     const cluster=document.querySelector('.icon-cluster');
     if(cluster){
       cluster.addEventListener('pointermove',e=>{
         const r=cluster.getBoundingClientRect();
         const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
         cluster.style.transform=`rotateX(${-y*3}deg) rotateY(${x*4}deg)`;
       });
       cluster.addEventListener('pointerleave',()=>cluster.style.transform='');
     }
   } else {
     document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
   }

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
         const any=[...cat.querySelectorAll('.article-card')].some(c=>c.style.display!=='none');
         cat.style.display=any?'block':'none';
       });
     });
   });
 });
})();


document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-search-tree]').forEach(input=>{
    input.addEventListener('input',()=>{
      const q=(input.value||'').trim().toLowerCase();
      const lang=document.documentElement.getAttribute('data-language')||'en';

      document.querySelectorAll('.guide-tree .tree-group').forEach(group=>{
        let childMatch=false;

        group.querySelectorAll('.tree-node').forEach(node=>{
          const title=node.querySelector('.tree-copy b[data-lang="'+lang+'"]');
          const desc=node.querySelector('.tree-copy small[data-lang="'+lang+'"]');
          const text=((title?title.textContent:'')+' '+(desc?desc.textContent:'')).toLowerCase();
          const visible=!q || text.includes(q);
          node.classList.toggle('tree-hidden',!visible);
          if(visible) childMatch=true;
        });

        const cat=group.querySelector('.tree-label [data-lang="'+lang+'"]');
        const catMatch=!!(q && cat && cat.textContent.toLowerCase().includes(q));

        if(q && (childMatch || catMatch)) group.open=true;
        group.classList.toggle('tree-hidden', !!q && !childMatch && !catMatch);
      });
    });
  });
});
