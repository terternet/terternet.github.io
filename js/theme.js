// Переключение темной темы и мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    // Переключение темной темы
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
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
    
    // Мобильное меню
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
    
    // Добавляем плавные переходы при загрузке страницы
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
// Функция для установки темы
function setTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    if (theme === 'dark') {
        body.classList.add('dark-theme');
        // Установить иконку "солнце" для ночной темы
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    } else {
        body.classList.remove('dark-theme');
        // Установить иконку "луна" для дневной темы
        if (themeToggle) {
            themeToggle.textContent = '🌙';
        }
    }

    // Сохранить выбор темы в localStorage
    localStorage.setItem('theme', theme);
}

// Функция для определения темы по времени
function getThemeByTime() {
    const now = new Date();
    const hours = now.getHours();
    // Ночная тема с 19:00 (19) до 7:00 (6)
    if (hours >= 19 || hours < 7) {
        return 'dark';
    } else {
        return 'light';
    }
}

// Функция для обновления ссылок в подвале
function updateFooterLinks() {
    const footer = document.querySelector('footer.footer');
    if (footer) {
        const vkLink = footer.querySelector('a[href="ССЫЛКА_НА_ВК"]');
        const tgLink = footer.querySelector('a[href="ССЫЛКА_НА_TELEGRAM"]');

        if (vkLink) {
            // vkLink.href = "https://vk.com/your_actual_vk_link"; // Замените на вашу реальную ссылку ВК
            // Если ссылка ВК не нужна, можно удалить элемент:
            // vkLink.parentElement.removeChild(vkLink);
             vkLink.remove(); // Просто удалим ссылку на ВК, как в примере
        }

        if (tgLink) {
            tgLink.href = "https://t.me/companyAGL";
        }
    }
}

// Функция для инициализации темы при загрузке страницы
function initializeTheme() {
    // Проверить, есть ли сохранённая тема в localStorage
    const savedTheme = localStorage.getItem('theme');

    let themeToApply;

    if (savedTheme) {
        // Если тема сохранена, использовать её
        themeToApply = savedTheme;
    } else {
        // Если нет, определить по времени
        themeToApply = getThemeByTime();
    }

    setTheme(themeToApply);
}

// Добавим фишку: пасхалка на клик по логотипу
function addEasterEgg() {
    const logo = document.querySelector('.logo');
    if (logo) {
        let clickCount = 0;
        const maxClicks = 5; // Количество кликов для активации
        const clickTimeout = 2000; // Время в мс, за которое должны быть клики
        let lastClickTime = 0;

        logo.addEventListener('click', function() {
            const currentTime = new Date().getTime();
            
            // Сбросить счётчик, если клики слишком медленные
            if (currentTime - lastClickTime > clickTimeout) {
                clickCount = 0;
            }
            
            clickCount++;
            lastClickTime = currentTime;

            if (clickCount >= maxClicks) {
                // Активировать пасхалку
                activateEasterEgg();
                clickCount = 0; // Сбросить счётчик после активации
            }
        });
    }
}

// Функция пасхалки
function activateEasterEgg() {
    const body = document.body;
    const originalTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    
    // Временно переключить тему несколько раз
    let count = 0;
    const maxFlips = 6; // 3 полных цикла
    const flipInterval = 300; // мс
    
    const flipTheme = () => {
        if (count < maxFlips) {
            if (body.classList.contains('dark-theme')) {
                setTheme('light');
            } else {
                setTheme('dark');
            }
            count++;
            setTimeout(flipTheme, flipInterval);
        } else {
            // Вернуть исходную тему
            setTheme(originalTheme);
            // Показать сообщение
             alert("🎉 Поздравляем! Вы нашли пасхалку! 🎉");
        }
    };
    
    flipTheme();
}

// Когда DOM загружен
document.addEventListener('DOMContentLoaded', function() {
    // 1. Обновить ссылки в подвале
    updateFooterLinks();

    // 2. Инициализировать тему
    initializeTheme();

    // 3. Добавить обработчик клика для кнопки переключения темы (если она есть)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // 4. Добавить пасхалку
    addEasterEgg();

    // 5. (Опционально) Периодически проверять время и менять тему
    // (например, если пользователь оставил вкладку открытой на весь день)
    setInterval(() => {
         // Проверяем тему только если она не была сохранена пользователем вручную
         const savedTheme = localStorage.getItem('theme');
         if (!savedTheme) { // Если нет сохранённой темы, переключаем по времени
             const timeBasedTheme = getThemeByTime();
             const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
             if (timeBasedTheme !== currentTheme) {
                 setTheme(timeBasedTheme);
             }
         }
    }, 60000); // Проверять каждую минуту
});
