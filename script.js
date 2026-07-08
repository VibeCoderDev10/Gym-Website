// ── LOADER ──────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1500);
});

// ── NAVBAR SCROLL ────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE MENU ──────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function closeMobile() { mobileMenu.classList.remove('open'); }

// ── PARALLAX ─────────────────────────────────────────────
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroBg) heroBg.style.transform = `translateY(${y * 0.4}px)`;
});

// ── SCROLL REVEAL ─────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObs.observe(el));

// ── ANIMATED COUNTERS ─────────────────────────────────────
const counters = document.querySelectorAll('.counter');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const dur = 1800;
      const step = target / (dur / 16);
      let cur = 0;
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
        else el.textContent = Math.floor(cur).toLocaleString();
      }, 16);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// ── TESTIMONIAL SLIDER ────────────────────────────────────
(function() {
  const track = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderDots');
  const cards = track.querySelectorAll('.testi-card');
  let current = 0;
  let perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const total = Math.ceil(cards.length / perView);

  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.className = 'dot' + (i === current ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(d);
    }
  }

  function goTo(idx) {
    current = (idx + total) % total;
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * perView * cardW}px)`;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  buildDots();
  document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

  window.addEventListener('resize', () => {
    const newPer = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    if (newPer !== perView) { perView = newPer; current = 0; buildDots(); goTo(0); }
  });

  // auto-advance
  setInterval(() => goTo(current + 1), 5000);
})();
