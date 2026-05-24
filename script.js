/* ========================================
   PARTH SUTHAR — PORTFOLIO SCRIPT
   ======================================== */

/* ---------- CUSTOM CURSOR ---------- */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

/* Smooth ring follow */
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* Cursor expand on hover */
const hoverTargets = document.querySelectorAll('a, button, .skill-tag, .stag, .approach-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
}, { passive: true });


/* ---------- ACTIVE NAV LINK ---------- */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}
updateActiveNav();


/* ---------- TYPED EFFECT ---------- */
const words    = ['Student', 'Frontend Dev', 'PHP Developer', 'Problem Solver'];
const typedEl  = document.getElementById('typed');
let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function runTyped() {
  if (!typedEl) return;
  const currentWord = words[wordIndex];
  typedEl.textContent = isDeleting
    ? currentWord.slice(0, charIndex--)
    : currentWord.slice(0, charIndex++);

  let delay = isDeleting ? 55 : 95;

  if (!isDeleting && charIndex > currentWord.length) {
    delay      = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    wordIndex  = (wordIndex + 1) % words.length;
    charIndex  = 0;
    delay      = 320;
  }
  setTimeout(runTyped, delay);
}
runTyped();


/* ---------- SPOTLIGHT (mouse-tracked glow on cards) ---------- */
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(2);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(2);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
  });
});


/* ---------- SCROLL REVEAL ---------- */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        /* Stagger siblings inside same parent grid */
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx      = siblings.indexOf(entry.target);
        const delay    = (idx % 4) * 80; /* stagger up to 4 per row */
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ---------- CONTACT MODAL ---------- */
const modalBackdrop = document.getElementById('contactModal');
const openModalBtn  = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

function openModal() {
  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  /* Add modal links to hover targets */
  document.querySelectorAll('.modal-option, .modal-close').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

/* Close on backdrop click */
modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) closeModal();
});

/* Close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


/* ---------- SMOOTH SCROLL for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 90; /* nav height offset */
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ---------- HERO IMAGE — add your photo ---------- */
/*
  HOW TO ADD YOUR PHOTO:
  1. Place your photo file (e.g. photo.jpg) in the same folder as index.html
  2. Find the div with id="heroImage" in index.html
  3. Replace the inner <div class="hero-image-placeholder">...</div> with:
     <img src="photo.jpg" alt="Parth Suthar" style="width:100%;height:100%;object-fit:cover;border-radius:22px;">
*/
