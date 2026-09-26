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