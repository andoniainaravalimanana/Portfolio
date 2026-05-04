/* ══════════════════════════════════════
   NAVBAR — scroll & hamburger
══════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-link');

// Sticky shadow on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active link based on scroll position
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ══════════════════════════════════════
   SCROLL ANIMATIONS
══════════════════════════════════════ */
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

animatedEls.forEach(el => observer.observe(el));

// Hero elements animate on load
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll('.hero [data-animate]');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 200);
  });
});

/* ══════════════════════════════════════
   SKILL CARDS — stagger on scroll
══════════════════════════════════════ */
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    skillCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 80);
    });
    skillObserver.disconnect();
  }
}, { threshold: 0.1 });

skillCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease';
});

const skillsWrapper = document.querySelector('.skills-wrapper');
if (skillsWrapper) skillObserver.observe(skillsWrapper);

/* ══════════════════════════════════════
   PROJECT CARDS — tilt effect on hover
══════════════════════════════════════ */
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ══════════════════════════════════════
   SMOOTH TYPING EFFECT — hero greeting
══════════════════════════════════════ */
const greetingText = 'Bonjour, je suis';
const greetingEl = document.querySelector('.hero-greeting');

if (greetingEl) {
  // Extract the line element
  const line = greetingEl.querySelector('.greeting-line');
  // Clear and retype
  greetingEl.innerHTML = '';
  if (line) greetingEl.appendChild(line);

  const textNode = document.createTextNode('');
  greetingEl.appendChild(textNode);

  let i = 0;
  function typeChar() {
    if (i < greetingText.length) {
      textNode.textContent += greetingText[i];
      i++;
      setTimeout(typeChar, 60);
    }
  }
  setTimeout(typeChar, 800);
}

/* ══════════════════════════════════════
   COUNTER ANIMATION — stats
══════════════════════════════════════ */
function animateCounter(el, target, duration = 1500) {
  const isInfinity = el.textContent === '∞';
  if (isInfinity) return;

  const start = 0;
  const step = (timestamp) => {
    if (!step.startTime) step.startTime = timestamp;
    const progress = Math.min((timestamp - step.startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '+');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.stat-number').forEach(el => {
      const text = el.textContent;
      if (text === '∞') return;
      const num = parseInt(text);
      el.dataset.suffix = text.replace(/\d/g, '');
      animateCounter(el, num);
    });
    statsObserver.disconnect();
  }
}, { threshold: 0.5 });

const statsEl = document.querySelector('.about-stats');
if (statsEl) statsObserver.observe(statsEl);

