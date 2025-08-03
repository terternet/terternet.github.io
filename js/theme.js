// Управление темной темой и мобильным меню
document.addEventListener('DOMContentLoaded', function() {
    // === УПРАВЛЕНИЕ ТЕМНОЙ ТЕМОЙ ===
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Функция для установки темы
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (themeToggle) {
                themeToggle.textContent = '☀️'; // Солнце для темной темы
            }
        } else {
            body.classList.remove('dark-theme');
            if (themeToggle) {
                themeToggle.textContent = '🌙'; // Луна для светлой темы
            }
        }
        // Сохраняем выбор пользователя
        localStorage.setItem('theme', theme);
    }

    // Функция для определения темы по времени (ночью - темная, днем - светлая)
    function getAutoTheme() {
        const hours = new Date().getHours();
        // Темная тема с 19:00 до 07:00
        return (hours >= 19 || hours < 7) ? 'dark' : 'light';
    }

    // Инициализация темы при загрузке страницы
    function initializeTheme() {
        // Проверяем, сохранял ли пользователь выбор темы
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Если пользователь уже выбирал тему, используем его выбор
            setTheme(savedTheme);
        } else {
            // Если нет, определяем тему по времени
            const autoTheme = getAutoTheme();
            setTheme(autoTheme);
        }
    }

    // Переключение темы по клику на кнопку
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Определяем текущую тему
            const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            // Переключаем на противоположную
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            // Устанавливаем новую тему
            setTheme(newTheme);
            // Теперь пользовательский выбор будет сохранен и приоритетнее автовыбора
        });
    }

    // Инициализируем тему
    initializeTheme();

    // === МОБИЛЬНОЕ МЕНЮ ===
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }

    // === ОБНОВЛЕНИЕ ССЫЛОК В ПОДВАЛЕ ===
    function updateFooterLinks() {
        const footer = document.querySelector('footer.footer');
        if (footer) {
            const vkLink = footer.querySelector('a[href="ССЫЛКА_НА_ВК"]');
            const tgLink = footer.querySelector('a[href="ССЫЛКА_НА_TELEGRAM"]');

            // Удаляем ссылку на ВК, как указано в комментарии
            if (vkLink) {
                vkLink.remove();
            }

            // Устанавливаем правильную ссылку на Telegram
            if (tgLink) {
                tgLink.href = "https://t.me/companyAGL";
                // Убираем лишние пробелы из ссылки
                tgLink.href = tgLink.href.trim();
            }
        }
    }

    // Вызываем обновление ссылок
    updateFooterLinks();

    // === ПАСХАЛКА (опционально) ===
    const logo = document.querySelector('.logo');
    if (logo) {
        let clickCount = 0;
        const maxClicks = 5;
        let lastClickTime = 0;
        const clickTimeout = 2000;

        logo.addEventListener('click', function() {
            const currentTime = new Date().getTime();
            
            if (currentTime - lastClickTime > clickTimeout) {
                clickCount = 0;
            }
            
            clickCount++;
            lastClickTime = currentTime;

            if (clickCount >= maxClicks) {
                // Активируем пасхалку
                activateEasterEgg();
                clickCount = 0;
            }
        });
    }

    // Функция пасхалки
    function activateEasterEgg() {
        const originalTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        
        let count = 0;
        const maxFlips = 6;
        const flipInterval = 300;
        
        const flipTheme = () => {
            if (count < maxFlips) {
                if (body.classList.contains('dark-theme')) {
                    body.classList.remove('dark-theme');
                    if (themeToggle) themeToggle.textContent = '🌙';
                } else {
                    body.classList.add('dark-theme');
                    if (themeToggle) themeToggle.textContent = '☀️';
                }
                count++;
                setTimeout(flipTheme, flipInterval);
            } else {
                // Возвращаем исходную тему
                setTheme(originalTheme);
                alert("🎉 Поздравляем! Вы нашли пасхалку! 🎉");
            }
        };
        
        flipTheme();
    }
});
