document.addEventListener('DOMContentLoaded', () => {

  const burgerButton = document.querySelector('.burger-button');
  const mainNav = document.querySelector('.main-nav');

  // защита: если элементов нет — выходим
  if (!burgerButton || !mainNav) return;

  // ===== ЧТО ЗНАЧИТ «ОТКРЫТЬ» =====
  function openMenu() {
    mainNav.classList.add('active');                  // пункт 1 и 3
    burgerButton.classList.add('active');             // пункт 3 (крестик)
    burgerButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';          // пункт 2 (блок прокрутки)
  }

  // ===== ЧТО ЗНАЧИТ «ЗАКРЫТЬ» =====
  function closeMenu() {
    mainNav.classList.remove('active');
    burgerButton.classList.remove('active');
    burgerButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';                // пункт 2 (снять блок)
  }

  // ===== КЛИК ПО БУРГЕРУ ===== (пункт 1)
  burgerButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mainNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // ===== КЛИК ВНЕ МЕНЮ И ВНЕ БУРГЕРА ===== (пункт 1, поведение)
  document.addEventListener('click', (e) => {
    const clickInsideMenu = mainNav.contains(e.target);
    const clickOnBurger = burgerButton.contains(e.target);
    if (!clickInsideMenu && !clickOnBurger && mainNav.classList.contains('active')) {
      closeMenu();
    }
  });

  // ===== КЛАВИША ESCAPE ===== (пункт 4)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      closeMenu();
    }
  });

  // ===== КЛИК ПО ССЫЛКЕ В МЕНЮ ===== (пункт 4)
  mainNav.querySelectorAll('.menu-link').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // ===== РЕСАЙЗ ОКНА >768PX ===== (пункт 5)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
      closeMenu();
    }
  });

});
/*СЛАЙДЕР*/
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
          // ===== СВАЙП (для 380px и меньше) =====
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isSwiping = true;
    track.style.transition = 'none';   // выключаем плавность, пока тащим
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
    const threshold = track.offsetWidth * 0.2;   // 20% ширины — порог

    if (diff < -threshold) {
      goToNext();
    } else if (diff > threshold) {
      goToPrev();
    } else {
      updateSlider();   // возвращаем на место
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
  if (!grids.length) return;   // на главной такого нет — выходим

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
  const tabs  = document.querySelectorAll('.tab');           // ← кнопки, а не контейнер
  const grids = document.querySelectorAll('.products-grid'); // ← гриды категорий

  // Показать только грид выбранной категории
  function filterByCategory(category) {
    grids.forEach(grid => {
      grid.classList.toggle('is-active', grid.dataset.category === category);
    });
  }

  // Сделать активной ровно одну кнопку
  function setActiveTab(activeTab) {
    tabs.forEach(tab => {
      tab.classList.toggle('is-active', tab === activeTab);
    });
  }

  // --- ШАГ 1: инициализация при загрузке ---
  const firstTab = tabs[0]; // первая категория (Coffee)
  if (firstTab) {
    setActiveTab(firstTab);
    filterByCategory(firstTab.dataset.category);
  }

  // --- ШАГ 2: обработка кликов ---
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setActiveTab(tab);
      filterByCategory(tab.dataset.category);
    });
  });
});

/*КАТЕГОРИИ*/
document.addEventListener('DOMContentLoaded', () => {
  // ─────────────────────────────────────────────
  // 1. РЕНДЕР КАРТОЧЕК (ваш существующий код)
  // ─────────────────────────────────────────────
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

  // ─────────────────────────────────────────────
  // 2. ЛОГИКА ЛИМИТА 4 КАРТОЧЕК НА МОБИЛЕ
  // ─────────────────────────────────────────────
  const MOBILE_LIMIT = 4;
  const mq = window.matchMedia('(max-width: 768px)');

  // Какие категории пользователь раскрыл нажатием кнопки
  const expanded = new Set();

  const loadMoreBtn = document.getElementById('load-more-btn');

  // Текущая активная категория (берём из активного таба)
  function getActiveCategory() {
    return document.querySelector('.tab.is-active')?.dataset.category || null;
  }

  // Применить ограничение к активному гриду
  function applyLimit() {
    const category = getActiveCategory();
    if (!category) return;

    const grid = document.querySelector(`.products-grid[data-category="${category}"]`);
    if (!grid) return;

    const cards = grid.querySelectorAll('.product-card');

    // Десктоп или категория раскрыта — показываем всё
    if (!mq.matches || expanded.has(category)) {
      cards.forEach(card => card.style.display = '');
      loadMoreBtn.classList.add('is-hidden');
      return;
    }

    // Мобила и НЕ раскрыта — первые 4
    cards.forEach((card, i) => {
      card.style.display = i < MOBILE_LIMIT ? '' : 'none';
    });

    // Кнопка — только если есть что показать
    loadMoreBtn.classList.toggle('is-hidden', cards.length <= MOBILE_LIMIT);
  }

  // ─────────────────────────────────────────────
  // 3. ПЕРЕКЛЮЧЕНИЕ КАТЕГОРИЙ
  // ─────────────────────────────────────────────
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      document.querySelectorAll('.products-grid').forEach(grid => {
        grid.classList.toggle('is-active', grid.dataset.category === tab.dataset.category);
      });

      // При переходе на новую категорию — раскрытие сбрасываем
      const category = tab.dataset.category;
      expanded.delete(category);

      applyLimit();
    });
  });

  // ─────────────────────────────────────────────
  // 4. КНОПКА «ПОКАЗАТЬ ЕЩЁ»
  // ─────────────────────────────────────────────
  loadMoreBtn.addEventListener('click', () => {
    const category = getActiveCategory();
    if (!category) return;
    expanded.add(category);
    applyLimit();
  });

  // ─────────────────────────────────────────────
  // 5. РЕАКЦИЯ НА ПЕРЕХОД ЧЕРЕЗ 768px
  // ─────────────────────────────────────────────
  mq.addEventListener('change', (e) => {
    if (e.matches) {
      // перешли на мобилу — сбрасываем все раскрытия
      expanded.clear();
    }
    applyLimit();
  });

  // ─────────────────────────────────────────────
  // 6. СТАРТ
  // ─────────────────────────────────────────────
  applyLimit();
});