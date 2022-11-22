'use strict';

// Modal window

//const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
//const btnCloseModal = document.querySelector('.btn--close-modal');
//const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
 
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/*for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);*/

btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');

const allSections=document.querySelectorAll('.section');

//const allButtons=document.getElementByTagName('button');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML='We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';

header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', 
function(){
  message.remove();
  message.parentElement.removeChild(message);
});

message.style.backgroundColor='#37383d';
message.style.width='120%';
message.style.height= Number.parseFloat(getComputedStyle(message).height,10)+30+'px';

document.documentElement.style.setProperty('--color-primary','orangered');

//Attributes
const logo=document.querySelector('.nav__logo');
logo.alt='Beautiful minimalist logo';
logo.setAttribute('company','Bankist');

const btnScrollTo =document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(e){
  const s1coords=section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Control scroll x/y',window.pageXOffset,pageYOffset);
  /* 
   */
  //window.scrollTo(s1coords.left+window.pageXOffset,s1coords.top+window.pageYOffset);

  window.scrollTo({
    left:s1coords.left+window.pageXOffset,
    top:s1coords.top+window.pageYOffset,
    behavior: 'smooth',
  });

  //morder browsers:
  //section1.scrollIntoView({behavior: 'smooth'});
});

const h1=document.querySelector('h1');

const alertH1 = function(e){
  alert('You are reading the heading');

  h1.removeEventListener('mouseenter', alertH1); //event handled only once!
}

h1.addEventListener('mouseenter', alertH1);
setTimeout(()=>h1.removeEventListener('mouseenter', alertH1),3000);

//bubbling

/*const randomInt=(min,max)=>Math.floor(Math.random()*(max-min+1)+min);
console.log(randomInt);
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

document.querySelector('.nav__link').addEventListener('click',function(e){
  this.style.backgroundColor=randomColor();
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click',function(e){
  this.style.backgroundColor=randomColor();
});

document.querySelector('.nav').addEventListener('click',function(e){
  this.style.backgroundColor=randomColor();
});*/

/*document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click',function(e){
    e.preventDefault();
    const id=this.getAttribute('href');
    document.querySelector(id).scrollIntoView({beavior:'smooth'});
  })
});*/

//naviation on te parent directly: EVENT DELEGATION
//Addingevent handlers that are added dynamically
document.querySelector('.nav__links').
addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.classList.contains('nav__link')&&!e.target.textContent==='Login'){
      const id=e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({beavior:'smooth'});
    }
});

/*DOM TRAVERSAL
//const h1=document.querySelector('h1');
h1.firstElementChild.style.color='white';
h1.lastElementChild.style.color='orangered';

h1.closest('.header').style.background='var(--gradient-primary)';
h1.closest('h1').style.background='var(--gradient-secondary)';

//siblings
[...h1.parentElement.children].forEach(function(el){
  if(el!=h1) el.style.transform='scale(1)'
})
*/

//TABBED COMPONENTS
const tabsContainer=document.querySelector('.operations__tab-container');   //container
const tabs=document.querySelectorAll('.operations__tab');         //buttons
const tabsContent=document.querySelectorAll('.operations__content');  //tab selection(text and icon)

tabsContainer.addEventListener('click', 
function(e){
  const clicked=e.target.closest('.operations__tab'); // value returned --> truthy
  
  if(!clicked)return; //no clicks from container

  tabs.forEach(t=>t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(t=>t.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

const nav=document.querySelector('.nav');

const handleOpacity=function(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    
    siblings.forEach(el=>{
      if(el!==link) el.style.opacity=this;
    });
    logo.style.opacity=this;
  };
};

nav.addEventListener('mouseover',handleOpacity.bind(0.5));
nav.addEventListener('mouseout',handleOpacity.bind(1));

// Sticky nav

const initialCoords=section1.getBoundingClientRect();

window.addEventListener('scroll',function(){
  if(this.window.scrollY>initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

// const obsCallBack=function(entries,observer){
//   entries.forEach(entry=>{
//     console.log(entry);
//   });
// };

// const obsOptions={
//   root:null,
//   // threshold:0.1 //call back called if intersection is 10%
//   threshold:[0,0.2]
// };

// const observer=new IntersectionObserver(obsCallBack,obsOptions);
// observer.observe(section1);

const navHeight=nav.getBoundingClientRect().height;

const stickyNav=function(entries){
  const [entry]=entries;
  console.log(entry);
  if(!entry.isIntersecting)nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

//const header = document.querySelector('.header');
const headerObserver=new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
});
headerObserver.observe(header);

//Reveal sections

const revealSection=function(entries,observer){
  const [entry]=entries;

  if(!entry.isIntersecting)return;
  
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target); // stop observing
};

const sectionObserver=new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
});

//const allSections = document.querySelectorAll('.section');
allSections.forEach(section=>{
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

//Lazy loading images

const loadImg=function(entries,observer){
  const [entry]=entries;

  if(!entry.isIntersecting)return;

  entry.target.src=entry.target.dataset.src;
  //entry.target.classList.remove('lazy-img'); removes immediately  
  
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver=new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
});

const imgTargets=document.querySelectorAll('img[data-src]');

imgTargets.forEach(img=>imgObserver.observe(img));

// Slider

const slides=document.querySelectorAll('.slide');

let curSlide=0;
const maxSlide=slides.length;

const slider=document.querySelector('.slider');

//slider.style.transform='scale(1) ';
// slider.style.overflow='visible';

const goToSlide=function(slide){
  slides.forEach((s,i)=>s.style.transform=`translateX(${100*(i-slide)}%)`);
};

goToSlide(0); //0 100 200 300

const dotContainer=document.querySelector('.dots');

const createDots=function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};
createDots();

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide}=e.target.dataset;
    //const slide=e.targer.dataset.slide;
    goToSlide(slide);
    activeDot(slide);
  };
});

document.addEventListener('keydown',function(e){
  if(e.key==='ArrowLeft')prevSlide();
  else if(e.key==='ArrowRight')nextSlide();
});

const activeDot=function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot=>dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
activeDot(0);

const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');

const nextSlide=function(){
  if(curSlide==maxSlide-1) curSlide=0;
  else curSlide++;

  goToSlide(curSlide); //-100 0 100 200
  activeDot(curSlide);
};

btnRight.addEventListener('click',nextSlide);

const prevSlide=function(){
  if(curSlide===0) curSlide=maxSlide-1;
  else curSlide--;

  goToSlide(curSlide); //-100 0 100 200
  activeDot(curSlide);
};

btnLeft.addEventListener('click',prevSlide);

