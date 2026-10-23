const order='https://menu.tucan.la/ltcburgers';
const siteHeader=document.querySelector('.site-header');
const navToggle=document.querySelector('.nav-toggle');
const mainNav=document.querySelector('#main-nav');
function closeNav(){siteHeader.classList.remove('nav-open');navToggle.setAttribute('aria-expanded','false');navToggle.setAttribute('aria-label','Abrir navegación');}
navToggle.addEventListener('click',()=>{const open=!siteHeader.classList.contains('nav-open');siteHeader.classList.toggle('nav-open',open);navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Cerrar navegación':'Abrir navegación');});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&siteHeader.classList.contains('nav-open')){closeNav();navToggle.focus();}});
document.addEventListener('click',e=>{if(!siteHeader.contains(e.target))closeNav();});
if('IntersectionObserver' in window){const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){mainNav.querySelectorAll('a').forEach(a=>{const active=a.getAttribute('href')==='#'+entry.target.id;a.classList.toggle('nav-active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-20% 0px -60% 0px',threshold:0});['menu','resenas','ubicacion'].forEach(id=>sectionObserver.observe(document.getElementById(id)));}
const maps="https://www.google.com.ar/maps/place/LTC+Burger's/@-34.4560321,-58.6346473,20.75z/data=!4m6!3m5!1s0x95bca596cdc0c871:0xf297d10b6af941a!8m2!3d-34.4559548!4d-58.6346223!16s%2Fg%2F11ww7cr_rz?entry=ttu&hl=es";
document.querySelectorAll('[data-map]').forEach(a=>{a.href=maps;a.target='_blank';a.rel='noopener'});
const products=[
['LTC Burger','ltc-burger','Cheddar, bacon, salsa LTC y cebolla crispy.','burgers','LA FIRMA DE LA CASA'],
['American','american','Cheddar, bacon, american sauce y cebolla crispy.','burgers',''],
['Bacon & Cheese','bacon-cheese','Nuestro blend, cheddar y bacon.','burgers',''],
['Cheeseburger','cheeseburger','Nuestro blend y cheddar. La clásica.','burgers',''],
['BBQ Onion','bbq-onion','Cheddar, bacon, cebolla caramelizada y barbacoa.','burgers',''],
['Avocado','avocado','Cheddar, sriracha, guacamole y cebolla en cubos.','burgers',''],
['Royal','royal','Cheddar, ketchup, mostaza, cebolla y pepinillos.','burgers',''],
['B M','b-m','Cheddar, lechuga, cebolla, pepinillos y salsa LTC.','burgers',''],
['Hat-trick','hat-trick','Tres burgers simples, una porción de papas y una bebida.','burgers','PARA COMPARTIR'],
['Veggieburg','veggieburg','Not Burger, cheddar, vegetales, aros de cebolla y veggie sauce.','veggie','OPCIÓN VEGETARIANA'],
['Nuggets','nuggets','Seis nuggets acompañados de papas fritas.','extras','MENÚ KIDS'],
['Aros de cebolla','aros-de-cebolla','Seis aros para sumar al pedido.','extras',''],
['Cono extra','cono-extra','Un cono de papas fritas extra.','extras','','cono-extra.png']];
function render(filter){document.querySelector('#products').innerHTML=products.filter(p=>filter==='burgers'?p[3]!=='extras':p[3]===filter).map(p=>`<article class="product"><div class="product-photo"><img src="assets/${p[5]||p[1]+'.webp'}" alt="${p[0]} de LTC Burgers" loading="lazy">${p[4]?`<span class="product-tag">${p[4]}</span>`:''}</div><div class="product-title"><h3>${p[0]}</h3><a href="${order}" target="_blank" rel="noopener" aria-label="Pedir ${p[0]}">↗</a></div><p>${p[2]}</p>${p[3]==='burgers'&&p[0]!=='Hat-trick'?'<div class="burger-sizes" aria-label="Opciones disponibles"><span>Simple</span><span>Doble</span><span>Triple</span></div>':''}</article>`).join('');}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});render(b.dataset.filter)}));render('burgers');
const reviews=[
 {name:'Katherine Paez',rating:5,quote:'Las mejores hamburguesas de Zona Norte, consumo acá desde 2022 y sigue siendo la misma calidad.',note:'Extracto de su reseña en Google.'},
 {name:'Victor Ungareli',rating:5,quote:'la atención de 10',note:'En su reseña destaca la rapidez del pedido, la comida y recomienda la LTC Burger. Resumen de su experiencia.'},
 {name:'Alan Rodrigo',rating:3,quote:'la hamburguesa es rica',note:'Le gustó la hamburguesa, aunque en su última visita consideró que no estaba tan buena como antes. Resumen de su experiencia.'}
];
const carousel=document.querySelector('.carousel'),track=document.querySelector('#review-track'),dots=document.querySelector('#review-dots'),pauseButton=document.querySelector('#review-pause'),status=document.querySelector('#review-status');
track.innerHTML=reviews.map((r,i)=>`<article class="review-slide" role="group" aria-roledescription="diapositiva" aria-label="${i+1} de ${reviews.length}" aria-hidden="${i!==0}"><div class="review-person"><span class="avatar" aria-hidden="true">${r.name[0]}</span><strong>${r.name}</strong><small>Reseña en Google</small></div><div><p class="stars" aria-label="${r.rating} de 5 estrellas">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</p><blockquote>“${r.quote}”</blockquote><p class="review-summary">${r.note}</p></div></article>`).join('');
dots.innerHTML=reviews.map((r,i)=>`<button aria-label="Ver reseña de ${r.name}" aria-current="${i===0}" data-slide="${i}"></button>`).join('');
const motion=matchMedia('(prefers-reduced-motion: reduce)');
let reviewIndex=0,paused=motion.matches,hovered=false,focused=false,timer;
function showReview(index,manual=false){reviewIndex=(index+reviews.length)%reviews.length;track.style.transform=`translateX(-${reviewIndex*100}%)`;track.querySelectorAll('.review-slide').forEach((s,i)=>s.setAttribute('aria-hidden',String(i!==reviewIndex)));dots.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-current',String(i===reviewIndex)));status.setAttribute('aria-live',manual?'polite':'off');status.textContent=`Reseña ${reviewIndex+1} de ${reviews.length}: ${reviews[reviewIndex].name}`;}
function schedule(){clearInterval(timer);if(!paused&&!hovered&&!focused&&!document.hidden)timer=setInterval(()=>showReview(reviewIndex+1),5500);}
function setPaused(value){paused=value;pauseButton.setAttribute('aria-pressed',String(paused));pauseButton.setAttribute('aria-label',paused?'Reanudar carrusel':'Pausar carrusel');pauseButton.textContent=paused?'▶ Reanudar':'Ⅱ Pausar';schedule();}
function manualReview(index){setPaused(true);showReview(index,true);}
document.querySelector('#review-prev').addEventListener('click',()=>manualReview(reviewIndex-1));
document.querySelector('#review-next').addEventListener('click',()=>manualReview(reviewIndex+1));
dots.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>manualReview(Number(b.dataset.slide))));
pauseButton.addEventListener('click',()=>setPaused(!paused));
carousel.addEventListener('mouseenter',()=>{hovered=true;schedule()});carousel.addEventListener('mouseleave',()=>{hovered=false;schedule()});
carousel.addEventListener('focusin',()=>{focused=true;schedule()});carousel.addEventListener('focusout',()=>{queueMicrotask(()=>{focused=carousel.contains(document.activeElement);schedule()})});
carousel.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();manualReview(reviewIndex+(e.key==='ArrowRight'?1:-1))}});
document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',e=>{if(e.matches)setPaused(true)});setPaused(paused);showReview(0);
