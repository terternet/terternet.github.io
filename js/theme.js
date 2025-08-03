// Переключение темной темы и мобильного меню
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    // Элементы для мобильного меню
    const nav = document.querySelector('.nav');
    const headerContainer = document.querySelector('.header .container');
    let menuToggleBtn = null; // Будет создан, если нужно

    // --- Функциональность темы ---
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    }

    // Переключение темы
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');

            // Сохраняем выбор в localStorage
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
    function createMenuToggle() {
        if (!menuToggleBtn) {
            menuToggleBtn = document.createElement('button');
            menuToggleBtn.classList.add('menu-toggle');
            menuToggleBtn.innerHTML = '☰'; // Или используйте иконку-гамбургер
            menuToggleBtn.setAttribute('aria-label', 'Открыть меню');
            menuToggleBtn.style.cssText = `
                display: none;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                padding: 5px;
                margin-left: 10px;
                z-index: 101; /* Выше, чем навигация */
            `;
            // Вставляем кнопку перед .header-actions или в конец .header .container
            if (headerContainer && headerContainer.lastElementChild) {
                headerContainer.insertBefore(menuToggleBtn, headerContainer.lastElementChild);
            } else if (headerContainer) {
                headerContainer.appendChild(menuToggleBtn);
            }

            menuToggleBtn.addEventListener('click', () => {
                nav.classList.toggle('nav-open');
                // Меняем иконку или aria-label для доступности
                if (nav.classList.contains('nav-open')) {
                     menuToggleBtn.innerHTML = '✕'; // Или другая иконка "закрыть"
                     menuToggleBtn.setAttribute('aria-label', 'Закрыть меню');
                     // Закрываем меню при клике вне его области (опционально)
                     document.addEventListener('click', closeMenuOnOutsideClick);
                } else {
                     menuToggleBtn.innerHTML = '☰';
                     menuToggleBtn.setAttribute('aria-label', 'Открыть меню');
                     document.removeEventListener('click', closeMenuOnOutsideClick);
                }
            });
        }
    }

    function closeMenuOnOutsideClick(e) {
         if (nav.classList.contains('nav-open') && !nav.contains(e.target) && e.target !== menuToggleBtn) {
             nav.classList.remove('nav-open');
             if(menuToggleBtn) {
                 menuToggleBtn.innerHTML = '☰';
                 menuToggleBtn.setAttribute('aria-label', 'Открыть меню');
             }
             document.removeEventListener('click', closeMenuOnOutsideClick);
         }
    }

    function handleResize() {
        if (window.innerWidth <= 768) { // Точка останова из CSS
            createMenuToggle();
            if (menuToggleBtn) {
                menuToggleBtn.style.display = 'block';
            }
            if (nav) {
                nav.style.display = 'none'; // Изначально скрыто
                nav.classList.remove('nav-open'); // Убедимся, что класс убран
                 menuToggleBtn.innerHTML = '☰'; // Сброс иконки
                 menuToggleBtn.setAttribute('aria-label', 'Открыть меню');
                 document.removeEventListener('click', closeMenuOnOutsideClick); // Убираем слушатель
            }
        } else {
            // На больших экранах кнопка не нужна, меню всегда видно
            if (menuToggleBtn) {
                menuToggleBtn.style.display = 'none';
                 // Убедимся, что меню открыто и видимо
                 if (nav) {
                      nav.style.display = ''; // Сброс inline стиля display
                      nav.classList.remove('nav-open');
                       menuToggleBtn.innerHTML = '☰';
                       menuToggleBtn.setAttribute('aria-label', 'Открыть меню');
                       document.removeEventListener('click', closeMenuOnOutsideClick);
                 }
            }
            if (nav) {
                 nav.style.display = ''; // Сброс inline стиля display
            }
        }
    }

    // Инициализация при загрузке и изменении размера
    window.addEventListener('resize', handleResize);
    handleResize(); // Проверить при первой загрузке


    // --- Обновление ссылок в подвале ---
    function updateFooterLinks() {
        const footer = document.querySelector('footer.footer');
        if (footer) {
            // Предполагается, что ссылки изначально выглядят так:
            // <a href="#">ВКонтакте</a>
            // <a href="#">Telegram</a>
            // И они являются первыми двумя ссылками в .social-icons
            const socialLinks = footer.querySelectorAll('.social-icons a');
            const vkLink = socialLinks[0]; // Первая ссылка - ВК
            const tgLink = socialLinks[1]; // Вторая ссылка - ТГ

            // Или, если структура может быть другой, ищем по тексту:
            // const vkLink = Array.from(footer.querySelectorAll('.social-icons a')).find(link => link.textContent.includes('ВКонтакте'));
            // const tgLink = Array.from(footer.querySelectorAll('.social-icons a')).find(link => link.textContent.includes('Telegram'));

            if (vkLink) {
                // vkLink.href = "https://vk.com/your_actual_vk_link"; // Замените на вашу реальную ссылку ВК
                // Если ссылка ВК не нужна, удаляем элемент:
                vkLink.remove(); // Просто удалим ссылку на ВК
            }

            if (tgLink) {
                tgLink.href = "https://t.me/companyAGL"; // Устанавливаем реальную ссылку ТГ
            }
        }
    }

    updateFooterLinks(); // Вызываем при загрузке страницы

    // --- Плавное появление страницы ---
    // Добавляем плавные переходы при загрузке страницы
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
