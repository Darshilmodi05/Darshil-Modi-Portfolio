/* ===========================
   NAVBAR — ACTIVE + HAMBURGER
=========================== */
const navLinks = document.querySelectorAll('.nl');
const sections = document.querySelectorAll('section[id]');

function setActive() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-sec') === current);
  });
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

// Hamburger
const ham = document.getElementById('ham');
const mobDrawer = document.getElementById('mobDrawer');
ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mobDrawer.classList.toggle('open');
});
document.querySelectorAll('.mob-nl').forEach(a => {
  a.addEventListener('click', () => {
    ham.classList.remove('open');
    mobDrawer.classList.remove('open');
  });
});

/* ===========================
   THEME TOGGLE
=========================== */
const themeToggleBtn = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

/* ===========================
   PARTICLE CANVAS
=========================== */
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createDots() {
    dots = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.35 + 0.05,
        dx: (Math.random() - 0.5) * 0.18,
        dy: (Math.random() - 0.5) * 0.18,
        twinkleSpeed: Math.random() * 0.012 + 0.004,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x += d.dx;
      d.y += d.dy;
      d.alpha += d.twinkleSpeed * d.twinkleDir;
      if (d.alpha >= 0.4 || d.alpha <= 0.03) d.twinkleDir *= -1;
      if (d.x < 0) d.x = W;
      if (d.x > W) d.x = 0;
      if (d.y < 0) d.y = H;
      if (d.y > H) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const colorPrefix = isLight ? '0,0,0' : '255,255,255';
      ctx.fillStyle = `rgba(${colorPrefix},${d.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createDots(); });
  resize();
  createDots();
  draw();
})();

/* ===========================
   SCROLL REVEAL
=========================== */
const reveals = document.querySelectorAll('.skill-block, .proj-card, .contact-form, .sec-title, .sec-tag, .contact-sub');
reveals.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('show'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObs.observe(el));

/* ===========================
   CONTACT FORM
=========================== */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
  e.preventDefault();
  const orig = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  setTimeout(() => {
    successMsg.classList.add('show');
    form.reset();
    submitBtn.textContent = orig;
    submitBtn.disabled = false;
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }, 1400);
});

/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
