const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),500));

const header=document.querySelector('.site-header');
const backTop=document.getElementById('backTop');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>30);
  backTop.classList.toggle('show',window.scrollY>700);
});

backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const form=document.getElementById('admissionForm');
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data=new FormData(form);
  const message=[
    '👑 KINGSTEP DANCE STUDIO — ADMISSION REQUEST',
    '',
    `Name: ${data.get('name')}`,
    `Phone/WhatsApp: ${data.get('phone')}`,
    `Age Group: ${data.get('age')}`,
    `Level: ${data.get('level')}`,
    `Dance Style: ${data.get('style')}`,
    `Preferred Time: ${data.get('time')}`,
    `Message: ${data.get('message') || 'N/A'}`,
    '',
    'I would like to join The Kingstep Dance Studio.'
  ].join('\n');
  window.open('https://wa.me/9779840424024?text='+encodeURIComponent(message),'_blank');
});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',()=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

const glow=document.querySelector('.cursor-glow');
if(window.matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove',e=>{
    glow.style.left=e.clientX+'px';
    glow.style.top=e.clientY+'px';
  });
}


// Clothing image viewer
const clothLightbox=document.getElementById('clothLightbox');
const clothLightboxImage=document.getElementById('clothLightboxImage');
const clothLightboxTitle=document.getElementById('clothLightboxTitle');
const clothLightboxBuy=document.getElementById('clothLightboxBuy');
let activeClothingProduct='';
const whatsappNumber='9779840424024';

document.querySelectorAll('.shop-product-image').forEach(button=>{
  button.addEventListener('click',()=>{
    activeClothingProduct=button.dataset.product;
    clothLightboxImage.src=button.dataset.image;
    clothLightboxImage.alt=activeClothingProduct;
    clothLightboxTitle.textContent=activeClothingProduct;
    clothLightbox.classList.add('open');
    clothLightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('lightbox-open');
  });
});

function closeClothingLightbox(){
  clothLightbox.classList.remove('open');
  clothLightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('lightbox-open');
  setTimeout(()=>{clothLightboxImage.src='';},250);
}

document.querySelectorAll('[data-close-cloth]').forEach(el=>el.addEventListener('click',closeClothingLightbox));
clothLightboxBuy.addEventListener('click',()=>{
  const message=`Hi Kingstep, I want to buy the ${activeClothingProduct}. Please send me the available sizes and price.`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,'_blank');
});
document.addEventListener('keydown',e=>{if(e.key==='Escape' && clothLightbox.classList.contains('open')) closeClothingLightbox();});

// Student of the Month — update this small section whenever the monthly selection changes.
// 1) Put the new photos in assets/student-of-month/
// 2) Change the month, names, descriptions and image filenames below.
const studentOfMonth={
  month:'SEPTEMBER 2026',
  students:[
    {name:'Best Student 01',image:'assets/student-of-month/student-01.jpg',description:'Recognised for dedication, positive energy, improvement and commitment to dance.'},
    {name:'Best Student 02',image:'assets/student-of-month/student-02.jpg',description:'Recognised for discipline, progress, teamwork and consistent effort in training.'}
  ]
};
const studentMonthGrid=document.getElementById('studentMonthGrid');
if(studentMonthGrid){
  studentMonthGrid.innerHTML=studentOfMonth.students.map((student,index)=>`<article class="student-card reveal"><img src="${student.image}" alt="${student.name} — Student of the Month"><div class="student-card-content"><span class="student-card-month">${studentOfMonth.month} · BEST STUDENT</span><h3>${student.name}</h3><p>${student.description}</p><div class="student-card-actions"><a class="student-download" href="${student.image}" download>Download Photo ↓</a><span class="student-index">0${index+1}</span></div></div></article>`).join('');
  studentMonthGrid.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}

function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
