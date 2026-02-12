// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if(toggle){
  toggle.addEventListener('click', ()=>{
    nav.classList.toggle('open');
  });
}

// Bunny nose sound and animation
(() => {
  const nose = document.getElementById('bunny-nose');
  if(!nose) return;

  // WebAudio boop
  function playBoop(){
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.21);

    // close the context shortly after
    setTimeout(()=>{ if(ctx && ctx.close) ctx.close(); }, 500);
  }

  function tapAnimation(){
    nose.classList.add('tapped');
    setTimeout(()=> nose.classList.remove('tapped'), 180);
  }

  function handleBoop(){
    // Play sound and animate
    try{ playBoop(); }catch(e){ /* ignore audio errors */ }
    tapAnimation();
  }

  nose.addEventListener('click', handleBoop);
  nose.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBoop(); }
  });
})();