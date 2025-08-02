// Калькулятор коммуналки
function calculateUtility() {
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const water = parseFloat(document.getElementById('water').value) || 0;
    const heating = parseFloat(document.getElementById('heating').value) || 0;
    const tariffSelect = document.getElementById('tariff-select').value;
    
    let tariff;
    
    // Реальные тарифы по регионам (примеры)
    const tariffs = {
        'moscow': { electricity: 5.5, water: 35, heating: 1800 },
        'spb': { electricity: 5.2, water: 32, heating: 1700 },
        'ekb': { electricity: 4.8, water: 30, heating: 1600 }
    };
    
    if (tariffSelect === 'custom') {
        const customElectricity = parseFloat(document.getElementById('custom-electricity').value) || 0;
        const customWater = parseFloat(document.getElementById('custom-water').value) || 0;
        const customHeating = parseFloat(document.getElementById('custom-heating').value) || 0;
        
        if (customElectricity <= 0 || customWater <= 0 || customHeating <= 0) {
            document.getElementById('utility-result').innerHTML = '<p class="error">Введите корректные тарифы</p>';
            return;
        }
        
        tariff = {
            electricity: customElectricity,
            water: customWater,
            heating: customHeating
        };
    } else {
        tariff = tariffs[tariffSelect];
    }
    
    const electricityCost = electricity * tariff.electricity;
    const waterCost = water * tariff.water;
    const heatingCost = heating * tariff.heating;
    const total = electricityCost + waterCost + heatingCost;
    
    // Средние расходы по РФ
    const averageMoscow = 3500;
    const averageSpb = 3200;
    const averageEkb = 2800;
    
    let average = averageMoscow;
    let cityName = 'Москвы';
    
    switch(tariffSelect) {
        case 'moscow':
            average = averageMoscow;
            cityName = 'Москвы';
            break;
        case 'spb':
            average = averageSpb;
            cityName = 'Санкт-Петербурга';
            break;
        case 'ekb':
            average = averageEkb;
            cityName = 'Екатеринбурга';
            break;
        case 'custom':
            // Для пользовательских тарифов используем среднее значение
            average = (averageMoscow + averageSpb + averageEkb) / 3;
            cityName = 'выбранного региона';
            break;
    }
    
    const difference = total - average;
    
    let advice = '';
    if (difference > 0) {
        advice = `Вы платите на ${Math.abs(difference).toFixed(2)} руб больше среднего по ${cityName}. Попробуйте сэкономить на ЖКХ.`;
    } else {
        advice = `Ваши расходы ниже средних на ${Math.abs(difference).toFixed(2)} руб по ${cityName}. Отлично!`;
    }
    
    document.getElementById('utility-result').innerHTML = `
        <p><strong>Итого: ${total.toFixed(2)} руб</strong></p>
        <p>Электричество: ${electricityCost.toFixed(2)} руб</p>
        <p>Вода: ${waterCost.toFixed(2)} руб</p>
        <p>Отопление: ${heatingCost.toFixed(2)} руб</p>
        <p>${advice}</p>
        <div class="savings-tips">
            <h4>Советы по экономии:</h4>
            <ul>
                <li>Установите счетчики на все ресурсы</li>
                <li>Перейдите на двухтарифный учет электроэнергии</li>
                <li>Утеплите квартиру</li>
                <li>Регулярно передавайте показания</li>
            </ul>
        </div>
    `;
}

// Показ/скрытие полей для пользовательских тарифов
function toggleCustomTariffs() {
    const tariffSelect = document.getElementById('tariff-select').value;
    const customTariffs = document.getElementById('custom-tariffs');
    
    if (tariffSelect === 'custom') {
        customTariffs.style.display = 'block';
    } else {
        customTariffs.style.display = 'none';
    }
}

// Калькулятор бюджета семьи
function calculateBudget() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const food = parseFloat(document.getElementById('food').value) || 0;
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const entertainment = parseFloat(document.getElementById('entertainment').value) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value) || 0;
    const other = parseFloat(document.getElementById('other').value) || 0;
    
    const totalExpenses = rent + food + transport + entertainment + utilities + other;
    const savings = income - totalExpenses;
    
    if (income <= 0) {
        document.getElementById('budget-result').innerHTML = '<p class="error">Введите корректный доход</p>';
        return;
    }
    
    // Проценты от дохода
    const rentPercent = (rent / income) * 100;
    const foodPercent = (food / income) * 100;
    const entertainmentPercent = (entertainment / income) * 100;
    const savingsPercent = (savings / income) * 100;
    const utilitiesPercent = (utilities / income) * 100;
    const transportPercent = (transport / income) * 100;
    const otherPercent = (other / income) * 100;
    
    let advice = '';
    if (rentPercent > 30) {
        advice += `Аренда составляет ${rentPercent.toFixed(1)}% дохода (рекомендуется до 30%).<br>`;
    }
    if (foodPercent > 20) {
        advice += `Продукты составляют ${foodPercent.toFixed(1)}% дохода (рекомендуется до 20%).<br>`;
    }
    if (entertainmentPercent > 15) {
        advice += `Развлечения составляют ${entertainmentPercent.toFixed(1)}% дохода (рекомендуется до 15%).<br>`;
    }
    if (savingsPercent < 10) {
        advice += `Сбережения составляют ${savingsPercent.toFixed(1)}% дохода (рекомендуется минимум 10%).<br>`;
    }
    
    if (advice === '') {
        advice = 'Ваш бюджет хорошо сбалансирован!';
    }
    
    document.getElementById('budget-result').innerHTML = `
        <p><strong>Общие расходы: ${totalExpenses.toFixed(2)} руб</strong></p>
        <p><strong>Сбережения: ${savings.toFixed(2)} руб (${savingsPercent.toFixed(1)}%)</strong></p>
        <p>${advice}</p>
    `;
    
    // Создание диаграммы
    createBudgetChart([rent, food, transport, entertainment, utilities, other, savings]);
}
// Создание диаграммы для бюджета (исправленная версия)
function createBudgetChart(data) {
    const ctx = document.getElementById('budgetChart');
    if (ctx) {
        // Удаляем предыдущую диаграмму если есть
        if (window.budgetChart && typeof window.budgetChart.destroy === 'function') {
            window.budgetChart.destroy();
        }
        
        window.budgetChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Аренда', 'Продукты', 'Транспорт', 'Развлечения', 'ЖКХ', 'Другое', 'Сбережения'],
                datasets: [{
                     data,
                    backgroundColor: [
                        '#4A90E2',
                        '#50C878',
                        '#FF6B6B',
                        '#FFD93D',
                        '#9B59B6',
                        '#3498DB',
                        '#2ECC71'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            }
        });
    }
}

// Калькулятор ИМТ
// Исправленный калькулятор ИМТ
function calculateBMI() {
    // Получаем значения из полей ввода
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    
    // Проверка корректности ввода
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById('bmi-result').innerHTML = '<p class="error">Пожалуйста, введите корректные значения роста и веса</p>';
        return;
    }
    
    // Расчет ИМТ
    const heightInMeters = height / 100; // Переводим см в метры
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Определение категории
    let category = '';
    let advice = '';
    let color = '';
    
    if (bmi < 18.5) {
        category = 'Недовес';
        advice = 'Рекомендуется набрать вес. Проконсультируйтесь с врачом.';
        color = '#FF6B6B';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Нормальный вес';
        advice = 'Отличный результат! Продолжайте поддерживать здоровый образ жизни.';
        color = '#50C878';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Избыточный вес';
        advice = 'Рекомендуется снизить вес. Рассмотрите диету и физические упражнения.';
        color = '#FFA500';
    } else {
        category = 'Ожирение';
        advice = 'Серьезно рекомендуется снизить вес. Обратитесь к врачу.';
        color = '#FF0000';
    }
    
    // Отображение результата
    document.getElementById('bmi-result').innerHTML = `
        <p><strong>ИМТ: <span style="color: ${color}">${bmi.toFixed(1)}</span></strong></p>
        <p><strong>Категория: ${category}</strong></p>
        <p>${advice}</p>
        <div class="bmi-scale">
            <h4>Шкала ИМТ:</h4>
            <div class="scale-bar">
                <div class="scale-segment" style="background-color: #FF6B6B; width: 25%;">Недовес</div>
                <div class="scale-segment" style="background-color: #50C878; width: 30%;">Норма</div>
                <div class="scale-segment" style="background-color: #FFA500; width: 25%;">Избыток</div>
                <div class="scale-segment" style="background-color: #FF0000; width: 20%;">Ожирение</div>
            </div>
            <div class="scale-markers">
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
            </div>
        </div>
    `;
}

// Калькулятор скидки
function calculateDiscount() {
    const oldPrice = parseFloat(document.getElementById('oldPrice').value) || 0;
    const discountPercent = parseFloat(document.getElementById('discountPercent').value) || 0;
    
    if (oldPrice <= 0 || discountPercent < 0 || discountPercent > 100) {
        document.getElementById('discount-result').innerHTML = '<p class="error">Введите корректные данные</p>';
        return;
    }
    
    const discountAmount = (oldPrice * discountPercent) / 100;
    const newPrice = oldPrice - discountAmount;
    
    document.getElementById('discount-result').innerHTML = `
        <p><strong>Новая цена: ${newPrice.toFixed(2)} руб</strong></p>
        <p>Вы экономите: ${discountAmount.toFixed(2)} руб (${discountPercent}%)</p>
    `;
}

// Калькулятор вклада
function calculateDeposit() {
    const amount = parseFloat(document.getElementById('depositAmount').value) || 0;
    const term = parseFloat(document.getElementById('depositTerm').value) || 0;
    const rate = parseFloat(document.getElementById('interestRate').value) || 0;
    
    if (amount <= 0 || term <= 0 || rate <= 0) {
        document.getElementById('deposit-result').innerHTML = '<p class="error">Введите корректные данные</p>';
        return;
    }
    
    // Расчет с ежемесячной капитализацией
    const monthlyRate = (rate / 100) / 12;
    const result = amount * Math.pow(1 + monthlyRate, term);
    const profit = result - amount;
    
    document.getElementById('deposit-result').innerHTML = `
        <p><strong>Итоговая сумма: ${result.toFixed(2)} руб</strong></p>
        <p>Прибыль: ${profit.toFixed(2)} руб</p>
        <p>Срок: ${term} месяцев</p>
    `;
}

// Валидация полей ввода
document.addEventListener('DOMContentLoaded', function() {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
});

// Валидация полей ввода
document.addEventListener('DOMContentLoaded', function() {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
    
    // Инициализация переключения тарифов
    const tariffSelect = document.getElementById('tariff-select');
    if (tariffSelect) {
        tariffSelect.addEventListener('change', toggleCustomTariffs);
        toggleCustomTariffs(); // Инициализация при загрузке
    }

});


