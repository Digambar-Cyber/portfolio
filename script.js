/* ============================================
   DIGAMBAR PORTFOLIO — script.js
   ============================================ */

/* ── CUSTOM CURSOR ──────────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Dot snaps instantly
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';

  // Ring follows with smooth lag
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();

/* ── STICKY NAV ON SCROLL ───────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── SCROLL REVEAL ──────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── PROJECT EXPAND / COLLAPSE ──────────────── */
/**
 * Toggle expanded detail panel for a project.
 * @param {string} id - The id of the .project-expanded div to toggle.
 */
function toggleProject(id) {
  const panel = document.getElementById(id);
  if (!panel) return;
  panel.classList.toggle('open');
}

/* ── STAT COUNTER ANIMATION ─────────────────── */
/**
 * Animate a number counting up from 0 to target.
 * @param {HTMLElement} statItem - The .stat-item containing a .stat-num child.
 * @param {number}      target   - The final number to count to.
 * @param {string}      suffix   - Text appended after the number (e.g. '+', 'yr').
 */
function animateCounter(statItem, target, suffix = '') {
  const numEl    = statItem.querySelector('.stat-num');
  const duration = 1500; // ms
  let startTime  = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const current  = Math.floor(progress * target);
    numEl.innerHTML = current + '<span>' + suffix + '</span>';
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Trigger counters when the stats section enters the viewport
const statsRow = document.querySelector('.stats-row');

if (statsRow) {
  const statItems = document.querySelectorAll('.stat-item');

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(statItems[0], 3,  '+');   // Projects Shipped
        animateCounter(statItems[1], 29, '+');   // Features (Explore India)
        // Third stat (∞) is decorative — no counter needed
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsRow);
}
