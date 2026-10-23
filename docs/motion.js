'use strict';
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 if(reduced.matches)return;
 document.body.classList.add('enhanced-motion');
 const hero=document.querySelector('.hero-art');
 if(hero&&fine.matches){
  const cursor=document.createElement('div');cursor.className='art-cursor';cursor.innerHTML='<span>EXPLORE<br>SEU POTENCIAL</span><b>↗</b>';hero.append(cursor);
  const move=e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hero.style.setProperty('--mx',x);hero.style.setProperty('--my',y);hero.style.setProperty('--light-x',`${(x+.5)*100}%`);hero.style.setProperty('--light-y',`${(y+.5)*100}%`);cursor.style.left=(e.clientX-r.left)+'px';cursor.style.top=(e.clientY-r.top)+'px'};
  hero.addEventListener('pointermove',move,{passive:true});hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--mx',0);hero.style.setProperty('--my',0)});
  hero.setAttribute('title','Mova o cursor para explorar a composição');
 }
 const shineTargets=document.querySelectorAll('.path-row,.course-card,.continue-card,.elora-preview,.panel');
 shineTargets.forEach(el=>{el.addEventListener('pointermove',e=>{if(!fine.matches)return;const r=el.getBoundingClientRect();el.style.setProperty('--hover-x',`${e.clientX-r.left}px`);el.style.setProperty('--hover-y',`${e.clientY-r.top}px`);if(el.matches('.elora-preview')){el.style.setProperty('--tilt-x',`${-(e.clientY-r.top-r.height/2)/45}deg`);el.style.setProperty('--tilt-y',`${(e.clientX-r.left-r.width/2)/45}deg`)}},{passive:true});el.addEventListener('pointerleave',()=>{el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg')})});
 if(fine.matches){document.querySelectorAll('.hero-actions .button,.final-cta .button,.elora-left .button').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.translate=`${(e.clientX-r.left-r.width/2)*.08}px ${(e.clientY-r.top-r.height/2)*.1}px`});el.addEventListener('pointerleave',()=>el.style.translate='0 0')})}
 const parallaxSections=[...document.querySelectorAll('.manifesto h2,.method>div:first-child,.about-brand,.final-cta .cta-orbit')];
 let frame=false;
 const onScroll=()=>{if(frame)return;frame=true;requestAnimationFrame(()=>{parallaxSections.forEach((el,i)=>{const r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0){const amount=(r.top+r.height/2-innerHeight/2)*(i===3?.12:.035);el.style.translate=`0 ${Math.max(-35,Math.min(35,amount))}px`}});frame=false})};
 addEventListener('scroll',onScroll,{passive:true});onScroll();
 document.querySelectorAll('.method-steps article,.path-list>.path-row').forEach((el,i)=>el.style.transitionDelay=`${i*.085}s`);
 const portal=document.querySelector('#portal');
 if(portal){const animate=()=>{portal.animate([{opacity:0,transform:'translateY(12px)',filter:'blur(3px)'},{opacity:1,transform:'translateY(0)',filter:'blur(0)'}],{duration:430,easing:'cubic-bezier(.2,.65,.3,1)'});portal.querySelectorAll('.course-card,.stat,.resource-row').forEach((el,i)=>el.animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:500,delay:i*70,fill:'backwards',easing:'cubic-bezier(.2,.65,.3,1)'}))};new MutationObserver(mutations=>{if(mutations.some(m=>m.target===portal))animate()}).observe(portal,{childList:true});animate()}
 document.querySelectorAll('a[href]').forEach(a=>a.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||a.target==='_blank'||e.defaultPrevented)return;const url=new URL(a.href,location.href);if(url.origin===location.origin&&url.pathname!==location.pathname){e.preventDefault();document.body.classList.add('page-leaving');setTimeout(()=>location.href=url.href,230)}}));
 addEventListener('pageshow',()=>document.body.classList.remove('page-leaving'));
})();
