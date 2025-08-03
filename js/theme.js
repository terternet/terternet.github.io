// Переключение темной темы
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
    
    // Переключение темы
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
    
    // Добавляем плавные переходы при загрузке страницы
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
function updateFooterLinks() {
    const footer = document.querySelector('footer.footer');
    if (footer) {
        const vkLink = footer.querySelector('a[href="ССЫЛКА_НА_ВК"]');
        const tgLink = footer.querySelector('a[href="ССЫЛКА_НА_TELEGRAM"]');

        if (vkLink) {
            // vkLink.href = "https://vk.com/your_actual_vk_link  "; // Замените на вашу реальную ссылку ВК
            // Если ссылка ВК не нужна, можно удалить элемент:
            // vkLink.parentElement.removeChild(vkLink);
             vkLink.remove(); // Просто удалим ссылку на ВК, как в примере
        }

        if (tgLink) {
            tgLink.href = "https://t.me/companyAGL  ";
        }
    }
}


