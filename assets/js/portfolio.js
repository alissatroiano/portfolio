/* ═══════════════════════════════════════════════════
   portfolio.js — Wave gallery with glass cards
   ═══════════════════════════════════════════════════ */

/* ── Shared wave renderer (mirrors index.html) ─────── */
function initWaveCanvas(canvas, opts) {
  if (!canvas) return;
  const cfg = Object.assign({
    lineColor: 'rgba(255,255,255,0.82)',
    count: 26,
    amplitude: 0.24,
    frequency: 1.35,
    speed: 0.004,
    lineWidth: 1.1,
    animated: true,
  }, opts);

  const ctx = canvas.getContext('2d');
  let phase = 0, raf;

  function size() {
    const p = canvas.parentElement;
    canvas.width  = p ? p.offsetWidth  : canvas.offsetWidth  || 800;
    canvas.height = p ? p.offsetHeight : canvas.offsetHeight || 600;
  }

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = cfg.lineColor;
    ctx.lineWidth   = cfg.lineWidth;

    for (let i = 0; i < cfg.count; i++) {
      const t     = i / (cfg.count - 1);
      const baseY = H * 0.04 + t * H * 0.92;
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const p  = x / W;
        const w1 = Math.sin(p * Math.PI * cfg.frequency + phase + t * 0.55) * H * cfg.amplitude;
        const w2 = Math.sin(p * Math.PI * cfg.frequency * 2.1 + phase * 0.65 + t * 1.15) * H * cfg.amplitude * 0.3;
        const y  = baseY + w1 + w2;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    if (cfg.animated) { phase += cfg.speed; raf = requestAnimationFrame(draw); }
  }

  size();
  draw();

  const ro = new ResizeObserver(() => { size(); if (!cfg.animated) draw(); });
  ro.observe(canvas.parentElement || canvas);
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
}

/* ── Project data ────────────────────────────────── */
const projects = [
  {
    id: 27,
    title: 'Logic Lift',
    subtitle: 'Legacy Mainframe to Modern Logic',
    desc: 'Autonomous modernization platform that deconstructs monolithic COBOL systems and reconstructs them into cloud-native Python.',
    categories: ['Hackathon', 'AI'],
    stack: ['TypeScript', 'React', 'Gemini 3', 'Google AI Studio'],
    award: 'Honorable Mention — Gemini 3 DeepMind Hackathon',
  },
  {
    id: 21,
    title: 'Neomate',
    subtitle: 'Neonatal AI Assistant',
    desc: 'Compassionate AI platform providing therapeutic support and evidence-based information for families navigating neonatal hospitalization.',
    categories: ['AI', 'Hackathon', 'Fullstack'],
    stack: ['React', 'Eleven Labs', 'OpenAI', 'Supabase', 'Bolt.new'],
  },
  {
    id: 26,
    title: 'Laundry Service',
    subtitle: 'Small Business Website',
    desc: 'Landing page for a local laundry pick-up, wash, fold and delivery service.',
    categories: ['Frontend', 'UI Design'],
    stack: ['TypeScript', 'Tailwind CSS', 'HTML', 'Canva'],
  },
  {
    id: 24,
    title: 'Trend Tracker',
    subtitle: 'Social Analytics Dashboard',
    desc: 'Dashboard app where users can view realtime social media follower data over the last 10 days.',
    categories: ['Frontend', 'UI Design'],
    stack: ['Apex Charts', 'Node.js', 'TypeScript', 'React', 'Tailwind'],
  },
  {
    id: 1,
    title: 'Hue',
    subtitle: 'Create & Sell AI Art',
    desc: 'Digital art store and image generation app with custom ML models powered by MindsDB and DALL-E 3.',
    categories: ['AI', 'Fullstack'],
    stack: ['Python', 'Django', 'MindsDB', 'OpenAI', 'AWS S3', 'Stripe'],
  },
  {
    id: 4,
    title: 'Inklusion',
    subtitle: 'Pride Art Gallery',
    desc: 'Online gallery celebrating LGBTQIA+ art throughout history, with artist profiles and a community resource section.',
    categories: ['Hackathon', 'Frontend'],
    stack: ['HTML', 'CSS', 'Bootstrap 5', 'JavaScript'],
    award: '1st Place — Code Institute Hackathon',
  },
  {
    id: 6,
    title: 'Electrillo',
    subtitle: 'EV Fuel Cost Calculator',
    desc: 'Calculate money saved by switching from fuel to electric vehicles, with a built-in EV search tool.',
    categories: ['Hackathon', 'Frontend'],
    stack: ['JavaScript', 'HTML', 'CSS', 'Bootstrap 5', 'JSON'],
    award: '1st Place — Code Institute Hackathon',
  },
  {
    id: 7,
    title: 'Smitten',
    subtitle: "Valentine's Wordle Game",
    desc: "Love-themed Wordle word game built for Code Institute's Valentine's Day hackathon.",
    categories: ['Hackathon', 'Game Dev'],
    stack: ['JavaScript', 'HTML', 'CSS', 'Bootstrap', 'JSON'],
    award: '1st Place — Code Institute Hackathon',
  },
  {
    id: 10,
    title: 'Emojourney',
    subtitle: 'Emoji Travel Guide',
    desc: 'A guide educating people about the different meanings of emojis across world cultures.',
    categories: ['Hackathon', 'Frontend'],
    stack: ['JavaScript', 'HTML', 'CSS', 'Bootstrap 5'],
    award: '1st Place — Code Institute Hackathon',
  },
  {
    id: 15,
    title: 'Cosmos',
    subtitle: 'Three.JS Space Game',
    desc: "Space game where players control a planet's orbit and must avoid colliding with others. Built for AWS Game Builder.",
    categories: ['Game Dev', 'Frontend'],
    stack: ['Three.js', 'JavaScript', 'HTML', 'CSS', 'Node'],
  },
  {
    id: 16,
    title: 'Snooscapes',
    subtitle: 'Reddit Community Game',
    desc: 'Keep Snoo alive by building stick bridges between platforms. Score increases as you progress.',
    categories: ['Game Dev', 'Hackathon'],
    stack: ['JavaScript', 'TypeScript', 'Devvit API', 'HTML Canvas'],
  },
  {
    id: 17,
    title: 'Screen Snaps',
    subtitle: 'Daily Movie Guessing Game',
    desc: 'A new movie scene is revealed each day — guess the film in 3 tries.',
    categories: ['Game Dev', 'Hackathon'],
    stack: ['JavaScript', 'TypeScript', 'Devvit API'],
  },
  {
    id: 18,
    title: 'Slangman',
    subtitle: 'Gen-Z Hangman Game',
    desc: 'English slang word game inspired by Hangman. Guess Millennial & Gen Z internet slang before the man falls.',
    categories: ['Game Dev', 'Hackathon'],
    stack: ['JavaScript', 'TypeScript', 'Devvit API', 'Kaggle'],
  },
  {
    id: 14,
    title: 'Dash',
    subtitle: 'Recipe Sharing App',
    desc: 'Full-stack recipe sharing platform with CRUD, user auth, and AWS S3 photo storage.',
    categories: ['Fullstack'],
    stack: ['Python', 'Flask', 'MongoDB', 'AWS S3', 'Bootstrap 5'],
  },
  {
    id: 13,
    title: 'Coast VA',
    subtitle: 'Girls Lacrosse Club',
    desc: 'Client site with Google Sheets + GitHub Actions integration so the client can update content from a spreadsheet.',
    categories: ['Frontend', 'Fullstack'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Google Apps Script', 'GitHub Actions'],
  },
  {
    id: 8,
    title: 'Game of Facts',
    subtitle: 'GoT Trivia Game',
    desc: 'Interactive trivia game about the real history behind Game of Thrones.',
    categories: ['Game Dev', 'Frontend'],
    stack: ['JavaScript', 'jQuery', 'HTML', 'CSS', 'Bootstrap 4'],
    award: 'Merit Award — Code Institute',
  },
  {
    id: 9,
    title: 'Infinity',
    subtitle: 'Yoga Studio Landing Page',
    desc: 'Responsive website for a fictional NYC Yoga & Meditation studio. Code Institute Milestone 1.',
    categories: ['Frontend', 'UI Design'],
    stack: ['HTML', 'CSS', 'Bootstrap 4', 'JavaScript'],
    award: 'Distinction — Code Institute',
  },
  {
    id: 5,
    title: 'Muzak',
    subtitle: 'YouTube Music Player',
    desc: 'React-powered app that fetches and streams YouTube videos by ID or title via the YouTube Data API.',
    categories: ['Frontend'],
    stack: ['React', 'JavaScript', 'HTML', 'CSS', 'YouTube API'],
  },
  {
    id: 11,
    title: 'DeathScape',
    subtitle: 'Star Wars Escape Room',
    desc: 'Escape the Death Star using Star Wars knowledge to unlock mini-games and lead everyone to safety.',
    categories: ['Game Dev', 'Hackathon'],
    stack: ['JavaScript', 'HTML', 'CSS', 'Bootstrap 5'],
    award: '3rd Place — Code Institute Hackathon',
  },
  {
    id: 22,
    title: 'Coming Soon',
    subtitle: 'Dara Budabin Fashion',
    desc: "Fashionable coming-soon page for an independent fashion designer's upcoming e-commerce launch.",
    categories: ['Frontend', 'UI Design'],
    stack: ['JavaScript', 'HTML', 'CSS', 'Canvas'],
  },
  {
    id: 19,
    title: 'Cassie The Cat',
    subtitle: "Children's Book",
    desc: 'Illustrated picture book about a timid cat learning bravery. Characters, scenes, and cover; self-published via KDP.',
    categories: ['Illustrations', 'UI Design'],
    stack: ['Canva Pro', 'KDP', 'Amazon'],
  },
  {
    id: 20,
    title: 'Magic of Love',
    subtitle: 'Book Illustration',
    desc: 'Illustrated a heartwarming story about a lonely duck and a young peacock forming an unlikely bond.',
    categories: ['Illustrations', 'UI Design'],
    stack: ['Canva Pro', 'KDP', 'Amazon'],
  },
  {
    id: 25,
    title: 'Bridal Shower',
    subtitle: 'Stationery Design',
    desc: 'Custom bridal shower stationery suite — invitations, menus, signage and coordinated print materials.',
    categories: ['Illustrations', 'UI Design'],
    stack: ['Canva Pro'],
  },
  {
    id: 23,
    title: 'The Odditie',
    subtitle: 'WordPress Arts Blog',
    desc: 'Online arts & entertainment blog spotlighting artists of every genre — Fine Art to Graffiti to digital.',
    categories: ['Frontend', 'UI Design'],
    stack: ['Adobe Creative Suite', 'WordPress'],
  },
  {
    id: 2,
    title: 'OLLA × OBBA',
    subtitle: 'Wait Queue Management',
    desc: "Customer onboarding React app for OLLA AI's integration with OBBA, a Korean BBQ restaurant in Singapore.",
    categories: ['Frontend', 'Fullstack'],
    stack: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
];

const CATEGORIES = ['All', 'Hackathon', 'AI', 'Frontend', 'UI Design', 'Fullstack', 'Game Dev', 'Illustrations'];

/* ── Build filter bar ────────────────────────────── */
function buildFilterBar() {
  const header = document.querySelector('#gallery .col-12.text-start.mt-5');
  if (!header) return;

  const bar = document.createElement('div');
  bar.className = 'gallery-filter-bar';

  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'gallery-filter-btn' + (cat === 'All' ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(cat);
    });
    bar.appendChild(btn);
  });

  header.appendChild(bar);
}

/* ── Render cards ────────────────────────────────── */
function renderCards(activeCategory = 'All') {
  const grid = document.querySelector('#project-container .row');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.categories.includes(activeCategory));

  filtered.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${idx * 0.045}s`;

    const stackHtml = (p.stack || [])
      .map(t => `<span class="project-card-stack-pill">${t}</span>`)
      .join('');

    const awardHtml = p.award
      ? `<div class="project-card-award"><i class="fas fa-star"></i>${p.award}</div>`
      : '';

    card.innerHTML = `
      <div class="project-card-header">
        <div class="project-card-category">${p.categories[0] || ''}</div>
        <div class="project-card-monogram">✦ AT</div>
        ${awardHtml}
      </div>
      <div class="project-card-body">
        <div class="project-card-title">${p.title}</div>
        <div class="project-card-subtitle">${p.subtitle}</div>
        <div class="project-card-rule"></div>
        <p class="project-card-desc">${p.desc}</p>
        <div class="project-card-stack">${stackHtml}</div>
      </div>
      <div class="project-card-footer">
        <button class="project-card-cta">
          View Project <i class="fas fa-arrow-right" style="font-size:0.5rem;"></i>
        </button>
        <div class="project-card-arrow"><i class="fas fa-plus"></i></div>
      </div>
    `;

    card.addEventListener('click', () => {
      const modalEl = document.getElementById(`projectModal${p.id}`);
      if (modalEl) new bootstrap.Modal(modalEl).show();
    });

    grid.appendChild(card);
  });
}

/* ── Init everything on DOMContentLoaded ─────────── */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Full-section wave canvas (same renderer as index.html hero)
  initWaveCanvas(document.getElementById('galleryWaveCanvas'), {
    lineColor: 'rgba(255,255,255,0.80)',
    count:     32,
    amplitude: 0.26,
    frequency: 1.3,
    speed:     0.0033,
    lineWidth: 1.05,
  });

  // 2. Filter bar + initial card render
  buildFilterBar();
  renderCards('All');

  // 3. Back to top
  const topBtn = document.getElementById('btn-back-to-top');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('visible', window.scrollY > 300);
    });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // 4. Theme toggle (mirrors index.html)
  const toggles = Array.from(document.querySelectorAll('[data-theme-toggle]'));
  const icon    = toggles[0] ? toggles[0].querySelector('i') : null;

  function setDark(on) {
    document.body.classList.toggle('dark-mode', on);
    document.querySelectorAll('#mainNav').forEach(el => el.classList.toggle('dark-mode', on));
    if (!icon) return;
    if (on) { icon.classList.replace('fa-moon', 'fa-sun');  localStorage.setItem('theme', 'dark');  }
    else    { icon.classList.replace('fa-sun',  'fa-moon'); localStorage.setItem('theme', 'light'); }
  }

  setDark((localStorage.getItem('theme') || 'light') === 'dark');
  toggles.forEach(t => t.addEventListener('click', () =>
    setDark(!document.body.classList.contains('dark-mode'))
  ));

  // 5. Navbar collapse on link click
  const navLinks   = document.querySelectorAll('.nav-item');
  const menuToggle = document.getElementById('navbarCollapse');
  if (menuToggle) {
    const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
    navLinks.forEach(l => l.addEventListener('click', () => bsCollapse.hide()));
  }

  // 6. Dropdown filter buttons also close navbar
  document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const dropdownToggle = item.closest('.dropdown-menu').previousElementSibling;
      const dd = bootstrap.Dropdown.getInstance(dropdownToggle);
      if (dd) dd.hide();
      const nc = document.querySelector('.navbar-collapse');
      if (nc) {
        const bsc = bootstrap.Collapse.getInstance(nc) || new bootstrap.Collapse(nc, { toggle: false });
        bsc.hide();
      }
    });
  });
});
