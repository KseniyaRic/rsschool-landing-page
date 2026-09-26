const burgerButton = document.querySelector('.burger-button');
const mainNav = document.querySelector('.main-nav');

// Открытие/закрытие по клику на бургер
burgerButton.addEventListener('click', function(e) {
    e.stopPropagation();   // Останавливаем всплытие, чтобы не сработал document click
    mainNav.classList.toggle('active');
});

// Закрытие при клике вне меню и вне бургера
document.addEventListener('click', function(e) {
    const clickInsideMenu = mainNav.contains(e.target);
    const clickOnBurger = burgerButton.contains(e.target);

    if (!clickInsideMenu && !clickOnBurger) {
        mainNav.classList.remove('active');
    }
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