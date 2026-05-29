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
        <span class="home-card-category">${project.category}</span>
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
  if (img.naturalWidth >= img.naturalHeight) {
    img.style.width = `min(${img.naturalWidth * 2}px, 90vw)`;
    img.style.height = 'auto';
  } else {
    img.style.width = 'auto';
    img.style.height = `min(${img.naturalHeight * 2}px, 90vh)`;
  }
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

document.addEventListener('keydown', e => {
  if (document.getElementById('lightbox').classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbPrev();
  if (e.key === 'ArrowRight') lbNext();
});

(function () {
  let touchStartX = 0;
  let touchStartY = 0;
  const SWIPE_THRESHOLD = 50;
  const TAP_THRESHOLD = 10;
  const lb = document.getElementById('lightbox');

  lb.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  lb.addEventListener('touchend', e => {
    if (lb.classList.contains('hidden')) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < TAP_THRESHOLD) return; // tap — let click events fire naturally

    e.preventDefault(); // moved enough: prevent synthetic click
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      dx < 0 ? lbNext() : lbPrev();
    }
  }, { passive: false });
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

// swipe left on sidebar to close
let sbTouchStartX = 0;
let sbTouchStartY = 0;

sidebar.addEventListener('touchstart', e => {
  sbTouchStartX = e.touches[0].clientX;
  sbTouchStartY = e.touches[0].clientY;
}, { passive: true });

sidebar.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - sbTouchStartX;
  const dy = e.changedTouches[0].clientY - sbTouchStartY;
  if (dx < -40 && Math.abs(dy) < Math.abs(dx)) {
    closeSidebar();
  }
}, { passive: true });

// ── Init ──────────────────────────────────────

renderHome();
showSection('home');
