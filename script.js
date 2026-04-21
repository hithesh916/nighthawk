console.log('H Hawk Script Initialized');

/* =================== LENIS SMOOTH SCROLL =================== */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4ba6
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: true,
  touchMultiplier: 2,
  infinite: false,
});

// Update Lenis on Scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrate Lenis with other scroll triggers if needed
window.lenis = lenis;

// Ensure smooth scroll to anchors uses Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            lenis.scrollTo(target, {
                offset: -100,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    });
});

// INSTRUCTIONS FOR FUTURE UPDATES:
// 1. To change price/name: Edit the values in the 'products' array below.
// 2. To add real images: Add image: 'path/to/img.jpg' to the product object.
// 3. To add a new product: Copy an existing object and give it a unique ID.

const products = [
  { id: 1, name: 'Acid Wash Graphic Tee', category: 'T-Shirt', gender: 'Men', price: 999, badge: 'exclusive', sizes: ['S','M','L','XL'], icon: '👕', image: 'products/hawk_tee.png?v=1.1' },
  { id: 13, name: 'Night Hawk Target Archival Tee', category: 'T-Shirt', gender: 'Men', price: 1099, badge: 'new', sizes: ['S','M','L'], icon: '🎯', image: 'products/target_tee_front.png', gallery: ['products/target_tee_front.png', 'products/target_tee_back.png'] },
  { id: 15, name: 'Night Hawk Valkyrie Archival Tee', category: 'T-Shirt', gender: 'Men', price: 1099, badge: 'new', sizes: ['S','M','L'], icon: '✨', image: 'products/valkyrie_bird_front.png', gallery: ['products/valkyrie_bird_front.png', 'products/valkyrie_bird_back.png'] },
  { id: 2, name: 'Hawkeye Graphic Tee', category: 'T-Shirt', gender: 'Men', price: 999, badge: 'hot', sizes: ['S','M','L','XL','XXL'], icon: '⚡', image: 'products/hero_vol1.jpg' },
  { id: 3, name: 'Stealth Track Pants', category: 'Track Pants', gender: 'Men', price: 1799, badge: 'new', sizes: ['S','M','L','XL'], icon: '🔥', image: 'products/hero_vol1.jpg' },
  { id: 4, name: 'Obsidian Crew Socks', category: 'Socks', gender: 'Unisex', price: 349, badge: 'limited', sizes: ['S/M','L/XL'], icon: '◆', image: 'products/hero_vol1.jpg' },
  { id: 5, name: 'Midnight Zip Hoodie', category: 'Hoodie', gender: 'Men', price: 2899, badge: '', sizes: ['S','M','L','XL'], icon: '🌑', image: 'products/hero_vol1.jpg' },
  { id: 6, name: 'Combat Performance Tee', category: 'T-Shirt', gender: 'Men', price: 999, badge: 'hot', sizes: ['S','M','L','XL','XXL'], icon: '💪', image: 'products/hero_vol1.jpg' },
  { id: 7, name: 'Elite Tapered Trousers', category: 'Trousers', gender: 'Men', price: 2199, badge: 'new', sizes: ['30','32','34','36'], icon: '🦅', image: 'products/hero_vol1.jpg' },
  { id: 8, name: 'Gold Strike Socks Pack', category: 'Socks', gender: 'Unisex', price: 699, badge: '', sizes: ['S/M','L/XL'], icon: '✦', image: 'products/hero_vol1.jpg' },
  { id: 9, name: 'Valkyrie Sports Bra', category: 'Top', gender: 'Women', price: 1299, badge: 'new', sizes: ['XS','S','M','L'], icon: '⚔️', image: 'products/hero_woman_vol1.jpg' },
  { id: 10, name: 'Aura High-Waist Leggings', category: 'Bottoms', gender: 'Women', price: 1999, badge: 'hot', sizes: ['XS','S','M','L'], icon: '🧘', image: 'products/hero_woman_vol1.jpg' },
  { id: 11, name: 'Luna Oversized Hoodie', category: 'Hoodie', gender: 'Women', price: 2699, badge: '', sizes: ['S','M','L'], icon: '🌙', image: 'products/hero_woman_vol1.jpg' },
  { id: 12, name: 'Zenith Performance Tank', category: 'Top', gender: 'Women', price: 899, badge: 'sale', sizes: ['S','M','L'], icon: '✨', image: 'products/hero_woman_vol1.jpg' },
];

let cart = [];
let currentFilter = 'All';
const selectedSizes = {};

function renderProducts(filter = 'All') {
  console.log('Rendering products with filter:', filter, 'RENDER_GENDER:', window.RENDER_GENDER);
  const grid = document.getElementById('productsGrid');
  if (!grid) {
    console.warn('productsGrid element not found');
    return;
  }
  
  let filtered = products;
  
  if (filter !== 'All') {
    if (filter === 'Men' || filter === 'Women') {
      filtered = products.filter(p => p.gender === filter || p.gender === 'Unisex');
    } else if (filter === 'Performance') {
      filtered = products.filter(p => ['Bottoms', 'Top', 'Socks', 'T-Shirt'].includes(p.category) && p.badge !== 'hot');
    } else if (filter === 'Street') {
      filtered = products.filter(p => ['Hoodie', 'Track Pants', 'Trousers'].includes(p.category) || p.badge === 'hot');
    } else {
      filtered = products.filter(p => p.category === filter);
    }
  }
  
  if (window.RENDER_GENDER) {
    filtered = filtered.filter(p => p.gender === window.RENDER_GENDER || p.gender === 'Unisex');
  }

  grid.innerHTML = '';
  filtered.forEach((p, i) => {
    const gradients = [
      'linear-gradient(135deg,#111 0%,#181410 100%)',
      'linear-gradient(135deg,#0e0e0e 0%,#141210 100%)',
      'linear-gradient(135deg,#101010 0%,#161311 100%)',
      'linear-gradient(135deg,#0c0c0c 0%,#131210 100%)',
    ];
    const badgeHTML = p.badge ? `<div class="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-charcoal bg-alabaster px-4 py-1.5 z-10">${p.badge}</div>` : '';
    const productMedia = p.image 
      ? `<img src="${p.image}" class="w-full h-full object-cover cinematic-img" alt="${p.name}">` 
      : `<div class="w-full h-full flex items-center justify-center text-4xl text-charcoal bg-alabaster/5 grayscale group-hover:grayscale-0 transition-all duration-[1500ms]">${p.icon}</div>`;

    grid.innerHTML += `
      <div class="group relative flex flex-col border-t border-alabaster/20 pt-8" style="animation:fadeIn 0.5s ${i*0.08}s both;">
        <div class="w-full aspect-[3/4] relative overflow-hidden mb-6 bg-charcoal">
          <div class="w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-[2000ms] ease-out" onclick="window.openQuickView(${p.id})">
            ${productMedia}
          </div>
          ${badgeHTML}
          <div class="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none"></div>
          <button class="absolute bottom-0 left-0 w-full bg-alabaster text-charcoal text-xs uppercase tracking-widest h-14 translate-y-full group-hover:translate-y-0 transition-transform duration-[600ms] cubic-bezier(0.25, 0.46, 0.45, 0.94) font-medium z-20" onclick="addToCart(${p.id})">Add to Bag</button>
        </div>
        <div class="flex justify-between items-start mb-2">
          <div class="text-[10px] uppercase tracking-widest text-taupe">${p.category}</div>
          <div class="font-serif text-sm tracking-wide text-gold">₹${p.price.toLocaleString()}</div>
        </div>
        <div class="text-sm sm:text-base text-alabaster font-light tracking-wide mb-6">${p.name}</div>
        <div class="flex flex-wrap gap-2 mt-auto">
          ${p.sizes.map(s => `<button class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-alabaster/20 text-[10px] font-light text-alabaster hover:border-gold hover:text-gold transition-colors duration-500" onclick="selectSize(${p.id}, '${s}', this)">${s}</button>`).join('')}
        </div>
      </div>`;
  });
}

function filterProducts(filter, btn) {
  currentFilter = filter;
  renderProducts(filter);
  if (btn) {
    // Modify tailwind utility classes for active states targeting the new layout
    const tabs = btn.parentElement.querySelectorAll('button');
    tabs.forEach(t => {
      t.classList.remove('text-alabaster');
      t.classList.add('text-taupe');
    });
    btn.classList.remove('text-taupe');
    btn.classList.add('text-alabaster');
  }
  const productsSection = document.getElementById('products');
  if(productsSection) lenis.scrollTo(productsSection, { offset: 0, duration: 2 });
}

function selectSize(id, sz, el) {
  selectedSizes[id] = sz;
  const dots = el.parentElement.querySelectorAll('button');
  dots.forEach(d => {
    d.classList.remove('border-gold', 'text-gold');
    d.classList.add('border-alabaster/20', 'text-alabaster');
  });
  el.classList.remove('border-alabaster/20', 'text-alabaster');
  el.classList.add('border-gold', 'text-gold');
}

// Initial load will be handled inside DOMContentLoaded listener below

// =================== SEARCH ===================
function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.toggle('show');
  if (overlay.classList.contains('show')) {
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('translate-x-0');
  menu.classList.toggle('translate-x-full');
  document.body.style.overflow = menu.classList.contains('translate-x-0') ? 'hidden' : '';
}

function togglePlayerCollapse() {
  const player = document.getElementById('globalPlayer');
  if (!player) return;
  const collapseIcon = document.getElementById('collapseIcon');
  const expandIcon = document.getElementById('expandIcon');
  
  const isCollapsed = player.classList.toggle('collapsed');
  localStorage.setItem('hawkPlayerCollapsed', isCollapsed);
  
  if (isCollapsed) {
    if(collapseIcon) collapseIcon.classList.add('hidden');
    if(expandIcon) expandIcon.classList.remove('hidden');
  } else {
    if(collapseIcon) collapseIcon.classList.remove('hidden');
    if(expandIcon) expandIcon.classList.add('hidden');
  }
}

function performSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resContainer = document.getElementById('searchResults');
  resContainer.innerHTML = '';

  if (query.length < 2) return;

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query)
  );

  filtered.forEach(p => {
    const item = document.createElement('div');
    item.className = 'flex items-center justify-between border-b border-charcoal/10 pb-4 group cursor-pointer hover:bg-charcoal hover:px-4 transition-all duration-500';
    item.innerHTML = `
      <div class="flex flex-col">
        <span class="text-sm font-light tracking-wide mb-1 group-hover:text-alabaster">${p.name}</span>
        <span class="text-[10px] uppercase tracking-widest text-warmgrey transition-colors duration-500">${p.gender} | ${p.category}</span>
      </div>
      <div class="font-serif text-lg tracking-wide text-gold">₹${p.price.toLocaleString()}</div>
    `;
    item.onclick = () => {
      toggleSearch();
      // Scroll to product if on catalog page or redirect
      if (document.getElementById('productsGrid')) {
        filterProducts('All');
        setTimeout(() => {
          const cards = document.querySelectorAll('.product-name');
          cards.forEach(c => {
            if (c.textContent === p.name) lenis.scrollTo(c, { offset: -200, duration: 2 });
          });
        }, 100);
      } else {
        window.location.href = 'index.html#products';
      }
    };
    resContainer.appendChild(item);
  });
}



// =================== CART ===================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const size = selectedSizes[id];

  if (!size) {
    showToast('Please select a size first');
    return;
  }

  const cartId = `${id}-${size}`;
  const existing = cart.find(c => c.cartId === cartId);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1, selectedSize: size, cartId: cartId });
  }
  localStorage.setItem('hawkCart', JSON.stringify(cart));
  updateCartUI();
  showToast(`${product.name} (${size}) Added to Bag`);
}

function removeFromCart(cartId) {
  cart = cart.filter(c => c.cartId !== cartId);
  localStorage.setItem('hawkCart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((acc, c) => acc + c.price * c.qty, 0);
  const count = cart.reduce((acc, c) => acc + c.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotalPrice').textContent = '₹' + total.toLocaleString();

  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    body.innerHTML = `<div class="h-full flex flex-col items-center justify-center text-warmgrey"><div class="text-4xl mb-4 grayscale">🛒</div><p class="text-xs uppercase tracking-widest">Your bag is empty.</p></div>`;
    footer.style.display = 'none';
  } else {
    body.innerHTML = cart.map(c => `
      <div class="flex items-start justify-between mb-6 pb-6 border-b border-charcoal/10 relative group">
        <div class="w-20 h-24 bg-charcoal flex flex-shrink-0 items-center justify-center text-3xl cinematic-img group-hover:grayscale-0">
          ${c.icon}
        </div>
        <div class="flex-1 ml-6">
          <div class="text-sm font-light text-charcoal tracking-wide mb-1 pr-6">${c.name}</div>
          <div class="text-[10px] uppercase tracking-widest text-warmgrey mb-3">Size: ${c.selectedSize} <span class="mx-1">·</span> Qty: ${c.qty}</div>
          <div class="font-serif text-charcoal text-base">₹${(c.price * c.qty).toLocaleString()}</div>
        </div>
        <button class="absolute top-0 right-0 p-1 text-warmgrey hover:text-gold transition-colors duration-300" onclick="removeFromCart('${c.cartId}')">✕</button>
      </div>`).join('');
    footer.style.display = 'block';
  }
}

function openCart() {
  document.getElementById('cartPanel').classList.add('show');
  document.getElementById('cartOverlay').classList.add('show');
}

function closeCart() {
  document.getElementById('cartPanel').classList.remove('show');
  document.getElementById('cartOverlay').classList.remove('show');
}

const cartBtn = document.getElementById('cartBtn');
if (cartBtn) cartBtn.addEventListener('click', openCart);

// INITIALIZE CART FROM STORAGE
if (localStorage.getItem('hawkCart')) {
  cart = JSON.parse(localStorage.getItem('hawkCart'));
  updateCartUI();
}

function checkout() {
  if (cart.length === 0) {
    showToast('Your Bag is empty');
    return;
  }
  localStorage.setItem('hawkCart', JSON.stringify(cart));
  showToast('Initializing Secure Checkout...');
  setTimeout(() => {
    window.location.href = 'checkout.html';
  }, 1000);
}



// =================== NEWSLETTER ===================
function subscribeEmail() {
  const email = document.getElementById('emailInput').value;
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email');
    return;
  }
  showToast('Welcome to the Hawk Squad! 🦅');
  document.getElementById('emailInput').value = '';
}

// =================== SCROLL REVEAL (CONSOLIDATED) ===================
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
      // Special handling for counter stats if needed
      if (e.target.hasAttribute('data-target')) {
         startCounter(e.target);
      }
    }
  });
}, { threshold: 0.1 });

// Helper to start counters
function startCounter(el) {
  const target = +el.getAttribute('data-target');
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}

function initReveals() {
  document.querySelectorAll('.reveal, .reveal-text, [data-target]').forEach(el => {
    scrollObserver.observe(el);
  });
}

// stats functionality handled by scrollObserver via data-target check

// =================== SMOOTH NAV (REPLACED BY LENIS AT TOP) ===================

// =================== TOAST ===================
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) {
    console.log("Toast:", msg);
    return;
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

window.showToast = showToast;
/* 12. PRO-UI REVEAL LOGIC (Intersection Observer) */
document.addEventListener('DOMContentLoaded', () => {
    initReveals();

    /* 13. Dynamic Navigation Behavior (Reveal on Scroll Up) */
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            navbar.classList.add('header-scrolled');
            if (window.scrollY > lastScrollY) {
                // Scrolling Down: Hide
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling Up: Show
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('header-scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
});

/* 14. SUBSCRIPTION LOGIC */
function subscribeEmail() {
    const email = document.getElementById('emailInput').value;
    if (email.includes('@')) {
        showToast('JOINED THE ARCHIVE. EXPECT ACCESS SOON.');
        document.getElementById('emailInput').value = '';
    } else {
        showToast('INVALID ARCHIVE PROTOCOL. CHECK EMAIL.');
    }
}

/* 17. EDITORIAL INFO MODAL SYSTEM */
const infoDict = {
    'About': {
        title: 'THE STUDIO / ARCHIVE',
        text: `
            <div class="space-y-6">
                <p class="drop-cap">NIGHT HAWK exists at the intersection of cinematic world-building and technical garment architecture. We do not merely produce apparel; we architect systems for the moving human form.</p>
                <div class="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-white/5">
                    <div>
                        <h4 class="text-[10px] uppercase tracking-widest text-gold mb-4">Philosophy</h4>
                        <p class="text-xs text-charcoal/60 leading-relaxed">Functionalism stripped of redundancy. Every stitch is a deliberate act of precision.</p>
                    </div>
                    <div>
                        <h4 class="text-[10px] uppercase tracking-widest text-gold mb-4">Location</h4>
                        <p class="text-xs text-charcoal/60 leading-relaxed">Headquartered in the shadows. Operating on a global editorial frequency.</p>
                    </div>
                </div>
            </div>
        `
    },
    'Manifesto': {
        title: 'THE MANIFESTO',
        text: `
            <div class="space-y-8">
                <p class="text-xl serif italic text-gold leading-tight">"Luxury is not the presence of decoration, but the absence of error."</p>
                <div class="space-y-4">
                    <p class="text-sm font-light text-charcoal leading-relaxed">We believe in the power of restraint. In a world of excessive noise, Night Hawk represents a silent, precise frequency. Our garments are designed to disappear until they are needed, then perform with absolute reliability.</p>
                    <ul class="space-y-3 pt-4">
                        <li class="flex items-center space-x-4 text-[10px] uppercase tracking-widest">
                            <span class="w-1 h-1 bg-gold rounded-full"></span>
                            <span>Restricted Silhouettes</span>
                        </li>
                        <li class="flex items-center space-x-4 text-[10px] uppercase tracking-widest">
                            <span class="w-1 h-1 bg-gold rounded-full"></span>
                            <span>Architectural Integrity</span>
                        </li>
                        <li class="flex items-center space-x-4 text-[10px] uppercase tracking-widest">
                            <span class="w-1 h-1 bg-gold rounded-full"></span>
                            <span>Technical Performance</span>
                        </li>
                    </ul>
                </div>
            </div>
        `
    },
    'Careers': {
        title: 'VISIONARY INQUIRIES',
        text: `
            <div class="space-y-6">
                <p class="text-sm text-charcoal/70 leading-relaxed">We are seeking outliers. Individuals who bridge the gap between traditional craftsmanship and future-leaning technical implementation.</p>
                <div class="mt-8 space-y-4">
                    <div class="p-4 border border-white/5 hover:border-gold/30 transition-colors">
                        <h4 class="text-[10px] uppercase tracking-widest text-gold mb-1">Garmet Architect</h4>
                        <p class="text-[10px] text-warmgrey">Pattern Design / Material Science</p>
                    </div>
                    <div class="p-4 border border-white/5 hover:border-gold/30 transition-colors">
                        <h4 class="text-[10px] uppercase tracking-widest text-gold mb-1">Editorial Specialist</h4>
                        <p class="text-[10px] text-warmgrey">Visual Protocol / Narrative Strategy</p>
                    </div>
                </div>
                <p class="text-[10px] uppercase tracking-widest text-warmgrey mt-8 pt-8 border-t border-white/5 text-center">
                    Direct Port: <a href="mailto:nighthawkpvt@gmail.com" class="text-gold underline">careers@nighthawk.archive</a>
                </p>
            </div>
        `
    },
    'Shipping': {
        title: 'LOGISTICS PROTOCOL',
        text: `
            <div class="space-y-6">
                <p class="text-sm text-charcoal/80">Every piece is dispatched under specialized archival protection to ensure geometric integrity during transit.</p>
                <div class="grid grid-cols-1 gap-4 mt-8">
                    <div class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-[10px] uppercase tracking-widest text-warmgrey">Domestic (IN)</span>
                        <span class="text-[10px] uppercase tracking-widest text-gold">2-4 Cycles</span>
                    </div>
                    <div class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-[10px] uppercase tracking-widest text-warmgrey">International</span>
                        <span class="text-[10px] uppercase tracking-widest text-gold">7-10 Cycles</span>
                    </div>
                </div>
                <p class="text-[9px] italic text-warmgrey mt-4">Complimentary logistics on all orders exceeding ₹15,000.</p>
            </div>
        `
    },
    'Returns': {
        title: 'ARCHIVAL INTEGRITY',
        text: `
            <div class="space-y-6">
                <p class="text-sm text-charcoal/80">We offer an 11-day editorial inspection window. Returned artifacts must maintain absolute archival status.</p>
                <ul class="text-[10px] uppercase tracking-[0.2em] space-y-3 text-warmgrey list-none p-0">
                    <li>→ Security seals must remain intact</li>
                    <li>→ Original specialized packaging required</li>
                    <li>→ Zero sign of atmospheric exposure</li>
                </ul>
                <div class="mt-8 pt-8 border-t border-white/5">
                    <button class="text-[10px] uppercase tracking-widest text-gold underline">Initiate Protocol</button>
                </div>
            </div>
        `
    },
    'Sizing': {
        title: 'FIT METHODOLOGY',
        text: `
            <div class="space-y-6">
                <p class="text-sm text-charcoal/80">Our silhouettes are architected for dynamic performance. We utilize a proprietary "Shadow Fit" system.</p>
                <div class="p-6 bg-white/[0.02] border border-white/5">
                    <h4 class="text-[10px] uppercase tracking-widest text-gold mb-4">Volume Strategy</h4>
                    <p class="text-[11px] leading-relaxed text-warmgrey">
                        <strong class="text-charcoal block mb-1">Standard:</strong> Precise alignment with anatomical measurements.<br>
                        <strong class="text-charcoal block mt-3 mb-1">Oversized:</strong> Intentional volume for architectural drape.<br>
                        <strong class="text-charcoal block mt-3 mb-1">Compression:</strong> Restricted flex for high-performance application.
                    </p>
                </div>
            </div>
        `
    }
};

function openInfoModal(topic) {
    const data = infoDict[topic];
    if (!data) return;
    
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalText').innerHTML = data.text;
    document.getElementById('infoModal').classList.add('show');
    document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeInfoModal() {
    document.getElementById('infoModal').classList.remove('show');
    document.body.style.overflow = ''; // Unlock scroll
}

window.openInfoModal = openInfoModal;

/* 19. PREMIUM PERSISTENT MUSIC PLAYER LOGIC */
function initMusicPlayer() {
  const audio = document.getElementById("mainAudio");
  if (!audio) return;

  // Select all instances (Hero and Global)
  const playBtns = document.querySelectorAll("#playBtn");
  const playIcons = document.querySelectorAll("#playIcon");
  const pauseIcons = document.querySelectorAll("#pauseIcon");
  const seekBars = document.querySelectorAll("#seekBar");
  const seekProgresses = document.querySelectorAll("#seekProgress");
  const currentTimeEls = document.querySelectorAll("#currentTime");
  const totalTimeEls = document.querySelectorAll("#totalTime");
  const albumArts = document.querySelectorAll("#albumArt");

  let rotationTweens = [];

  /* FORMAT TIME */
  function formatTime(t) {
    if (isNaN(t)) return "0:00";
    let m = Math.floor(t / 60);
    let s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  /* SYNC STATE */
  function syncState() {
    const isPlaying = localStorage.getItem('hawkMusicPlaying') === 'true';
    const savedTime = parseFloat(localStorage.getItem('hawkMusicTime')) || 0;

    let hasResumed = false;
    const enforceTime = () => {
        if (!hasResumed && audio.readyState >= 2) { // HAVE_CURRENT_DATA
            audio.currentTime = parseFloat(localStorage.getItem('hawkMusicTime')) || 0;
            hasResumed = true;
        }
    };

    if (audio.readyState >= 2) {
        enforceTime();
    } else {
        audio.addEventListener('canplay', enforceTime, { once: true });
        audio.addEventListener('loadedmetadata', enforceTime, { once: true });
    }

    if (isPlaying) {
      const playAttempt = audio.play();
      if (playAttempt !== undefined) {
          playAttempt.then(() => {
              updateUI(true);
          }).catch(e => {
              console.log('Autoplay restriction intercepted. Waiting for manual tap.');
              updateUI(false);
              
              const mobileResumeTask = () => {
                  if (localStorage.getItem('hawkMusicPlaying') === 'true') {
                      audio.play().then(() => updateUI(true)).catch(() => {});
                  }
                  document.removeEventListener('click', mobileResumeTask);
                  document.removeEventListener('touchstart', mobileResumeTask);
              };
              document.addEventListener('click', mobileResumeTask);
              document.addEventListener('touchstart', mobileResumeTask);
          });
      }
    } else {
      updateUI(false);
    }
  }

  function updateUI(playing) {
    playIcons.forEach(icon => playing ? icon.classList.add('hidden') : icon.classList.remove('hidden'));
    pauseIcons.forEach(icon => playing ? icon.classList.remove('hidden') : icon.classList.add('hidden'));
    
    albumArts.forEach((art, i) => {
      if (!rotationTweens[i]) {
        rotationTweens[i] = gsap.to(art, {
          rotation: "+=360",
          duration: 12,
          repeat: -1,
          ease: "none"
        });
      }
      playing ? rotationTweens[i].play() : rotationTweens[i].pause();
    });
  }

  /* PLAY / PAUSE */
  playBtns.forEach(btn => {
    btn.onclick = () => {
      if (audio.paused) {
        audio.play();
        localStorage.setItem('hawkMusicPlaying', 'true');
        updateUI(true);
      } else {
        audio.pause();
        localStorage.setItem('hawkMusicPlaying', 'false');
        updateUI(false);
      }
    };
  });

  /* UPDATE TIME & PERSIST */
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      seekProgresses.forEach(sp => sp.style.width = progress + "%");
      currentTimeEls.forEach(ct => ct.innerText = formatTime(audio.currentTime));
      totalTimeEls.forEach(tt => tt.innerText = formatTime(audio.duration));
      localStorage.setItem('hawkMusicTime', audio.currentTime);
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    totalTimeEls.forEach(tt => tt.innerText = formatTime(audio.duration));
  });

  /* SEEK CLICK */
  seekBars.forEach(bar => {
    bar.addEventListener("click", (e) => {
      const width = bar.clientWidth;
      const clickX = e.offsetX;
      audio.currentTime = (clickX / width) * audio.duration;
      localStorage.setItem('hawkMusicTime', audio.currentTime);
    });
  });

  syncState();

  // Initial render
  setTimeout(() => renderProducts(), 100);

  // Load collapsed state
  if (localStorage.getItem('hawkPlayerCollapsed') === 'true') {
    togglePlayerCollapse();
  }
}



document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
    // Fallback render if music player's timeout didn't catch it
    setTimeout(() => renderProducts(), 200);
});

// =================== ARCHITECTURAL QUICK VIEW ===================
function openQuickView(id) {
  console.log('Opening Quick View for ID:', id);
  const p = products.find(prod => prod.id === id);
  if (!p) return;

  const overlay = document.getElementById('quickViewOverlay');
  const container = document.getElementById('quickViewContainer');
  if (!overlay || !container) return;

  // Cinematic Entrance - Reset State
  gsap.set(container, { y: 40, scale: 0.95, opacity: 0 });
  
  // Update Content
  const fields = {
    'qvTitle': p.name,
    'qvCategory': p.category,
    'qvPrice': `₹${p.price.toLocaleString()}`,
    'qvDescription': p.description || "A structural masterpiece designed for a dominant, cinematic presence. Every raw seam has been calculated for premium aesthetics."
  };
  
  Object.keys(fields).forEach(key => {
    const el = document.getElementById(key);
    if(el) el.textContent = fields[key];
  });

  // Main Imagery Logic
  const stage = document.getElementById('qvMainStage');
  if(stage) {
    if(!p.image) {
      stage.innerHTML = `<div class="w-full h-full flex items-center justify-center text-9xl text-alabaster/10 bg-charcoal">${p.icon}</div>`;
    } else {
      stage.innerHTML = `<img src="${p.image}" id="qvMainImg" class="w-full h-full object-cover">`;
    }
  }

  // Thumbnails Grid (Projected Mapping)
  const tabs = document.getElementById('qvAssetTabs');
  if (tabs) {
    tabs.innerHTML = '';
    const assets = p.gallery || [p.image, p.image, p.image, p.image, p.image, p.image].map(img => img || '');
    
    assets.forEach((img, i) => {
      const tab = document.createElement('div');
      tab.className = `qv-asset-tab ${i === 0 ? 'active' : ''}`;
      if(img) {
        tab.innerHTML = `<img src="${img}" class="w-full h-full object-cover">`;
      } else {
        tab.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xs opacity-20 uppercase font-bold">${p.icon}</div>`;
      }
      
      tab.onclick = () => {
        document.querySelectorAll('.qv-asset-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const mainImg = document.getElementById('qvMainImg');
        if(mainImg && img) {
           gsap.to(mainImg, { opacity: 0.2, duration: 0.3, onComplete: () => {
             mainImg.src = img;
             gsap.to(mainImg, { opacity: 1, duration: 0.6 });
           }});
        } else if (!mainImg && stage) {
           // Fallback if no real image
           stage.innerHTML = `<div class="w-full h-full flex items-center justify-center text-9xl text-alabaster/10 bg-charcoal">${p.icon}</div>`;
        }
      };
      tabs.appendChild(tab);
    });
  }

  // Sizes Strategy
  const sizeBox = document.getElementById('qvSizes');
  if (sizeBox) {
    sizeBox.innerHTML = '';
    p.sizes.forEach(s => {
      const btn = document.createElement('button');
      btn.className = "w-12 h-12 border border-charcoal/20 text-[10px] flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-500 cursor-pointer";
      btn.textContent = s;
      btn.onclick = () => selectSize(p.id, s, btn);
      sizeBox.appendChild(btn);
    });
  }

  // Action Button
  const atc = document.getElementById('qvAddToCartBtn');
  if(atc) {
    atc.onclick = () => {
      addToCart(p.id);
      closeQuickView();
    };
  }

  // Recommendations Reveal
  renderQuickSuggestions(p.category, p.id);

  // Trigger Show
  overlay.classList.add('active');
  gsap.to(container, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "expo.out" });
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const container = document.getElementById('quickViewContainer');
  const overlay = document.getElementById('quickViewOverlay');
  if(!container || !overlay) return;

  gsap.to(container, { y: 30, opacity: 0, scale: 0.98, duration: 0.6, ease: "power2.in", onComplete: () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }});
}

function renderQuickSuggestions(category, currentId) {
  const grid = document.getElementById('qvSuggestions');
  if(!grid) return;
  grid.innerHTML = '';
  
  const related = products.filter(p => (p.category === category || p.category.includes(category)) && p.id !== currentId).slice(0, 4);
  const others = products.filter(p => !related.includes(p) && p.id !== currentId).slice(0, 4 - related.length);
  const pool = [...related, ...others];

  pool.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = "cursor-pointer group opacity-0";
    card.onclick = () => {
       gsap.to('#quickViewContainer', { opacity: 0, x: -30, duration: 0.4, onComplete: () => {
          openQuickView(p.id);
          gsap.fromTo('#quickViewContainer', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 });
       }});
    };

    const media = p.image 
      ? `<img src="${p.image}" class="w-full h-full object-cover">`
      : `<div class="w-full h-full bg-charcoal flex items-center justify-center text-3xl opacity-10 grayscale">${p.icon}</div>`;

    card.innerHTML = `
      <div class="aspect-[3/4] bg-charcoal overflow-hidden mb-6 relative">
        ${media}
        <div class="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
           <span class="text-[9px] uppercase tracking-widest text-alabaster border border-alabaster/40 px-6 py-2">Inspect</span>
        </div>
      </div>
      <div class="text-[10px] uppercase tracking-widest text-warmgrey mb-2">${p.category}</div>
      <div class="text-xs text-charcoal font-medium group-hover:text-gold transition-colors">${p.name}</div>
    `;
    grid.appendChild(card);
    gsap.to(card, { opacity: 1, delay: 0.5 + (i*0.1), duration: 0.8 });
  });
}

window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
