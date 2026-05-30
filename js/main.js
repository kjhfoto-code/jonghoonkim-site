const PROJECTS = [
  {
    id: 'bohemian-ways',
    title: 'Bohemian ways',
    category: 'Projects',
    images: [
      '5_bw003.jpg','5_dsc8055.jpg','5_dsc6143.jpg','5_dsc6147.jpg','5_dsc6397.jpg',
      '5_dsc6321-copy.jpg','5_dsc6176.jpg','5_bw004.jpg','5_dsc5482.jpg','5_dsc5349.jpg',
      '5_bw005.jpg','5_dsc8662.jpg','5_kjh0615.jpg','5_dsc6059.jpg','5_bw001.jpg',
      '5_bw010.jpg','5_bw007.jpg','5_bw006.jpg','5_dsc8396.jpg','5_bw009.jpg',
      '5_bw008.jpg','5_bw011.jpg'
    ]
  },
  {
    id: 'midnight-journey',
    title: 'Midnight journey',
    category: 'Projects',
    images: [
      '14_dsc9975.jpg','14_dscf4377-copy.jpg','14_dscf4171-copy.jpg','14_dsc8994.jpg',
      '14_dscf6169.jpg','14_dsc4627.jpg','14_dsc8965.jpg','14_dsc5903.jpg',
      '14_dscf6272.jpg','14_dscf6506-copy2.jpg'
    ]
  },
  {
    id: 'thailand',
    title: 'Thailand',
    category: 'Projects',
    images: [
      '7_it002.jpg','7_it003.jpg','7_it001.jpg','7_g6p21698.jpg','7_it004.jpg',
      '7_it005.jpg','7_g6p22020.jpg','7_it006.jpg','7_it007.jpg'
    ]
  },
  {
    id: 'china',
    title: 'China',
    category: 'Projects',
    images: [
      '18_dsc3069.jpg','18_dsc3068.jpg','18_dsc3079.jpg','18_dsc3089.jpg',
      '18_dsc3366.jpg','18_dsc3377.jpg','18_dsc3552.jpg','18_dsc3119.jpg',
      '18_dsc3438.jpg','18_dsc3309.jpg','18_dsc3495.jpg','18_dsc3578.jpg'
    ]
  },
  {
    id: '12032011',
    title: '12.03.2011',
    category: 'Projects',
    images: [
      '17_dsc7648.jpg','17_dsc7123.jpg','17_dsc7272.jpg','17_dsc7112.jpg',
      '17_dsc7133.jpg','17_dsc7437.jpg','17_dsc7232.jpg','17_dsc7480.jpg',
      '17_dsc7346.jpg','17_dsc7316.jpg'
    ]
  },
  {
    id: 'archipelago',
    title: 'Archipelago',
    category: 'Ongoing Projects',
    images: [
      '21_dsc4357.jpg','21_dsc4348.jpg','21_dsc4245.jpg','21_dsc4266.jpg',
      '21_dsc4207.jpg','21_dsc4255.jpg','21_dsc4408.jpg','21_dsc4420.jpg',
      '21_dsc4144.jpg','21_dsc3847.jpg','21_dsc4117.jpg','21_dsc3436.jpg',
      '21_dsc3572.jpg','21_dsc4002.jpg','21_dsc3321.jpg'
    ]
  },
  {
    id: 'movin-scape',
    title: "Movin' scape",
    category: 'Ongoing Projects',
    images: [
      '19_dsc8559vertical640px.jpg','19_dsc8888.jpg','19_dsc0180.jpg','19_dsc0429.jpg',
      '19_dsc0469.jpg','19_dsc0407-2.jpg','19_jmk2635.jpg','19_jmk1023.jpg',
      '19_jmk2485.jpg','19_dsc9099.jpg'
    ]
  },
  {
    id: 'portrait',
    title: 'Portrait',
    category: 'Ongoing Projects',
    images: [
      '16_dsc0578.jpg','16_dsc0385.jpg','16_jmk5167_v2.jpg','16_file592.jpg',
      '16_file614.jpg','16_jmk5153600px2_v2.jpg'
    ]
  }
];

// ── State ─────────────────────────────────────

let currentSection = 'home';
let currentProject = null;
let lightboxImages = [];
let lightboxIndex = 0;

// ── Navigation ────────────────────────────────

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));

  if (id === 'biography') {
    document.getElementById('biography').classList.add('active');
  } else if (id === 'home') {
    document.getElementById('home').classList.add('active');
  } else {
    const project = PROJECTS.find(p => p.id === id);
    if (project) {
      renderGallery(project);
      document.getElementById('gallery').classList.add('active');
      currentProject = project;
    } else {
      document.getElementById('home').classList.add('active');
      id = 'home';
    }
  }

  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.dataset.section === id) a.classList.add('active');
  });

  currentSection = id;
  window.scrollTo(0, 0);

  if (window.innerWidth <= 768) {
    closeSidebar();
  }
}

// ── Home grid ─────────────────────────────────

function renderHome() {
  const grid = document.getElementById('homeGrid');
  grid.innerHTML = '';
  PROJECTS.forEach(project => {
    const card = document.createElement('div');
    card.className = 'home-card';
    card.innerHTML = `
      <img src="gimgs/${project.images[0]}" alt="${project.title}" loading="lazy">
      <div class="home-card-meta">

        <span class="home-card-title">${project.title}</span>
      </div>
    `;
    card.addEventListener('click', () => showSection(project.id));
    grid.appendChild(card);
  });
}

// ── Gallery ───────────────────────────────────

function renderGallery(project) {
  document.getElementById('galleryTitle').textContent = project.title;
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  lightboxImages = project.images;

  project.images.forEach((img, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    const el = document.createElement('img');
    el.src = `gimgs/${img}`;
    el.alt = '';
    el.loading = 'lazy';
    item.appendChild(el);
    item.addEventListener('click', () => openLightbox(i));
    grid.appendChild(item);
  });
}

// ── Lightbox ──────────────────────────────────

function applyLightboxSize(img) {
  const maxW = Math.min(img.naturalWidth * 2, window.innerWidth * 0.75);
  const maxH = Math.min(img.naturalHeight * 2, window.innerHeight * 0.75);

  let w, h;
  if (img.naturalWidth / img.naturalHeight >= maxW / maxH) {
    w = maxW;
    h = img.naturalHeight * (maxW / img.naturalWidth);
  } else {
    h = maxH;
    w = img.naturalWidth * (maxH / img.naturalHeight);
  }
  img.style.width  = w + 'px';
  img.style.height = h + 'px';

  const imgLeft = (window.innerWidth - w) / 2;
  const imgTop  = (window.innerHeight - h) / 2;
  const prev  = document.getElementById('lbPrev');
  const next  = document.getElementById('lbNext');
  const close = document.getElementById('lbClose');

  const prevW  = prev.offsetWidth  || 40;
  const nextW  = next.offsetWidth  || 40;
  const closeH = close.offsetHeight || 30;

  // Place 80px outside image edge; clamp so button never overlaps image
  prev.style.left  = Math.min(imgLeft - prevW,  Math.max(0, imgLeft - 80)) + 'px';
  prev.style.right = 'auto';
  next.style.right = Math.min(imgLeft - nextW,  Math.max(0, imgLeft - 80)) + 'px';
  next.style.left  = 'auto';
  close.style.top  = Math.min(imgTop  - closeH, Math.max(0, imgTop  - 80)) + 'px';
}

function openLightbox(index) {
  lightboxIndex = index;
  const img = document.getElementById('lbImg');
  img.classList.remove('slide-next', 'slide-prev');
  img.style.cssText = '';
  img.onload = () => applyLightboxSize(img);
  img.src = `gimgs/${lightboxImages[lightboxIndex]}`;
  document.getElementById('lightbox').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.style.overflow = '';
}

function slideTo(direction) {
  const img = document.getElementById('lbImg');
  img.classList.remove('slide-next', 'slide-prev');
  void img.offsetWidth;
  img.style.cssText = '';
  img.onload = () => {
    applyLightboxSize(img);
    img.classList.add(direction === 'next' ? 'slide-next' : 'slide-prev');
  };
  img.src = `gimgs/${lightboxImages[lightboxIndex]}`;
}

function lbPrev() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  slideTo('prev');
}

function lbNext() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  slideTo('next');
}

// ── Event listeners ───────────────────────────

document.getElementById('lbClose').addEventListener('click', e => {
  e.stopPropagation();
  closeLightbox();
});
document.getElementById('lbPrev').addEventListener('click', e => {
  e.stopPropagation();
  lbPrev();
});
document.getElementById('lbNext').addEventListener('click', e => {
  e.stopPropagation();
  lbNext();
});
document.getElementById('lbImg').addEventListener('click', e => {
  e.stopPropagation();
});
document.getElementById('lightbox').addEventListener('click', closeLightbox);

window.addEventListener('resize', () => {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  if (!lb.classList.contains('hidden') && img.complete && img.naturalWidth) {
    applyLightboxSize(img);
  }
});

document.addEventListener('keydown', e => {
  if (document.getElementById('lightbox').classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbPrev();
  if (e.key === 'ArrowRight') lbNext();
});

(function () {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');

  let startX      = 0;
  let startY      = 0;
  let currentDx   = 0;
  let isDragging  = false;
  let isHoriz     = null; // null=undecided, true=horizontal, false=vertical
  let adjEl       = null;
  let swipeDir    = null; // 'next' | 'prev'

  const COMMIT_RATIO = 0.10;
  const ANIM_MS      = 240;

  function adjIndex(dir) {
    return dir === 'next'
      ? (lightboxIndex + 1) % lightboxImages.length
      : (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  }

  function createAdjEl(dir) {
    const r  = img.getBoundingClientRect();
    const el = document.createElement('img');
    el.src = `gimgs/${lightboxImages[adjIndex(dir)]}`;
    el.style.cssText = [
      'position:fixed',
      `width:${r.width}px`,
      `height:${r.height}px`,
      `left:${r.left}px`,
      `top:${r.top}px`,
      'object-fit:contain',
      'user-select:none',
      'pointer-events:none',
      'z-index:1005',
    ].join(';');
    el.style.transform = `translateX(${dir === 'next' ? window.innerWidth : -window.innerWidth}px)`;
    lb.appendChild(el);
    return el;
  }

  function removeAdj() {
    if (adjEl) { adjEl.remove(); adjEl = null; }
  }

  function snapBack() {
    img.style.transition = `transform ${ANIM_MS}ms ease`;
    img.style.transform  = '';
    if (adjEl) {
      const offset = swipeDir === 'next' ? window.innerWidth : -window.innerWidth;
      adjEl.style.transition = `transform ${ANIM_MS}ms ease`;
      adjEl.style.transform  = `translateX(${offset}px)`;
      const ref = adjEl;
      setTimeout(() => ref.remove(), ANIM_MS + 20);
      adjEl = null;
    }
    setTimeout(() => { img.style.transition = ''; }, ANIM_MS + 20);
    isDragging = false;
    swipeDir   = null;
  }

  function commitSwipe() {
    const screenW  = window.innerWidth;
    const exitX    = swipeDir === 'next' ? -screenW : screenW;

    img.style.transition = `transform ${ANIM_MS}ms ease`;
    img.style.transform  = `translateX(${exitX}px)`;
    if (adjEl) {
      adjEl.style.transition = `transform ${ANIM_MS}ms ease`;
      adjEl.style.transform  = 'translateX(0)';
    }

    const ref = adjEl;
    const dir = swipeDir;
    adjEl      = null;
    isDragging = false;
    swipeDir   = null;

    setTimeout(() => {
      lightboxIndex = dir === 'next'
        ? (lightboxIndex + 1) % lightboxImages.length
        : (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
      img.style.transition = 'none';
      img.style.transform  = '';
      img.classList.remove('slide-next', 'slide-prev');
      img.onload = () => applyLightboxSize(img);
      img.src    = `gimgs/${lightboxImages[lightboxIndex]}`;
      if (ref) ref.remove();
    }, ANIM_MS + 10);
  }

  lb.addEventListener('touchstart', e => {
    if (lb.classList.contains('hidden') || e.touches.length !== 1) return;
    startX     = e.touches[0].clientX;
    startY     = e.touches[0].clientY;
    currentDx  = 0;
    isDragging = false;
    isHoriz    = null;
    swipeDir   = null;
    removeAdj();
    img.style.transition = 'none';
    img.classList.remove('slide-next', 'slide-prev');
  }, { passive: true });

  lb.addEventListener('touchmove', e => {
    if (lb.classList.contains('hidden') || e.touches.length !== 1) return;

    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;

    if (isHoriz === null) {
      if (Math.abs(dx) <= 5 && Math.abs(dy) <= 5) return;
      isHoriz = Math.abs(dx) > Math.abs(dy);
      if (!isHoriz) return;
    } else if (!isHoriz) {
      return;
    }

    e.preventDefault();
    isDragging = true;
    currentDx  = dx;

    const newDir = dx < 0 ? 'next' : 'prev';
    if (swipeDir !== newDir) {
      removeAdj();
      swipeDir = newDir;
      adjEl    = createAdjEl(swipeDir);
    }

    img.style.transform = `translateX(${dx}px)`;
    const base = swipeDir === 'next' ? window.innerWidth : -window.innerWidth;
    adjEl.style.transform = `translateX(${base + dx}px)`;
  }, { passive: false });

  lb.addEventListener('touchend', () => {
    if (!isDragging) { removeAdj(); return; }
    const ratio = window.innerWidth > window.innerHeight ? COMMIT_RATIO / 2 : COMMIT_RATIO;
    if (Math.abs(currentDx) >= window.innerWidth * ratio) {
      commitSwipe();
    } else {
      snapBack();
    }
  }, { passive: true });

  lb.addEventListener('touchcancel', () => {
    if (isDragging) snapBack(); else removeAdj();
  }, { passive: true });

  // Mouse drag (desktop)
  const MOUSE_COMMIT_RATIO = 0.05;
  let mouseDragged = false;

  lb.addEventListener('mousedown', e => {
    if (lb.classList.contains('hidden')) return;
    if (e.target.closest('button')) return;
    e.preventDefault();
    startX       = e.clientX;
    startY       = e.clientY;
    currentDx    = 0;
    isDragging   = false;
    isHoriz      = null;
    swipeDir     = null;
    mouseDragged = false;
    removeAdj();
    img.style.transition = 'none';
    img.classList.remove('slide-next', 'slide-prev');

    function onMouseMove(e) {
      e.preventDefault();
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (isHoriz === null) {
        if (Math.abs(dx) <= 5 && Math.abs(dy) <= 5) return;
        isHoriz = Math.abs(dx) > Math.abs(dy);
        if (!isHoriz) return;
      } else if (!isHoriz) return;

      isDragging   = true;
      mouseDragged = true;
      currentDx    = dx;

      const newDir = dx < 0 ? 'next' : 'prev';
      if (swipeDir !== newDir) {
        removeAdj();
        swipeDir = newDir;
        adjEl    = createAdjEl(swipeDir);
      }

      img.style.transform = `translateX(${dx}px)`;
      const base = swipeDir === 'next' ? window.innerWidth : -window.innerWidth;
      adjEl.style.transform = `translateX(${base + dx}px)`;
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (!isDragging) { removeAdj(); return; }
      if (Math.abs(currentDx) >= window.innerWidth * MOUSE_COMMIT_RATIO) {
        commitSwipe();
      } else {
        snapBack();
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Capture-phase click handler: eat the synthetic click that fires after a drag ends
  lb.addEventListener('click', e => {
    if (mouseDragged) {
      e.stopImmediatePropagation();
      mouseDragged = false;
    }
  }, true);

  // Prevent browser's native image drag
  img.addEventListener('dragstart', e => e.preventDefault());
}());

document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    showSection(a.dataset.section);
  });
});

const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('active');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
}

document.getElementById('menuToggle').addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

sidebarOverlay.addEventListener('click', closeSidebar);

// drag sidebar to close (real-time follow)
let sbTouchStartX = 0;
let sbTouchStartY = 0;
let sbDragging = false;
let sbDirectionKnown = false;

sidebar.addEventListener('touchstart', e => {
  sbTouchStartX = e.touches[0].clientX;
  sbTouchStartY = e.touches[0].clientY;
  sbDragging = false;
  sbDirectionKnown = false;
}, { passive: true });

sidebar.addEventListener('touchmove', e => {
  if (!sidebar.classList.contains('open')) return;
  const dx = e.touches[0].clientX - sbTouchStartX;
  const dy = e.touches[0].clientY - sbTouchStartY;

  if (!sbDirectionKnown && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
    sbDirectionKnown = true;
    sbDragging = Math.abs(dx) > Math.abs(dy) && dx < 0;
    if (sbDragging) sidebar.style.transition = 'none';
  }

  if (!sbDragging) return;
  sidebar.style.transform = `translateX(${dx}px)`;
}, { passive: true });

sidebar.addEventListener('touchend', e => {
  if (!sbDragging) return;
  sbDragging = false;

  const dx = e.changedTouches[0].clientX - sbTouchStartX;
  sidebar.style.transition = '';

  if (Math.abs(dx) > sidebar.offsetWidth * 0.5) {
    sidebar.style.transform = 'translateX(-100%)';
    sidebar.addEventListener('transitionend', function cleanup() {
      sidebar.removeEventListener('transitionend', cleanup);
      sidebar.style.transform = '';
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  } else {
    sidebar.style.transform = 'translateX(0)';
    sidebar.addEventListener('transitionend', function cleanup() {
      sidebar.removeEventListener('transitionend', cleanup);
      sidebar.style.transform = '';
    });
  }
}, { passive: true });

// ── Init ──────────────────────────────────────

renderHome();
showSection('home');
