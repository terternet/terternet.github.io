// --- Вспомогательная функция для уничтожения диаграммы ---
function destroyChart(chartInstanceName) {
    if (window[chartInstanceName]) {
        window[chartInstanceName].destroy();
        window[chartInstanceName] = undefined; // Очистка ссылки
    }
}

// --- Калькулятор коммуналки ---
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

// --- Калькулятор бюджета семьи ---
function calculateBudget() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const food = parseFloat(document.getElementById('food').value) || 0;
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const entertainment = parseFloat(document.getElementById('entertainment').value) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value) || 0;
    const other = parseFloat(document.getElementById('other').value) || 0;

    if (income <= 0) {
        document.getElementById('budget-result').innerHTML = '<p class="error">Введите корректный доход</p>';
        // Уничтожаем диаграмму, если была
        destroyChart('budgetChartInstance');
        return;
    }

    const totalExpenses = rent + food + transport + entertainment + utilities + other;
    const savings = income - totalExpenses; // Может быть отрицательным

    // Проценты от дохода
    const rentPercent = (rent / income) * 100;
    const foodPercent = (food / income) * 100;
    const entertainmentPercent = (entertainment / income) * 100;
    const savingsPercent = (Math.abs(savings) / income) * 100; // Используем abs для отображения
    const utilitiesPercent = (utilities / income) * 100;
    const transportPercent = (transport / income) * 100;
    const otherPercent = (other / income) * 100;

    let advice = '';
    if (rentPercent > 30) {
        advice += `<p>Аренда составляет ${rentPercent.toFixed(1)}% дохода (рекомендуется до 30%).</p>`;
    }
    if (foodPercent > 20) {
        advice += `<p>Продукты составляют ${foodPercent.toFixed(1)}% дохода (рекомендуется до 20%).</p>`;
    }
    if (entertainmentPercent > 15) {
        advice += `<p>Развлечения составляют ${entertainmentPercent.toFixed(1)}% дохода (рекомендуется до 15%).</p>`;
    }
    if (savings < 0) {
        advice += `<p style="color:#FF6B6B;"><strong>Внимание!</strong> Ваши расходы превышают доход на ${Math.abs(savings).toFixed(2)} руб (${savingsPercent.toFixed(1)}% от дохода). Необходимо пересмотреть бюджет.</p>`;
    } else if (savingsPercent < 10) {
        advice += `<p>Сбережения составляют ${savingsPercent.toFixed(1)}% дохода (рекомендуется минимум 10%).</p>`;
    }

    if (advice === '') {
        advice = '<p style="color:#50C878;">Ваш бюджет хорошо сбалансирован!</p>';
    } else if(savings >= 0) { // Добавим положительный комментарий, если есть сбережения, даже с замечаниями
         advice = `<p style="color:#50C878;">Отлично, у вас остались сбережения!</p>` + advice;
    }

    // Подготовка данных для диаграммы (только положительные значения)
    const chartLabels = ['Аренда', 'Продукты', 'Транспорт', 'Развлечения', 'ЖКХ', 'Другое'];
    const chartDataValues = [rent, food, transport, entertainment, utilities, other];

    // Добавляем "Сбережения" только если они положительны
    let hasSavings = false;
    if (savings > 0) {
        chartLabels.push('Сбережения');
        chartDataValues.push(savings);
        hasSavings = true;
    }
    // Добавляем "Дефицит" только если расходы превышают доход
    let hasDeficit = false;
    if (savings < 0) {
        chartLabels.push('Дефицит');
        chartDataValues.push(Math.abs(savings)); // Отображаем абсолютное значение
        hasDeficit = true;
    }

    // Формируем HTML результата
    let resultHTML = `
        <p><strong>Общие расходы: ${totalExpenses.toFixed(2)} руб</strong></p>
    `;

    if (savings >= 0) {
        resultHTML += `<p><strong>Сбережения: ${savings.toFixed(2)} руб (${savingsPercent.toFixed(1)}%)</strong></p>`;
    } else {
        resultHTML += `<p style="color:#FF6B6B;"><strong>Дефицит: ${Math.abs(savings).toFixed(2)} руб (${savingsPercent.toFixed(1)}%)</strong></p>`;
    }

    resultHTML += `<div>${advice}</div>`;

    // Проверяем наличие элемента canvas для диаграммы
    const chartCanvas = document.getElementById('budgetChart');
    if (chartCanvas) {
        resultHTML += `<div style="margin-top: 20px;"><canvas id="budgetChart" width="400" height="200"></canvas></div>`;
    }

    document.getElementById('budget-result').innerHTML = resultHTML;


    // --- Создание/Обновление диаграммы ---
    // Уничтожаем предыдущую диаграмму, если она существует
    destroyChart('budgetChartInstance');

    if (chartCanvas && chartDataValues.some(value => value > 0)) { // Создаем диаграмму только если есть данные для отображения
        const ctx = chartCanvas.getContext('2d');
        if (ctx) {
            // Определяем цвета: базовые + цвет для сбережений или дефицита
            let backgroundColors = [
                '#4A90E2', // Аренда
                '#50C878', // Продукты
                '#FF6B6B', // Транспорт
                '#FFD93D', // Развлечения
                '#9B59B6', // ЖКХ
                '#3498DB'  // Другое
            ];
            if (hasSavings) {
                backgroundColors.push('#2ECC71'); // Сбережения - зеленый
            }
            if (hasDeficit) {
                backgroundColors.push('#E74C3C'); // Дефицит - красный
            }


            window.budgetChartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: chartLabels,
                    datasets: [{
                        data: chartDataValues,
                        backgroundColor: backgroundColors
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                // boxWidth: 12, // Уменьшаем размер квадратика
                                // padding: 10
                            }
                        },
                         tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(context.parsed);
                                        // Добавляем процент
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = Math.round((context.parsed / total) * 100);
                                        label += ` (${percentage}%)`;
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        }
    } else if(chartCanvas) {
        // Если canvas есть, но данных нет, можно отобразить сообщение
        chartCanvas.parentNode.innerHTML = '<p>Нет данных для отображения диаграммы.</p>';
    }
}


// --- Калькулятор ИМТ ---
function calculateBMI() {
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value) || 0;
    const height = parseFloat(document.getElementById('height').value) || 0;
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    // Убрана проверка age > 100
    if (age < 18 || height <= 0 || weight <= 0) {
        document.getElementById('bmi-result').innerHTML = '<p class="error">Введите корректные данные (возраст 18+ лет)</p>';
        return;
    }
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let category = '';
    let advice = '';
    let color = '';
    // Определение категории
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
    // Дополнительные рекомендации с учетом возраста
    let ageAdvice = '';
    if (age > 65) {
        ageAdvice = '<p><strong>Для вашего возраста:</strong> Обратите особое внимание на питание, костную плотность и общую физическую активность. Регулярные медицинские осмотры рекомендованы.</p>';
    } else if (age > 50) {
        ageAdvice = '<p><strong>Для вашего возраста:</strong> Обратите внимание на костную плотность, мышечную массу и уровень холестерина.</p>';
    } else if (age > 30) {
        ageAdvice = '<p><strong>Для вашего возраста:</strong> Регулярные тренировки помогут сохранить форму и метаболизм.</p>';
    } else { // Возраст 18-30
         ageAdvice = '<p><strong>Для вашего возраста:</strong> Это отличное время заложить основы здорового образа жизни.</p>';
    }

    document.getElementById('bmi-result').innerHTML = `
        <p><strong>ИМТ: <span style="color: ${color}">${bmi.toFixed(1)}</span></strong></p>
        <p><strong>Категория: ${category}</strong></p>
        <p>${advice}</p>
        ${ageAdvice}
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
// --- Калькулятор скидки ---
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
// --- Калькулятор вклада ---
function calculateDeposit() {
    const amount = parseFloat(document.getElementById('depositAmount').value) || 0;
    const term = parseFloat(document.getElementById('depositTerm').value) || 0;
    const rate = parseFloat(document.getElementById('interestRate').value) || 0;
    const capitalize = document.getElementById('capitalization').checked;

    if (amount <= 0 || term <= 0 || rate <= 0) {
        document.getElementById('deposit-result').innerHTML = '<p class="error">Введите корректные данные</p>';
        return;
    }

    let result;
    let profit;
    if (capitalize) {
        // Расчет с ежемесячной капитализацией
        const monthlyRate = (rate / 100) / 12;
        result = amount * Math.pow(1 + monthlyRate, term);
        profit = result - amount;
    } else {
        // Расчет без капитализации (простые проценты)
        // i = p * r * t
        // r - годовая процентная ставка (в десятичном виде)
        // t - срок в годах
        const years = term / 12;
        const annualRate = rate / 100;
        profit = amount * annualRate * years;
        result = amount + profit;
    }

    document.getElementById('deposit-result').innerHTML = `
        <p><strong>Итоговая сумма: ${result.toFixed(2)} руб</strong></p>
        <p>Прибыль: ${profit.toFixed(2)} руб</p>
        <p>Срок: ${term} месяцев</p>
        <p>Капитализация: ${capitalize ? 'Да' : 'Нет'}</p>
    `;
}
// --- Валидация полей ввода и инициализация ---
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик валидации для числовых полей
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Убираем всё, что не является цифрой или точкой
             this.value = this.value.replace(/[^0-9.]/g, '');
             // Убираем ведущие нули (но оставляем 0.5 и т.п.)
             this.value = this.value.replace(/^0+(\d)/, '$1');
             // Убираем лишние точки (оставляем только первую)
             let parts = this.value.split('.');
             if (parts.length > 2) {
                 this.value = parts[0] + '.' + parts.slice(1).join('');
             }
             // Убираем отрицательные значения
            if (parseFloat(this.value) < 0 || this.value.startsWith('-')) {
                 // Просто удаляем символ '-', если он в начале
                 if(this.value.startsWith('-')) {
                      this.value = this.value.substring(1);
                 } else {
                     // Если как-то отрицательное число появилось, ставим 0
                      this.value = '0';
                 }
            }
            // Ограничиваем количество знаков после запятой до 2
            if (parts[1] && parts[1].length > 2) {
                 this.value = parts[0] + '.' + parts[1].substring(0, 2);
            }
        });
         // Обработчик blur для корректного форматирования
        input.addEventListener('blur', function() {
            if (this.value !== '' && !isNaN(this.value)) {
                 // Округляем до 2 знаков после запятой при потере фокуса
                 this.value = parseFloat(this.value).toFixed(2);
                 // Убираем незначащие нули в конце, но оставляем .00 если это целое число
                 // this.value = parseFloat(this.value).toString(); // Это уберет .00
                 // Лучше оставить .00 для визуальной согласованности полей
            } else if (this.value === '' || isNaN(this.value)) {
                 this.value = '0.00';
            }
        });
    });

    // Инициализация переключения тарифов в калькуляторе ЖКХ
    const tariffSelect = document.getElementById('tariff-select');
    if (tariffSelect) {
        tariffSelect.addEventListener('change', toggleCustomTariffs);
        // Инициализация при загрузке страницы
        toggleCustomTariffs();
    }
});
