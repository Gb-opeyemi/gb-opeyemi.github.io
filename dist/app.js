const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
function closeMenu(){ menu.setAttribute('aria-expanded','false'); nav.classList.remove('open'); }
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('open',!expanded);});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#copy-email').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText('gbadamosiopeyemi99@gmail.com');status.textContent='Email address copied.';}catch{status.textContent='Email: gbadamosiopeyemi99@gmail.com';}});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.section-heading,.project,.community-card').forEach(el=>observer.observe(el));const links=[...nav.querySelectorAll('a')];const sections=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px'});document.querySelectorAll('section[id]').forEach(el=>sections.observe(el));}

// Restore before painting in the head; keep the switch and browser chrome in sync.
const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: light)');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'light'));
  themeButton.title = `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`;
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#faf8fc' : '#101014';
}
applyTheme(document.documentElement.dataset.theme || 'dark');
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch { /* Still works for this visit. */ }
});
systemTheme.addEventListener('change', event => {
  try { if (localStorage.getItem('portfolio-theme')) return; } catch { return; }
  applyTheme(event.matches ? 'light' : 'dark');
});
window.addEventListener('storage', event => {
  if (event.key === 'portfolio-theme') {
    applyTheme(event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : (systemTheme.matches ? 'light' : 'dark'));
  }
});
