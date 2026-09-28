document.addEventListener('DOMContentLoaded', () => {

  const burgerButton = document.querySelector('.burger-button');
  const mainNav = document.querySelector('.main-nav');

  if (!burgerButton || !mainNav) return;

  function openMenu() {
    mainNav.classList.add('active');
    burgerButton.classList.add('active');
    burgerButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mainNav.classList.remove('active');
    burgerButton.classList.remove('active');
    burgerButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  burgerButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mainNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('click', (e) => {
    const clickInsideMenu = mainNav.contains(e.target);
    const clickOnBurger = burgerButton.contains(e.target);
    if (!clickInsideMenu && !clickOnBurger && mainNav.classList.contains('active')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      closeMenu();
    }
  });

  mainNav.querySelectorAll('.menu-link').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
      closeMenu();
    }
  });

});
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slide-track');
    if (!track) return;
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.button-left');
    const nextBtn = document.querySelector('.button-right');
    const indicators = document.querySelectorAll('.controls-item');


    let currentIndex = 0;
    const totalSlides = slides.length;
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('is-active', index === currentIndex);
        });
    }
    function goToNext() {
        if (currentIndex === totalSlides - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlider();
    }
    function goToPrev() {
        if (currentIndex === 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex--;
        }
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isSwiping = true;
    track.style.transition = 'none';
  });

  track.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const offset = -currentIndex * track.offsetWidth;
    track.style.transform = `translateX(${offset + diff}px)`;
  });

  track.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;
    track.style.transition = 'transform 0.3s ease';

    const diff = currentX - startX;
    const threshold = track.offsetWidth * 0.2;

    if (diff < -threshold) {
      goToNext();
    } else if (diff > threshold) {
      goToPrev();
    } else {
      updateSlider();
    }
  });
        updateSlider();
    }
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    updateSlider();
});

document.addEventListener('DOMContentLoaded', () => {

  const grids = document.querySelectorAll('.products-grid');
  if (!grids.length) return;

  grids.forEach((grid) => {
    const category = grid.dataset.category;
    const items = products.filter((p) => p.category === category);

    grid.innerHTML = items.map((item) => `
      <article class="product-card" data-id="${item.id}">
        <div class="product-picture">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="product-info">
          <h2>${item.name}</h2>
          <p class="product-description">${item.description}</p>
          <span class="price">$${Number(item.price).toFixed(2)}</span>
        </div>
      </article>
    `).join('');
  });

});


document.addEventListener('DOMContentLoaded', () => {
  const tabs  = document.querySelectorAll('.tab');
  const grids = document.querySelectorAll('.products-grid');

  function filterByCategory(category) {
    grids.forEach(grid => {
      grid.classList.toggle('is-active', grid.dataset.category === category);
    });
  }

  function setActiveTab(activeTab) {
    tabs.forEach(tab => {
      tab.classList.toggle('is-active', tab === activeTab);
    });
  }

  const firstTab = tabs[0];
  if (firstTab) {
    setActiveTab(firstTab);
    filterByCategory(firstTab.dataset.category);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setActiveTab(tab);
      filterByCategory(tab.dataset.category);
    });
  });
});

/*КАТЕГОРИИ*/
document.addEventListener('DOMContentLoaded', () => {
  const grids = document.querySelectorAll('.products-grid');
  if (!grids.length) return;

  grids.forEach((grid) => {
      const category = grid.dataset.category;
    const items = products.filter((p) => p.category === category);

    grid.innerHTML = items.map((item) => `
      <article class="product-card" data-id="${item.id}">
        <div class="product-picture">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="product-info">
          <div class="product-text">
            <h2>${item.name}</h2>
            <p class="product-description">${item.description}</p>
          </div>
          <span class="price">$${Number(item.price).toFixed(2)}</span>
        </div>
      </article>
    `).join('');
  });

  const MOBILE_LIMIT = 4;
  const mq = window.matchMedia('(max-width: 768px)');

  const expanded = new Set();

  const loadMoreBtn = document.getElementById('load-more-btn');

  function getActiveCategory() {
    return document.querySelector('.tab.is-active')?.dataset.category || null;
  }

  function applyLimit() {
    const category = getActiveCategory();
    if (!category) return;

    const grid = document.querySelector(`.products-grid[data-category="${category}"]`);
    if (!grid) return;

    const cards = grid.querySelectorAll('.product-card');

    if (!mq.matches || expanded.has(category)) {
      cards.forEach(card => card.style.display = '');
      loadMoreBtn.classList.add('is-hidden');
      return;
    }

    cards.forEach((card, i) => {
      card.style.display = i < MOBILE_LIMIT ? '' : 'none';
    });

    loadMoreBtn.classList.toggle('is-hidden', cards.length <= MOBILE_LIMIT);
  }

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      document.querySelectorAll('.products-grid').forEach(grid => {
        grid.classList.toggle('is-active', grid.dataset.category === tab.dataset.category);
      });

      const category = tab.dataset.category;
      expanded.delete(category);

      applyLimit();
    });
  });

  loadMoreBtn.addEventListener('click', () => {
    const category = getActiveCategory();
    if (!category) return;
    expanded.add(category);
    applyLimit();
  });

  mq.addEventListener('change', (e) => {
    if (e.matches) {
      expanded.clear();
    }
    applyLimit();
  });

  applyLimit();
});

/* МОДАЛЬНОЕ ОКНО */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  const modalWindow = document.getElementById('modal-window');

  function openModal(item) {
    modalWindow.innerHTML = `
       <div class="product-picture">
          <img src="${item.image}" alt="${item.name}">
        </div>
      <div class="modal-info">
        <h2>${item.name}</h2>
        <p class="modal-description">${item.description}</p>

        <div class="modal-group">
          <p class="modal-label">Size</p>
          <div class="modal-buttons">
            ${Object.entries(item.sizes).map(([key, s], i) => `
              <button class="size-btn ${i === 0 ? 'is-active' : ''}"
                      type="button"
                      data-add="${s['add-price']}">
                ${key.toUpperCase()} ${s.size}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="modal-group">
          <p class="modal-label">Additives</p>
          <div class="modal-buttons">
            ${item.additives.map((a, i) => `
              <button class="additive-btn"
                      type="button"
                      data-add="${a['add-price']}">
                ${i + 1} ${a.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="modal-total">
          <span>Total:</span>
          <span class="modal-price">$${Number(item.price).toFixed(2)}</span>
        </div>
        <div class="modal-attention">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_147811_7611)">
<path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_147811_7611">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
<p class="attention-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
</div>

        <button class="modal-close-btn" type="button" data-close>Close</button>
      </div>
    `;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.products-grid').forEach(grid => {
    grid.addEventListener('click', e => {
      const card = e.target.closest('.product-card');
      if (!card) return;

      const item = products.find(p => String(p.id) === card.dataset.id);
      if (item) openModal(item);
    });
  });

  modal.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) {
      closeModal();
      return;
    }

    const sizeBtn = e.target.closest('.size-btn');
    if (sizeBtn) {
      modal.querySelectorAll('.size-btn').forEach(b => b.classList.remove('is-active'));
      sizeBtn.classList.add('is-active');
      return;
    }

    const addBtn = e.target.closest('.additive-btn');
    if (addBtn) addBtn.classList.toggle('is-active');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
});