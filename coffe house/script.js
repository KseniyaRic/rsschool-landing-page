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
        updateSlider();
    }
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    updateSlider();
});