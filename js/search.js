// Данные статей для поиска и фильтрации
const articles = [
    {
        id: 1,
        title: "Как сэкономить на ЖКХ — 7 проверенных способов",
        description: "Практические рекомендации по снижению расходов на коммунальные услуги в 2025 году.",
        tags: ["финансы", "жкх"],
        date: "15 марта 2025",
        url: "zhkh-2025.html"
    },
    {
        id: 2,
        title: "Шаблон резюме в Word — скачать бесплатно",
        description: "Профессиональный шаблон резюме, который поможет вам устроиться на работу.",
        tags: ["работа", "резюме"],
        date: "10 марта 2025",
        url: "resume-template.html"
    },
    {
        id: 3,
        title: "Как подать на алименты: пошаговая инструкция",
        description: "Подробное руководство по получению алиментов через суд или добровольное соглашение.",
        tags: ["дом", "семья"],
        date: "5 марта 2025",
        url: "alimony.html"
    },
    {
        id: 4,
        title: "Как написать заявление на отпуск — образец 2025",
        description: "Правильный образец заявления на отпуск согласно трудовому кодексу РФ.",
        tags: ["работа", "документы"],
        date: "1 марта 2025",
        url: "vacation-application.html"
    },
    {
        id: 5,
        title: "Как оформить детские пособия в 2025 году",
        description: "Полное руководство по оформлению всех видов детских пособий через портал Госуслуги.",
        tags: ["финансы", "дети"],
        date: "25 февраля 2025",
        url: "child-benefits.html"
    },
    {
        id: 6,
        title: "Как сбросить вес: эффективные методы 2025",
        description: "Научно обоснованные подходы к снижению веса без вреда для здоровья.",
        tags: ["здоровье", "питание"],
        date: "20 февраля 2025",
        url: "weight-loss.html"
    },
    {
        id: 7,
        title: "Капитальный ремонт квартиры: с чего начать",
        description: "Пошаговое руководство по планированию и выполнению капитального ремонта.",
        tags: ["дом", "ремонт"],
        date: "15 февраля 2025",
        url: "home-repair.html"
    },
    {
        id: 8,
        title: "С чего начать инвестировать в 2025 году",
        description: "Руководство для новичков по основам инвестиций и выбору подходящих инструментов.",
        tags: ["финансы", "инвестиции"],
        date: "10 февраля 2025",
        url: "investment.html"
    },
    {
        id: 9,
        title: "Как быстро найти работу в 2025 году",
        description: "Эффективные стратегии поиска работы в условиях современного рынка труда.",
        tags: ["работа", "карьера"],
        date: "5 февраля 2025",
        url: "job-search.html"
    },
    {
        id: 10,
        title: "Как вести домашний бюджет: практическое руководство",
        description: "Простые методы учета доходов и расходов для финансовой стабильности.",
        tags: ["финансы", "бюджет"],
        date: "1 февраля 2025",
        url: "home-budget.html"
    }
];

let currentPage = 1;
const articlesPerPage = 10;
let filteredArticles = [...articles];

// Функция поиска статей
function searchArticles() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm.trim() === '') {
        filteredArticles = [...articles];
    } else {
        filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.description.toLowerCase().includes(searchTerm) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    currentPage = 1;
    displayArticles();
    updatePagination();
}

// Функция фильтрации по тегам
function filterArticles(tag) {
    // Обновление активной кнопки
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (tag === 'all') {
        filteredArticles = [...articles];
    } else {
        filteredArticles = articles.filter(article => 
            article.tags.includes(tag)
        );
    }
    currentPage = 1;
    displayArticles();
    updatePagination();
}

// Отображение статей
function displayArticles() {
    const articlesList = document.getElementById('articlesList');
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const pageArticles = filteredArticles.slice(startIndex, endIndex);
    
    if (pageArticles.length === 0) {
        articlesList.innerHTML = '<p class="no-results">Статьи не найдены. Попробуйте другой запрос.</p>';
        return;
    }
    
    let articlesHTML = '';
    pageArticles.forEach(article => {
        articlesHTML += `
            <article class="article-card">
                <h3><a href="${article.url}">${article.title}</a></h3>
                <p>${article.description}</p>
                <div class="article-meta">
                    ${article.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    <span class="date">${article.date}</span>
                </div>
            </article>
        `;
    });
    
    articlesList.innerHTML = articlesHTML;
}

// Пагинация
function updatePagination() {
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages > 0 ? totalPages : 1;
    
    // Отключение кнопок при необходимости
    document.querySelector('.pagination button:first-child').disabled = currentPage === 1;
    document.querySelector('.pagination button:last-child').disabled = currentPage === totalPages || totalPages === 0;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayArticles();
        updatePagination();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayArticles();
        updatePagination();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    displayArticles();
    updatePagination();
    
    // Добавление обработчика для поиска по Enter
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchArticles();
        }
    });
});

// Функция для сброса фильтров
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-btn:first-child').classList.add('active');
    filteredArticles = [...articles];
    currentPage = 1;
    displayArticles();
    updatePagination();
}