(function(){
  const saved=localStorage.getItem('xcopy-lang');
  const browser=(navigator.language||'en').toLowerCase().startsWith('it')?'it':'en';
  const lang=saved||browser;
  function setLang(l){
    document.documentElement.setAttribute('data-language',l);
    localStorage.setItem('xcopy-lang',l);
    document.querySelectorAll('[data-set-lang]').forEach(b=>b.classList.toggle('active',b.dataset.setLang===l));
  }
  document.addEventListener('DOMContentLoaded',()=>{
    setLang(lang);
    document.querySelectorAll('[data-set-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.setLang)));
  });
})();
