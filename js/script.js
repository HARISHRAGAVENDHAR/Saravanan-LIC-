/* Calculator, WhatsApp form, spotlight / tilt effects. Page switching is pure CSS. */
// ==========================================
// ACETERNITY SPOTLIGHT HOVER EFFECT
// ==========================================
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ==========================================
// FORM SUBMISSION (WHATSAPP ROUTING)
// ==========================================
const $= i => document.getElementById(i);$('send').addEventListener('click', e => {
  if (!$('n').value || !$('p').value) { alert('Please enter your name and phone number.'); return; }
  const text = encodeURIComponent(`Hello Saravanan, I'm ${$('n').value} (${$('p').value}). Interested in: ${$('i').value}. ${$('m').value}`);
  window.open(`https://wa.me/918438446334?text=${text}`, '_blank');
});

// ==========================================
// DYNAMIC CALCULATOR LOGIC
// ==========================================
const nf = n => Math.round(n).toLocaleString('en-IN');
const rs = n => '₹' + nf(n);
const val = id => { const v = String($(id).value).replace(/[^\d]/g, ''); return v ? parseInt(v, 10) : 0 };
const words = n => n >= 1e7 ? '₹' + (+(n / 1e7).toFixed(2)) + ' Crore' : n >= 1e5 ? '₹' + (+(n / 1e5).toFixed(2)) + ' Lakh' : rs(n);

const ids = ['ci', 'cl', 'cg', 'cc', 'cs'];
const def = { ci: '6,00,000', cl: '0', cg: '0', cc: '0', cs: '0' };
let shown = 0, raf;

function showAmount(to) {
  cancelAnimationFrame(raf);
  const from = shown, t0 = performance.now(), d = (window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches) ? 0 : 800;
  const step = now => {
    const p = d ? 1 : Math.min(1, (now - t0) / d);
    const e = 1 - Math.pow(1 - p, 4); // Quartic ease out
    shown = from + (to - from) * e;
    $('cbig').textContent = rs(shown);
    if (p < 1) raf = requestAnimationFrame(step);
    else { shown = to; $('cbig').textContent = rs(to); }
  };
  raf = requestAnimationFrame(step);
}

function calc() {
  const inc = val('ci'), yrs = +$('cy').value, loan = val('cl'), goal = val('cg'), cover = val('cc'), sav = val('cs');$('cyo').textContent = yrs + ' years';
  
  const incNeed = inc * yrs;
  const need = incNeed + loan + goal;
  const have = cover + sav;
  const gap = Math.max(0, need - have);
  
  showAmount(gap);
  $('cwords').textContent = gap ? 'That is approximately ' + words(gap) : 'Your current cover and savings already meet this estimate.';
  
  const row = (label, amount, isTotal = false) => `
    <div class="rw ${isTotal ? 'tot' : ''}">
      <span>${label}</span>
      <span>${amount}</span>
    </div>
  `;
  
  $('crows').innerHTML = 
    row(`Income × years (${rs(inc)} × ${yrs})`, rs(incNeed)) + 
    row('Existing loans', '+ ' + rs(loan)) + 
    row('Child goals', '+ ' + rs(goal)) + 
    row('Total protection needed', rs(need), true) + 
    row('Existing life cover', '− ' + rs(cover)) + 
    row('Savings counted', '− ' + rs(sav));
    
  const waText = encodeURIComponent(`Hello Saravanan, my cover estimate:\nIncome: ${rs(inc)}, ${yrs} years\nLoans: ${rs(loan)}\nGoals: ${rs(goal)}\nExisting Cover: ${rs(cover)}\nSavings: ${rs(sav)}\n*Additional cover needed: ${rs(gap)}*.\nPlease guide me.`);
  $('cwa').href = `https://wa.me/918438446334?text=${waText}`;
}

// Attach Calculator Events
ids.forEach(id => { 
  const el = $(id); 
  el.addEventListener('input', calc); 
  el.addEventListener('blur', () => { el.value = nf(val(id)) }); 
  el.addEventListener('focus', () => el.select());
});
$('cy').addEventListener('input', calc);
$('cgo').addEventListener('click', calc);$('crs').addEventListener('click', () => { 
  ids.forEach(id => $(id).value = def[id]);$('cy').value = 15; 
  calc(); 
});

// Init
calc();

// ==========================================
// PREMIUM EFFECTS (hover devices only, respects reduced motion)
// ==========================================
(function(){
  document.querySelectorAll('input[name=pg]').forEach(r=>r.addEventListener('change',()=>window.scrollTo({top:0,behavior:'instant'})));
  const hd=document.querySelector('header'),onS=()=>hd.classList.toggle('scrolled',window.scrollY>30);addEventListener('scroll',onS,{passive:true});onS();
  const mm=q=>!!(window.matchMedia&&matchMedia(q).matches),fine=mm('(hover:hover) and (pointer:fine)'),calm=mm('(prefers-reduced-motion:reduce)');
  if(!fine||calm)return;
  document.querySelectorAll('.tilt').forEach(c=>{
    c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      c.style.transform=`perspective(900px) rotateX(${-y*6}deg) rotateY(${x*8}deg) translateY(-5px)`});
    c.addEventListener('mouseleave',()=>{c.style.transform=''});
  });
  document.querySelectorAll('.btn-uiverse').forEach(b=>{
    b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();
      b.style.setProperty('--tx',((e.clientX-r.left)/r.width-.5)*10+'px');b.style.setProperty('--ty',((e.clientY-r.top)/r.height-.5)*8+'px')});
    b.addEventListener('mouseleave',()=>{b.style.removeProperty('--tx');b.style.removeProperty('--ty')});
  });
  const g=document.createElement('div');g.className='cursor-glow';document.body.appendChild(g);let gx=0,gy=0,tx=0,ty=0;
  addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;g.style.opacity=1});document.addEventListener('mouseleave',()=>{g.style.opacity=0});
  (function loop(){gx+=(tx-gx)*.14;gy+=(ty-gy)*.14;g.style.transform=`translate(${gx}px,${gy}px)`;requestAnimationFrame(loop)})();
  const hero=document.querySelector('.hero'),bg=document.querySelector('.aurora-bg');
  hero.addEventListener('mousemove',e=>{bg.style.setProperty('--px',(e.clientX/innerWidth-.5)*-40);bg.style.setProperty('--py',(e.clientY/innerHeight-.5)*-30)});
})();
