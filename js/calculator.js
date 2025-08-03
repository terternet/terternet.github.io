// --- Общие функции и валидация ---
document.addEventListener('DOMContentLoaded', function () {
    // Валидация числовых полей
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        // Предотвращаем ввод отрицательных значений
        input.addEventListener('input', function () {
            if (this.value < 0) {
                this.value = Math.abs(this.value); // Или просто this.value = 0;
            }
            // Убедимся, что значение является числом или пустой строкой
            if (this.value !== '' && isNaN(this.value)) {
                 this.value = ''; 
            }
        });
    });

    // Инициализация переключения тарифов (если элемент существует на странице)
    const tariffSelect = document.getElementById('tariff-select');
    if (tariffSelect) {
        tariffSelect.addEventListener('change', toggleCustomTariffs);
        toggleCustomTariffs(); // Инициализация при загрузке
    }
});

// --- Калькулятор коммуналки ---
function calculateUtility() {
    // Проверка существования элементов перед использованием
    const electricityInput = document.getElementById('electricity');
    const waterInput = document.getElementById('water');
    const heatingInput = document.getElementById('heating');
    const tariffSelectElement = document.getElementById('tariff-select');
    const resultElement = document.getElementById('utility-result');

    if (!electricityInput || !waterInput || !heatingInput || !tariffSelectElement || !resultElement) {
        console.error("Ошибка: Не найдены необходимые элементы для калькулятора коммуналки.");
        return; // Выход, если элементы не найдены
    }

    const electricity = parseFloat(electricityInput.value) || 0;
    const water = parseFloat(waterInput.value) || 0;
    const heating = parseFloat(heatingInput.value) || 0;
    const tariffSelect = tariffSelectElement.value;

    let tariff;
    const tariffs = {
        'moscow': { electricity: 5.5, water: 35, heating: 1800 },
        'spb': { electricity: 5.2, water: 32, heating: 1700 },
        'ekb': { electricity: 4.8, water: 30, heating: 1600 }
    };

    if (tariffSelect === 'custom') {
        const customElectricityInput = document.getElementById('custom-electricity');
        const customWaterInput = document.getElementById('custom-water');
        const customHeatingInput = document.getElementById('custom-heating');

        if (!customElectricityInput || !customWaterInput || !customHeatingInput) {
             resultElement.innerHTML = '<p class="error">Ошибка: Не найдены поля для пользовательских тарифов.</p>';
            return;
        }

        const customElectricity = parseFloat(customElectricityInput.value) || 0;
        const customWater = parseFloat(customWaterInput.value) || 0;
        const customHeating = parseFloat(customHeatingInput.value) || 0;
        
        if (customElectricity <= 0 || customWater <= 0 || customHeating <= 0) {
            resultElement.innerHTML = '<p class="error">Введите корректные тарифы</p>';
            return;
        }
        tariff = {
            electricity: customElectricity,
            water: customWater,
            heating: customHeating
        };
    } else {
        tariff = tariffs[tariffSelect];
        if (!tariff) {
             resultElement.innerHTML = '<p class="error">Ошибка: Выбран неизвестный регион.</p>';
            return;
        }
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
            average = (averageMoscow + averageSpb + averageEkb) / 3;
            cityName = 'выбранного региона';
            break;
        default:
            // Если регион неизвестен, используем среднее
            average = (averageMoscow + averageSpb + averageEkb) / 3;
            cityName = 'выбранного региона';
    }

    const difference = total - average;
    let advice = '';
    if (difference > 0) {
        advice = `Вы платите на ${Math.abs(difference).toFixed(2)} руб больше среднего по ${cityName}. Попробуйте сэкономить на ЖКХ.`;
    } else {
        advice = `Ваши расходы ниже средних на ${Math.abs(difference).toFixed(2)} руб по ${cityName}. Отлично!`;
    }

    resultElement.innerHTML = `
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

function toggleCustomTariffs() {
    const tariffSelectElement = document.getElementById('tariff-select');
    const customTariffsElement = document.getElementById('custom-tariffs');

    // Проверка существования элементов
    if (!tariffSelectElement || !customTariffsElement) {
        // console.warn("Предупреждение: Элементы для переключения тарифов не найдены. Возможно, это не страница калькулятора коммуналки.");
        return; 
    }

    const tariffSelect = tariffSelectElement.value;
    
    if (tariffSelect === 'custom') {
        customTariffsElement.style.display = 'block';
    } else {
        customTariffsElement.style.display = 'none';
    }
}

// --- Калькулятор бюджета семьи ---
function calculateBudget() {
    // Проверка существования элементов
    const incomeInput = document.getElementById('income');
    const rentInput = document.getElementById('rent');
    const foodInput = document.getElementById('food');
    const transportInput = document.getElementById('transport');
    const entertainmentInput = document.getElementById('entertainment');
    const utilitiesInput = document.getElementById('utilities');
    const otherInput = document.getElementById('other');
    const resultElement = document.getElementById('budget-result');

    if (!incomeInput || !rentInput || !foodInput || !transportInput || !entertainmentInput || !utilitiesInput || !otherInput || !resultElement) {
         console.error("Ошибка: Не найдены необходимые элементы для калькулятора бюджета.");
        return;
    }

    const income = parseFloat(incomeInput.value) || 0;
    const rent = parseFloat(rentInput.value) || 0;
    const food = parseFloat(foodInput.value) || 0;
    const transport = parseFloat(transportInput.value) || 0;
    const entertainment = parseFloat(entertainmentInput.value) || 0;
    const utilities = parseFloat(utilitiesInput.value) || 0;
    const other = parseFloat(otherInput.value) || 0;

    const totalExpenses = rent + food + transport + entertainment + utilities + other;
    const savings = income - totalExpenses;

    if (income <= 0) {
        resultElement.innerHTML = '<p class="error">Введите корректный доход</p>';
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

    resultElement.innerHTML = `
        <p><strong>Общие расходы: ${totalExpenses.toFixed(2)} руб</strong></p>
        <p><strong>Сбережения: ${savings.toFixed(2)} руб (${savingsPercent.toFixed(1)}%)</strong></p>
        <p>${advice}</p>
        <div class="chart-container">
             <canvas id="budgetChart" width="400" height="400"></canvas>
        </div>
    `;

    // Создание диаграммы (после обновления innerHTML)
    setTimeout(() => { // Небольшая задержка для уверенности, что canvas добавлен в DOM
         createBudgetChart([rent, food, transport, entertainment, utilities, other, savings]);
    }, 0);
}

// Создание диаграммы для бюджета (исправленная версия)
function createBudgetChart(data) {
    const canvas = document.getElementById('budgetChart');
    
    // Проверка существования canvas
    if (!canvas) {
        console.warn("Предупреждение: Canvas для диаграммы бюджета не найден.");
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Ошибка: Не удалось получить контекст 2D для canvas.");
        return;
    }

    // Убедимся, что все данные числовые
    const numericData = data.map(value => isNaN(value) || value === null || value === undefined ? 0 : value);

    // Проверка, что все значения не равны 0, чтобы избежать ошибок Chart.js
    const totalData = numericData.reduce((sum, value) => sum + value, 0);
    if (totalData <= 0) {
        console.warn("Предупреждение: Все значения для диаграммы равны 0. Диаграмма не будет отображена.");
        // Можно отобразить сообщение пользователю
        const chartContainer = canvas.closest('.chart-container');
        if (chartContainer) {
            chartContainer.innerHTML = '<p>Нет данных для отображения диаграммы.</p>';
        }
        return;
    }

    // Удаляем предыдущую диаграмму если есть
    if (window.budgetChartInstance && typeof window.budgetChartInstance.destroy === 'function') {
        window.budgetChartInstance.destroy();
    }

    // Создаем новую диаграмму
    window.budgetChartInstance = new Chart(ctx, { // Используем уникальное имя переменной
        type: 'pie',
        data: {
            labels: ['Аренда', 'Продукты', 'Транспорт', 'Развлечения', 'ЖКХ', 'Другое', 'Сбережения'],
            datasets: [{
                data: numericData, // Используем проверенные данные
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

// --- Калькулятор ИМТ ---
// Исправленный калькулятор ИМТ
function calculateBMI() {
    // Получаем значения из полей ввода с проверкой существования
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultElement = document.getElementById('bmi-result');

    if (!heightInput || !weightInput || !resultElement) {
        console.error("Ошибка: Не найдены необходимые элементы для калькулятора ИМТ.");
        return; // Выход, если элементы не найдены
    }

    const heightStr = heightInput.value.trim();
    const weightStr = weightInput.value.trim();

    // Проверка на пустоту
    if (heightStr === '' || weightStr === '') {
        resultElement.innerHTML = '<p class="error">Пожалуйста, введите рост и вес</p>';
        return;
    }

    const height = parseFloat(heightStr);
    const weight = parseFloat(weightStr);

    // Проверка корректности ввода (включая NaN)
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultElement.innerHTML = '<p class="error">Пожалуйста, введите корректные значения роста и веса</p>';
        return;
    }

    // Расчет ИМТ
    const heightInMeters = height / 100; // Переводим см в метры
    const bmi = weight / (heightInMeters * heightInMeters);

    // Проверка на корректность результата (на случай очень маленьких/больших чисел)
    if (!isFinite(bmi)) {
        resultElement.innerHTML = '<p class="error">Ошибка расчета ИМТ. Проверьте введенные данные.</p>';
        return;
    }

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
    } else { // bmi >= 30
        category = 'Ожирение';
        advice = 'Серьезно рекомендуется снизить вес. Обратитесь к врачу.';
        color = '#FF0000';
    }

    // Отображение результата
    resultElement.innerHTML = `
        <p><strong>ИМТ: <span style="color: ${color}">${bmi.toFixed(1)}</span></strong></p>
        <p><strong>Категория: ${category}</strong></p>
        <p>${advice}</p>
        <div class="bmi-scale">
            <h4>Шкала ИМТ:</h4>
            <div class="scale-bar">
                <div class="scale-segment" style="background-color: #FF6B6B; width: 25%;">Недовес (<18.5)</div>
                <div class="scale-segment" style="background-color: #50C878; width: 30%;">Норма (18.5–24.9)</div>
                <div class="scale-segment" style="background-color: #FFA500; width: 25%;">Избыток (25–29.9)</div>
                <div class="scale-segment" style="background-color: #FF0000; width: 20%;">Ожирение (&ge;30)</div>
            </div>
            <div class="scale-markers">
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
            </div>
        </div>
    `;
}

// --- Калькулятор скидки ---
function calculateDiscount() {
    const oldPriceInput = document.getElementById('oldPrice');
    const discountPercentInput = document.getElementById('discountPercent');
    const resultElement = document.getElementById('discount-result');

    if (!oldPriceInput || !discountPercentInput || !resultElement) {
         console.error("Ошибка: Не найдены необходимые элементы для калькулятора скидки.");
        return;
    }

    const oldPriceStr = oldPriceInput.value.trim();
    const discountPercentStr = discountPercentInput.value.trim();

    if (oldPriceStr === '' || discountPercentStr === '') {
         resultElement.innerHTML = '<p class="error">Пожалуйста, введите цену и процент скидки</p>';
        return;
    }

    const oldPrice = parseFloat(oldPriceStr);
    const discountPercent = parseFloat(discountPercentStr);

    if (isNaN(oldPrice) || isNaN(discountPercent) || oldPrice < 0 || discountPercent < 0 || discountPercent > 100) {
        resultElement.innerHTML = '<p class="error">Введите корректные данные (цена >= 0, скидка 0-100%)</p>';
        return;
    }

    const discountAmount = (oldPrice * discountPercent) / 100;
    const newPrice = oldPrice - discountAmount;
    
    // Проверка на корректность результата
    if (!isFinite(newPrice) || !isFinite(discountAmount)) {
        resultElement.innerHTML = '<p class="error">Ошибка расчета. Проверьте введенные данные.</p>';
        return;
    }

    resultElement.innerHTML = `
        <p><strong>Новая цена: ${newPrice.toFixed(2)} руб</strong></p>
        <p>Вы экономите: ${discountAmount.toFixed(2)} руб (${discountPercent.toFixed(2)}%)</p>
    `;
}

// --- Калькулятор вклада ---
function calculateDeposit() {
    const amountInput = document.getElementById('depositAmount');
    const termInput = document.getElementById('depositTerm');
    const rateInput = document.getElementById('interestRate');
    const resultElement = document.getElementById('deposit-result');

    if (!amountInput || !termInput || !rateInput || !resultElement) {
         console.error("Ошибка: Не найдены необходимые элементы для калькулятора вклада.");
        return;
    }

    const amountStr = amountInput.value.trim();
    const termStr = termInput.value.trim();
    const rateStr = rateInput.value.trim();

    if (amountStr === '' || termStr === '' || rateStr === '') {
         resultElement.innerHTML = '<p class="error">Пожалуйста, введите сумму, срок и процентную ставку</p>';
        return;
    }

    const amount = parseFloat(amountStr);
    const term = parseFloat(termStr);
    const rate = parseFloat(rateStr);

    if (isNaN(amount) || isNaN(term) || isNaN(rate) || amount <= 0 || term <= 0 || rate < 0) {
        resultElement.innerHTML = '<p class="error">Введите корректные данные (сумма > 0, срок > 0, ставка >= 0)</p>';
        return;
    }

    // Расчет с ежемесячной капитализацией
    const monthlyRate = (rate / 100) / 12;
    // Проверка на деление на ноль или очень маленькое число
    if (monthlyRate <= 0 && term > 0) {
        // Если ставка 0%, результат простой
        const result = amount;
        const profit = 0;
        resultElement.innerHTML = `
            <p><strong>Итоговая сумма: ${result.toFixed(2)} руб</strong></p>
            <p>Прибыль: ${profit.toFixed(2)} руб</p>
            <p>Срок: ${term.toFixed(0)} месяцев</p>
            <p>Процентная ставка: 0%</p>
        `;
        return;
    }
    
    const result = amount * Math.pow(1 + monthlyRate, term);
    const profit = result - amount;
    
    // Проверка на корректность результата
    if (!isFinite(result) || !isFinite(profit) || result < 0 || profit < 0) {
        resultElement.innerHTML = '<p class="error">Ошибка расчета. Проверьте введенные данные.</p>';
        return;
    }

    resultElement.innerHTML = `
        <p><strong>Итоговая сумма: ${result.toFixed(2)} руб</strong></p>
        <p>Прибыль: ${profit.toFixed(2)} руб</p>
        <p>Срок: ${term.toFixed(0)} месяцев</p>
        <p>Годовая ставка: ${rate.toFixed(2)}%</p>
    `;
}
