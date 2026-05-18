document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Toggle active classes to open/close menu
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('open');
        });
    }
});
