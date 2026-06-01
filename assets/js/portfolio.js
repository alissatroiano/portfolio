/* ═══════════════════════════════════════════════════
   portfolio.js — Wave gallery with glass cards
   Projects and modals rendered from portfolio.json
   ═══════════════════════════════════════════════════ */

/* ── Shared wave renderer ─────────────────────────── */
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

let galleryWaveCleanup = null;
function initGalleryWave() {
  if (galleryWaveCleanup) galleryWaveCleanup();
  galleryWaveCleanup = initWaveCanvas(document.getElementById('galleryWaveCanvas'), {
    lineColor: document.body.classList.contains('dark-mode')
      ? 'rgba(255,255,255,0.80)'
      : 'rgba(15, 23, 42, 0.95)',
    count:     32,
    amplitude: 0.26,
    frequency: 1.3,
    speed:     0.0033,
    lineWidth: 1.05,
  });
}

const CATEGORIES = ['All', 'Hackathon', 'AI', 'Frontend', 'UI Design', 'Fullstack', 'Game Dev', 'Illustrations'];

/* ── Build filter bar ────────────────────────────── */
function buildFilterBar(projects) {
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
      renderCards(projects, cat);
    });
    bar.appendChild(btn);
  });

  header.appendChild(bar);
}

/* ── Render project cards ────────────────────────── */
function renderCards(projects, activeCategory = 'All') {
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

    const headerBg = p['project-card-header'] 
      ? `style="background-image: url('${p['project-card-header']}')"`
      : '';

    card.innerHTML = `
      <div class="project-card-header" ${headerBg}>
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

/* ── Build media block (image or youtube iframe) ─── */
function buildMedia(media) {
  if (!media) return '';

  if (media.type === 'youtube') {
    return `
      <div class="ratio ratio-16x9">
        <iframe src="${media.src}" title="${media.title || ''}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>`;
  }

  return `<img src="${media.src}" alt="${media.alt || ''}" class="img-wrapper--reverse img-fluid project-img" />`;
}

/* ── Build a single modal element ────────────────── */
function buildModal(p) {
  const modalId = `projectModal${p.id}`;

  const awardHtml = p.award
    ? `<div class="award-text">${p.award}</div>`
    : '';

  const mediaHtml = buildMedia(p.media);

  // Right column: about is always shown; problem/solution/extraImage are optional
  let rightSections = '';

  if (p.about) {
    rightSections += `
      <div class="text-mark-projects"><i class="fas fa-circle-info"></i> About</div>
      <p>${p.about}</p>`;
  }

  if (p.problem) {
    rightSections += `
      <div class="text-mark-projects"><i class="fas fa-circle-question"></i> Problem</div>
      <p>${p.problem}</p>`;
  }

  if (p.solution) {
    rightSections += `
      <div class="text-mark-projects"><i class="fas fa-lightbulb"></i> Solution</div>
      <p>${p.solution}</p>`;
  }

  if (p.extraImage) {
    rightSections += `<img src="${p.extraImage.src}" alt="${p.extraImage.alt || ''}" class="img-wrapper--reverse img-fluid project-img mt-3" />`;
  }

  rightSections += `
    <div class="text-mark-projects"><i class="fas fa-wrench"></i> Stack</div>
    <p class="tech-stack">${(p.stack || []).join(' · ')}</p>`;

  // Footer links — if there are none, show nothing
  const footerHtml = (p.links || []).map(link =>
    `<a href="${link.url}" target="_blank" rel="noopener"><button class="project-button">${link.label}</button></a>`
  ).join('');

  // Layout: if there's a media item, split left/right; otherwise right column is full-width
  const bodyHtml = mediaHtml
    ? `
      <div class="row">
        <div class="col-lg-7 mb-4 mb-lg-0">
          ${mediaHtml}
          ${rightSections.includes('About') ? '' : rightSections}
        </div>
        <div class="col-lg-5 col-xl-4 offset-xl-1 border-start-lg">
          ${rightSections}
        </div>
      </div>`
    : `<div class="row"><div class="col-12">${rightSections}</div></div>`;

  // For projects with both media AND about text in left column, restructure
  const bodyHtmlFinal = buildModalBody(p, mediaHtml, rightSections);

  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = modalId;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', `${modalId}Label`);
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable w-100">
      <div class="modal-content">
          <div class="modal-header-inner">
            <div class="modal-header-copy">
              <div class="modal-eyebrow">${p.categories.join(' · ')}</div>
              <h1 id="${modalId}Label" class="folio-title display-3">
                ${p.title} <span class="text-light-purple">— ${p.subtitle}</span>
              </h1>
              ${awardHtml}
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

        <div class="modal-body">
          ${bodyHtmlFinal}
        </div>

        ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}

      </div>
    </div>`;

  return modal;
}

/* ── Modal body layout helper ────────────────────── */
function buildModalBody(p, mediaHtml, rightSections) {
  // Projects that have media in left + additional about/problem/solution
  // vs. projects where all content lives in one column
  const hasLeftContent = !!mediaHtml;

  if (!hasLeftContent) {
    return `
      <div class="row">
        <div class="col-12">${rightSections}</div>
      </div>`;
  }

  // Build left column: media + (about only if no problem/solution to avoid duplication)
  let leftExtra = '';
  if (p.about && !p.problem && !p.solution) {
    leftExtra = `
      <div class="text-mark-projects mt-3"><i class="fas fa-circle-info"></i> About</div>
      <p>${p.about}</p>`;
  } else if (p.about) {
    leftExtra = `
      <div class="text-mark-projects mt-3"><i class="fas fa-circle-info"></i> About</div>
      <p>${p.about}</p>`;
  }

  // Right column: problem/solution/extra image/stack (skip about if already in left)
  let rightCol = '';

  if (p.problem) {
    rightCol += `
      <div class="text-mark-projects"><i class="fas fa-circle-question"></i> Problem</div>
      <p>${p.problem}</p>`;
  }

  if (p.solution) {
    rightCol += `
      <div class="text-mark-projects"><i class="fas fa-lightbulb"></i> Solution</div>
      <p>${p.solution}</p>`;
  }

  if (p.extraImage) {
    rightCol += `<img src="${p.extraImage.src}" alt="${p.extraImage.alt || ''}" class="img-wrapper--reverse img-fluid project-img mt-3" />`;
  }

  rightCol += `
    <div class="text-mark-projects"><i class="fas fa-wrench"></i> Stack</div>
    <p class="tech-stack">${(p.stack || []).join(' · ')}</p>`;

  // If there's no problem/solution, put about + stack both in right col to keep layout clean
  if (!p.problem && !p.solution && !p.extraImage) {
    return `
      <div class="row">
        <div class="col-lg-7 mb-4 mb-lg-0">
          ${mediaHtml}
        </div>
        <div class="col-lg-5 col-xl-4 offset-xl-1 border-start-lg">
          ${p.about ? `<div class="text-mark-projects"><i class="fas fa-circle-info"></i> About</div><p>${p.about}</p>` : ''}
          <div class="text-mark-projects"><i class="fas fa-wrench"></i> Stack</div>
          <p class="tech-stack">${(p.stack || []).join(' · ')}</p>
        </div>
      </div>`;
  }

  return `
    <div class="row">
      <div class="col-lg-7 mb-4 mb-lg-0">
        ${mediaHtml}
        ${leftExtra}
      </div>
      <div class="col-lg-5 col-xl-4 offset-xl-1 border-start-lg">
        ${rightCol}
      </div>
    </div>`;
}

/* ── Inject all modals into the page ─────────────── */
function renderModals(projects) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  projects.forEach(p => {
    const modal = buildModal(p);
    container.appendChild(modal);

    // Init wave canvas lazily when modal opens
    const canvas = modal.querySelector('.modal-header-canvas');
    if (canvas) {
      let waveStarted = false;
      modal.addEventListener('shown.bs.modal', () => {
        if (!waveStarted) {
          initWaveCanvas(canvas, {
            lineColor: 'rgba(255,255,255,0.55)',
            count: 18,
            amplitude: 0.28,
            frequency: 1.3,
            speed: 0.002,
            lineWidth: 0.85,
          });
          waveStarted = true;
        }
      });
    }
  });
}

/* ── Init everything on DOMContentLoaded ─────────── */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Fetch project data from JSON
  fetch('assets/data/portfolio.json')
    .then(res => res.json())
    .then(projects => {

      // 2. Full-section wave canvas
      initGalleryWave();

      // 3. Filter bar + initial card render
      buildFilterBar(projects);
      renderCards(projects, 'All');

      // 4. Render all modals dynamically
      renderModals(projects);

      // 5. Dropdown filter buttons in nav also trigger card filter
      document.querySelectorAll('.dropdown-menu .filter-btn').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const cat = item.dataset.category || 'All';

          // Update filter bar active state to match
          document.querySelectorAll('.gallery-filter-btn').forEach(b => {
            b.classList.toggle('active', b.textContent === cat);
          });

          renderCards(projects, cat);

          // Close dropdown and navbar
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
    })
    .catch(err => console.error('Failed to load portfolio.json:', err));

  // 6. Back to top
  const topBtn = document.getElementById('btn-back-to-top');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('visible', window.scrollY > 300);
    });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // 7. Theme toggle
  const toggles = Array.from(document.querySelectorAll('[data-theme-toggle]'));
  const icon    = toggles[0] ? toggles[0].querySelector('i') : null;

  function setDark(on) {
    document.body.classList.toggle('dark-mode', on);
    document.querySelectorAll('#mainNav').forEach(el => el.classList.toggle('dark-mode', on));
    initGalleryWave();
    if (!icon) return;
    if (on) { icon.classList.replace('fa-moon', 'fa-sun');  localStorage.setItem('theme', 'dark');  }
    else    { icon.classList.replace('fa-sun',  'fa-moon'); localStorage.setItem('theme', 'light'); }
  }

  setDark((localStorage.getItem('theme') || 'dark') === 'dark');
  toggles.forEach(t => t.addEventListener('click', () =>
    setDark(!document.body.classList.contains('dark-mode'))
  ));

  // 8. Navbar collapse on link click
  const navLinks   = document.querySelectorAll('.nav-item');
  const menuToggle = document.getElementById('navbarCollapse');
  if (menuToggle) {
    const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
    navLinks.forEach(l => l.addEventListener('click', () => bsCollapse.hide()));
  }
});