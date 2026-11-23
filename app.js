import {firebaseConfig} from './firebase-config.js';
const track=document.querySelector('#track'),thumbs=document.querySelector('#thumbs'),counter=document.querySelector('#counter');let photos=[],index=0;
try{const r=await fetch('./gallery.json');if(!r.ok)throw Error();photos=(await r.json()).photos;}catch{photos=['00.jpg','01.jpg','02.jpg','03.jpg','05.jpg','06.jpg','07.jpg','08.jpg','09.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg'];}
photos.forEach((file,i)=>{const slide=document.createElement('div');slide.className='gallery-slide';const im=document.createElement('img');im.src='photos/'+encodeURIComponent(file);im.alt=`웨딩 갤러리 ${i+1}`;im.loading='lazy';slide.append(im);track.append(slide);const b=document.createElement('button');b.setAttribute('aria-label',`${i+1}번 사진 보기`);const t=document.createElement('img');t.src=im.src;t.alt='';t.loading='lazy';b.append(t);b.onclick=()=>go(i);thumbs.append(b)});
function go(i){if(!photos.length)return;index=(i+photos.length)%photos.length;track.style.transform=`translateX(-${index*100}%)`;counter.textContent=`${String(index+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`;[...thumbs.children].forEach((x,n)=>x.classList.toggle('active',n===index));thumbs.children[index] && (thumbs.scrollLeft = thumbs.children[index].offsetLeft - thumbs.offsetLeft - thumbs.clientWidth/2 + 28)}go(0);document.querySelector('#prev').onclick=()=>go(index-1);document.querySelector('#next').onclick=()=>go(index+1);let sx=0;const vp=document.querySelector('#viewport');vp.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});vp.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(index+(dx<0?1:-1))},{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.querySelector('#share').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);alert('링크를 복사했어요.')}catch{prompt('아래 주소를 복사해 주세요.',location.href)}};
// API 주소는 config.js에서 설정합니다. 설정 전에는 갤러리만 정상 표시됩니다.
import {API_BASE} from './config.js';
const form=document.querySelector('#guest-form'),status=document.querySelector('#guest-status'),messages=document.querySelector('#messages');
async function loadMessages(){if(!API_BASE)return;try{const r=await fetch(API_BASE+'/comments');if(!r.ok)throw Error();const data=await r.json();messages.replaceChildren();data.forEach(d=>{const item=document.createElement('div');item.className='message';const h=document.createElement('strong');h.textContent=d.name;const time=document.createElement('time');time.textContent=new Date(d.createdAt).toLocaleDateString('ko-KR');const t=document.createElement('p');t.textContent=d.message;item.append(h,time,t);messages.append(item)})}catch{status.textContent='댓글을 불러오지 못했습니다.'}}
if(!API_BASE){status.textContent='댓글 기능은 무료 서버 연결 후 활성화됩니다.';form.querySelector('button').disabled=true}else{loadMessages();}
form.onsubmit=async e=>{e.preventDefault();if(!API_BASE)return;const name=document.querySelector('#guest-name').value.trim(),message=document.querySelector('#guest-message').value.trim();if(!name||!message)return;const btn=form.querySelector('button');btn.disabled=true;try{const r=await fetch(API_BASE+'/comments',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,message})});if(!r.ok)throw Error(await r.text());form.reset();status.textContent='축하 메시지가 등록되었습니다.';await loadMessages()}catch(e){status.textContent='등록에 실패했습니다. 잠시 후 다시 시도해 주세요.'}finally{btn.disabled=false}};
// 브라우저 자동 스크롤 복원과 썸네일 scrollIntoView의 페이지 이동 방지
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.addEventListener('load',()=>{if(!location.hash)window.scrollTo({top:0,behavior:'instant'})});
const audio=document.querySelector('#bgm'),music=document.querySelector('#music-toggle');
audio.volume=0.28;
let manuallyPaused=false;
function updateMusicButton(){music.textContent=audio.paused?'♫ 음악 켜기':'♫ 음악 끄기';music.setAttribute('aria-pressed',String(!audio.paused));}
async function tryStartMusic(){if(manuallyPaused||!audio.paused)return;try{await audio.play();updateMusicButton();removeFirstGestureListeners()}catch{updateMusicButton()}}
function firstGesture(){if(!manuallyPaused)void tryStartMusic()}
const gestureOptions={capture:true,passive:true};
function removeFirstGestureListeners(){document.removeEventListener('pointerdown',firstGesture,true);document.removeEventListener('touchstart',firstGesture,true);document.removeEventListener('keydown',firstGesture,true)}
document.addEventListener('pointerdown',firstGesture,gestureOptions);
document.addEventListener('touchstart',firstGesture,gestureOptions);
document.addEventListener('keydown',firstGesture,true);
music.addEventListener('click',async()=>{if(!audio.paused){manuallyPaused=true;audio.pause();updateMusicButton()}else{manuallyPaused=false;try{await audio.play();removeFirstGestureListeners()}catch{}updateMusicButton()}});
audio.addEventListener('play',updateMusicButton);
audio.addEventListener('pause',updateMusicButton);
void tryStartMusic();

// API에 저장된 최신 사진 순서로 갤러리를 다시 구성
if(API_BASE){try{const r=await fetch(API_BASE+'/gallery');if(r.ok){const data=await r.json();if(Array.isArray(data.photos)){photos=data.photos;track.replaceChildren();thumbs.replaceChildren();photos.forEach((file,i)=>{const slide=document.createElement('div');slide.className='gallery-slide';const im=document.createElement('img');im.src=file.startsWith('https://')?file:'photos/'+encodeURIComponent(file);im.alt=`웨딩 갤러리 ${i+1}`;im.loading='lazy';slide.append(im);track.append(slide);const b=document.createElement('button');b.setAttribute('aria-label',`${i+1}번 사진 보기`);const t=document.createElement('img');t.src=im.src;t.alt='';t.loading='lazy';b.append(t);b.onclick=()=>go(i);thumbs.append(b)});go(0)}}}catch(e){console.warn('갤러리 기본 목록 사용',e)}}
