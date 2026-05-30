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
    el.alt = `${project.title} — ${i + 1}`;
    el.loading = 'lazy';
    item.appendChild(el);
    item.addEventListener('click', () => openLightbox(i));
    grid.appendChild(item);
  });
}

// ── Lightbox ──────────────────────────────────

function applyLightboxSize(img) {
  const r        = img.getBoundingClientRect();
  const isMobile = window.innerWidth <= 768 || window.innerHeight <= 500;
  const close    = document.getElementById('lbClose');
  const closeH   = close.offsetHeight || 30;
  const prev     = document.getElementById('lbPrev');
  const next     = document.getElementById('lbNext');

  if (isMobile) {
    prev.style.left  = (r.left + 15) + 'px';
    prev.style.right = 'auto';
    next.style.right = (window.innerWidth - r.right + 15) + 'px';
    next.style.left  = 'auto';
    close.style.top  = Math.max(8, r.top - closeH - 8) + 'px';
  } else {
    const prevW = prev.offsetWidth  || 40;
    const nextW = next.offsetWidth  || 40;
    prev.style.left  = Math.min(r.left - prevW,  Math.max(0, r.left - 80)) + 'px';
    prev.style.right = 'auto';
    next.style.right = Math.min(window.innerWidth - r.right - nextW, Math.max(0, window.innerWidth - r.right - 80)) + 'px';
    next.style.left  = 'auto';
    close.style.top  = Math.min(r.top - closeH, Math.max(0, r.top - 80)) + 'px';
  }
}

function preloadAdjacent(index) {
  const n = lightboxImages.length;
  [-2, -1, 1, 2].forEach(offset => {
    const i = (index + offset + n) % n;
    new Image().src = `gimgs/${lightboxImages[i]}`;
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  const img = document.getElementById('lbImg');
  img.classList.remove('slide-next', 'slide-prev', 'lb-fadein');
  img.style.cssText = '';

  const src = `gimgs/${lightboxImages[index]}`;
  function show() {
    img.src = src;
    document.getElementById('lightbox').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('main-content').style.pointerEvents = 'none';
    applyLightboxSize(img);
    void img.offsetWidth;
    img.classList.add('lb-fadein');
    preloadAdjacent(index);
  }
  const preload = new Image();
  preload.onload = show;
  preload.src = src;
  if (preload.complete && preload.naturalWidth > 0) { preload.onload = null; show(); }
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.style.overflow = '';
  document.getElementById('main-content').style.pointerEvents = '';
}

function slideTo(direction) {
  const img  = document.getElementById('lbImg');
  const lb   = document.getElementById('lightbox');
  const rect = img.getBoundingClientRect();

  const exitX  = direction === 'next' ? '-110%' : '110%';
  const enterX = direction === 'next' ?  '110%' : '-110%';

  const oldGhost = document.getElementById('lbSlideGhost');
  if (oldGhost) oldGhost.remove();
  const ghost = document.createElement('img');
  ghost.id  = 'lbSlideGhost';
  ghost.src = img.src;
  ghost.style.cssText = [
    'position:fixed',
    `left:${rect.left}px`,
    `top:${rect.top}px`,
    `width:${rect.width}px`,
    `height:${rect.height}px`,
    'pointer-events:none',
    'z-index:1005',
    'object-fit:contain',
  ].join(';');
  lb.appendChild(ghost);

  const src = `gimgs/${lightboxImages[lightboxIndex]}`;
  img.style.transition = 'none';
  img.style.transform  = `translateX(${enterX})`;

  function show() {
    img.classList.remove('slide-next', 'slide-prev', 'lb-fadein');
    img.src = src;
    void img.offsetWidth;

    const t = 'transform 0.42s cubic-bezier(0.25, 0.1, 0.25, 1)';
    ghost.style.transition = t;
    ghost.style.transform  = `translateX(${exitX})`;
    img.style.transition   = t;
    img.style.transform    = 'translateX(0)';

    setTimeout(() => {
      ghost.remove();
      img.style.transition = '';
      img.style.transform  = '';
      applyLightboxSize(img);
      preloadAdjacent(lightboxIndex);
    }, 420);
  }

  const preload = new Image();
  preload.onload = show;
  preload.src = src;
  if (preload.complete && preload.naturalWidth > 0) { preload.onload = null; show(); }
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
function getContainRect(img) {
  const box = img.getBoundingClientRect();
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  if (!nw || !nh) return box;
  const imgRatio = nw / nh;
  const boxRatio = box.width / box.height;
  let rw, rh;
  if (imgRatio > boxRatio) {
    rw = box.width;
    rh = box.width / imgRatio;
  } else {
    rh = box.height;
    rw = box.height * imgRatio;
  }
  const left = box.left + (box.width - rw) / 2;
  const top  = box.top  + (box.height - rh) / 2;
  return { left, top, right: left + rw, bottom: top + rh };
}


document.getElementById('lightbox').addEventListener('click', e => {
  const lbImg = document.getElementById('lbImg');
  if (e.target !== document.getElementById('lightbox') && e.target !== lbImg) return;
  const r = getContainRect(lbImg);
  if (
    e.clientX < r.left   ||
    e.clientX > r.right  ||
    e.clientY < r.top    ||
    e.clientY > r.bottom
  ) {
    closeLightbox();
  }
});

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

let wheelLastTime = 0;
let wheelCoolingDown = false;
const WHEEL_COOLDOWN = 500;
const WHEEL_THRESHOLD = 30;

document.addEventListener('wheel', e => {
  if (document.getElementById('lightbox').classList.contains('hidden')) return;
  e.preventDefault();
  const now = Date.now();
  if (now - wheelLastTime > 200) wheelCoolingDown = false;
  wheelLastTime = now;
  if (wheelCoolingDown) return;
  if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
  wheelCoolingDown = true;
  setTimeout(() => { wheelCoolingDown = false; }, WHEEL_COOLDOWN);
  if (e.deltaY > 0) lbNext();
  else lbPrev();
}, { passive: false });

(function () {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');

  let startX      = 0;
  let startY      = 0;
  let currentDx   = 0;
  let currentDy   = 0;
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

  function snapBackVertical() {
    img.style.transition = `transform ${ANIM_MS}ms ease, opacity ${ANIM_MS}ms ease`;
    img.style.transform  = '';
    img.style.opacity    = '';
    setTimeout(() => { img.style.transition = ''; }, ANIM_MS + 20);
    isDragging = false;
    currentDy  = 0;
  }

  function closeWithAnimation() {
    img.style.transition = 'transform 280ms ease, opacity 280ms ease';
    img.style.transform  = `translateY(${window.innerHeight}px)`;
    img.style.opacity    = '0';
    isDragging = false;
    currentDy  = 0;
    setTimeout(() => {
      closeLightbox();
      img.style.transition = '';
      img.style.transform  = '';
      img.style.opacity    = '';
    }, 300);
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
      const src = `gimgs/${lightboxImages[lightboxIndex]}`;
      function show() {
        img.style.transition = 'none';
        img.style.transform  = '';
        img.classList.remove('slide-next', 'slide-prev', 'lb-fadein');
        img.src = src;
        applyLightboxSize(img);
        setTimeout(() => { img.style.transition = ''; }, 20);
        if (ref) ref.remove();
        preloadAdjacent(lightboxIndex);
      }
      const preload = new Image();
      preload.onload = show;
      preload.src = src;
      if (preload.complete && preload.naturalWidth > 0) { preload.onload = null; show(); }
    }, ANIM_MS + 10);
  }

  lb.addEventListener('touchstart', e => {
    if (lb.classList.contains('hidden') || e.touches.length !== 1) return;
    startX     = e.touches[0].clientX;
    startY     = e.touches[0].clientY;
    currentDx  = 0;
    currentDy  = 0;
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
    }

    if (isHoriz) {
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
    } else {
      if (dy <= 0) return;
      e.preventDefault();
      isDragging = true;
      currentDy  = dy;
      img.style.transform = `translateY(${dy}px)`;
      img.style.opacity   = String(Math.max(0, 1 - dy / (window.innerHeight * 0.4)));
    }
  }, { passive: false });

  lb.addEventListener('touchend', () => {
    if (!isDragging) { removeAdj(); return; }
    if (!isHoriz) {
      if (currentDy >= window.innerHeight * 0.10) {
        closeWithAnimation();
      } else {
        snapBackVertical();
      }
      return;
    }
    const ratio = window.innerWidth > window.innerHeight ? COMMIT_RATIO / 2 : COMMIT_RATIO;
    if (Math.abs(currentDx) >= window.innerWidth * ratio) {
      commitSwipe();
    } else {
      snapBack();
    }
  }, { passive: true });

  lb.addEventListener('touchcancel', () => {
    if (isDragging) {
      if (!isHoriz) snapBackVertical(); else snapBack();
    } else {
      removeAdj();
    }
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
    if (mouseDragged && Math.abs(currentDx) > 5) {
      e.stopImmediatePropagation();
    }
    mouseDragged = false;
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

// Unified sidebar swipe — open from left edge / close by dragging left
let sbStartX   = 0;
let sbStartY   = 0;
let sbActive   = false;
let sbMode     = null; // 'open' | 'close'
let sbWidth    = 0;
let sbDirKnown = false;
let sbCooldown = false;

document.addEventListener('touchstart', e => {
  if (sbCooldown) return;
  if (!document.getElementById('lightbox').classList.contains('hidden')) return;
  if (e.touches.length !== 1) return;
  const x = e.touches[0].clientX;
  const y = e.touches[0].clientY;
  if (sidebar.classList.contains('open')) {
    sbMode = 'close';
  } else if (x <= window.innerWidth * 0.20) {
    sbMode = 'open';
  } else {
    sbMode = null;
    return;
  }
  sbStartX   = x;
  sbStartY   = y;
  sbActive   = false;
  sbDirKnown = false;
  sbWidth    = sidebar.offsetWidth;
}, { passive: true });

document.addEventListener('touchmove', e => {
  if (!sbMode || e.touches.length !== 1) return;
  const dx = e.touches[0].clientX - sbStartX;
  const dy = e.touches[0].clientY - sbStartY;
  if (!sbDirKnown) {
    if (Math.abs(dx) <= 5 && Math.abs(dy) <= 5) return;
    if (Math.abs(dy) >= Math.abs(dx))      { sbMode = null; return; }
    if (sbMode === 'open'  && dx <= 0)     { sbMode = null; return; }
    if (sbMode === 'close' && dx >= 0)     { sbMode = null; return; }
    sbDirKnown = true;
    sbActive   = true;
    sidebar.style.transition = 'none';
  }
  if (!sbActive) return;
  const pos = sbMode === 'open'
    ? Math.min(0, -sbWidth + dx)
    : Math.min(0, dx);
  sidebar.style.transform = `translateX(${pos}px)`;
}, { passive: true });

document.addEventListener('touchend', e => {
  if (!sbActive) { sbMode = null; return; }
  const dx   = e.changedTouches[0].clientX - sbStartX;
  const mode = sbMode;
  sbActive   = false;
  sbMode     = null;
  sbCooldown = true;
  setTimeout(() => { sbCooldown = false; }, 300);
  const pos  = mode === 'open'
    ? Math.min(0, -sbWidth + dx)
    : Math.min(0, dx);
  sidebar.style.transition = '';
  if (pos > -sbWidth / 2) {
    sidebar.style.transform = 'translateX(0)';
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    sidebar.addEventListener('transitionend', function cleanup() {
      sidebar.removeEventListener('transitionend', cleanup);
      sidebar.style.transform = '';
    });
  } else {
    sidebar.style.transform = `translateX(-${sbWidth}px)`;
    sidebar.addEventListener('transitionend', function cleanup() {
      sidebar.removeEventListener('transitionend', cleanup);
      sidebar.style.transform = '';
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }
}, { passive: true });

// ── Init ──────────────────────────────────────

renderHome();
showSection('home');
