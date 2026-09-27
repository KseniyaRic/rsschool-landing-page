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
<span class="price">${Number(item.price).toFixed(2).replace('.', ',')}$</span>
        </div>
      </article>
    `).join('');
  });

});