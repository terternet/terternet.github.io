document.addEventListener('DOMContentLoaded', function () {
    // --- Переключение темы (оставляем как есть) ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            }
        });
    }

    // --- Функциональность мобильного меню ---
    const nav = document.querySelector('.header .nav');
    const headerContainer = document.querySelector('.header .container');
    if (!nav || !headerContainer) {
        console.error("Элементы навигации или контейнер хедера не найдены. Мобильное меню не будет работать.");
        return; // Прекращаем, если ключевые элементы отсутствуют
    }

    let menuToggleBtn = null;
    let menuOverlay = null; // Фон затемнения меню

    // 1. Создаем кнопку меню
    function createMenuToggle() {
        if (menuToggleBtn) return; // Уже создана

        menuToggleBtn = document.createElement('button');
        menuToggleBtn.classList.add('menu-toggle');
        menuToggleBtn.setAttribute('aria-label', 'Открыть меню навигации');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
        menuToggleBtn.innerHTML = `
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        `;
        // Вставляем кнопку перед .header-actions
        const headerActions = headerContainer.querySelector('.header-actions');
        if (headerActions) {
            headerContainer.insertBefore(menuToggleBtn, headerActions);
        } else {
            headerContainer.appendChild(menuToggleBtn);
        }

        // 2. Создаем затемнение фона при открытом меню
        menuOverlay = document.createElement('div');
        menuOverlay.classList.add('menu-overlay');
        document.body.appendChild(menuOverlay);

        // 3. Назначаем обработчики событий
        menuToggleBtn.addEventListener('click', toggleMobileMenu);
        menuOverlay.addEventListener('click', closeMobileMenu); // Закрытие по клику на оверлей

        // 4. Закрытие меню при изменении размера экрана на большой
        window.addEventListener('resize', handleResize);
    }

    // Удаляем кнопку меню и оверлей, если они больше не нужны
    function destroyMenuToggle() {
        if (menuToggleBtn) {
            menuToggleBtn.remove();
            menuToggleBtn = null;
        }
        if (menuOverlay) {
            menuOverlay.remove();
            menuOverlay = null;
        }
        // Убедимся, что меню скрыто и атрибуты сброшены
        nav.classList.remove('nav-mobile-open');
        nav.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll'); // Разрешаем скролл
    }

    // Переключение состояния меню
    function toggleMobileMenu() {
        const isOpen = nav.classList.contains('nav-mobile-open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Открытие меню
    function openMobileMenu() {
        nav.classList.add('nav-mobile-open');
        nav.setAttribute('aria-hidden', 'false');
        menuToggleBtn.setAttribute('aria-expanded', 'true');
        menuToggleBtn.classList.add('is-active'); // Для анимации гамбургера
        menuOverlay.classList.add('is-active');
        document.body.classList.add('no-scroll'); // Запрещаем скролл основного контента
        // Закрытие меню при клике вне его области (альтернатива оверлею)
        document.addEventListener('click', closeMenuOnOutsideClick);
    }

    // Закрытие меню
    function closeMobileMenu() {
        nav.classList.remove('nav-mobile-open');
        nav.setAttribute('aria-hidden', 'true');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
        menuToggleBtn.classList.remove('is-active');
        menuOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }

    // Закрытие меню при клике вне области навигации и кнопки
    function closeMenuOnOutsideClick(event) {
        if (!nav.contains(event.target) && event.target !== menuToggleBtn && !menuToggleBtn.contains(event.target)) {
            closeMobileMenu();
        }
    }

    // Логика отображения кнопки меню в зависимости от ширины экрана
    function handleResize() {
        if (window.innerWidth <= 768) {
            createMenuToggle(); // Создать, если еще не создана
            menuToggleBtn.style.display = 'block';
            // Изначально меню скрыто на мобильных
            nav.classList.remove('nav-mobile-open');
            nav.setAttribute('aria-hidden', 'true');
            menuToggleBtn.setAttribute('aria-expanded', 'false');
            menuToggleBtn.classList.remove('is-active');
            menuOverlay.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
            document.removeEventListener('click', closeMenuOnOutsideClick);
        } else {
            // На больших экранах уничтожаем элементы и показываем обычное меню
            destroyMenuToggle();
            nav.style.display = ''; // Сброс inline стиля display
            nav.setAttribute('aria-hidden', 'false'); // Меню видно для всех
        }
    }

    // Инициализация при загрузке страницы
    handleResize();
});

// --- Обновление ссылок в подвале (оставляем как есть) ---
function updateFooterLinks() {
    const footer = document.querySelector('footer.footer');
    if (footer) {
        const socialLinks = footer.querySelectorAll('.social-icons a');
        const vkLink = socialLinks[0];
        const tgLink = socialLinks[1];

        if (vkLink) {
            vkLink.remove();
        }

        if (tgLink) {
            tgLink.href = "https://t.me/companyAGL";
        }
    }
}
updateFooterLinks();

// --- Плавное появление страницы (оставляем как есть) ---
document.body.style.opacity = '0';
setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
}, 100);
