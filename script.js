let depositCount = 0;

function updateLeverageValue(value) {
    document.getElementById('leverage-value').innerText = value;
}

function addAdditionalDeposit() {
    depositCount++;
    const depositsDiv = document.getElementById('additional-deposits');
    const depositDiv = document.createElement('div');
    depositDiv.classList.add('form-group');
    depositDiv.innerHTML = `
        <label class="lab" for="additional-investment-${depositCount}">Доп. депозит ${depositCount}:</label>
        <input type="number" id="additional-investment-${depositCount}" placeholder="Введите сумму доп. депозита">
        <label class="lab" for="additional-price-${depositCount}">Цена актива во время доп. депозита:</label>
        <input type="number" id="additional-price-${depositCount}" placeholder="Введите цену актива">
    `;
    depositsDiv.appendChild(depositDiv);
}

function calculate() {
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
    const initialPrice = parseFloat(document.getElementById('initial-price').value);
    const leverage = parseFloat(document.getElementById('leverage').value);
    const position = document.querySelector('input[name="position"]:checked').value;

    let totalInvestment = initialInvestment;
    let totalCost = initialInvestment * initialPrice;
    let liquidationPrice;

    for (let i = 1; i <= depositCount; i++) {
        const additionalInvestment = parseFloat(document.getElementById(`additional-investment-${i}`).value);
        const additionalPrice = parseFloat(document.getElementById(`additional-price-${i}`).value);

        totalInvestment += additionalInvestment;
        totalCost += additionalInvestment * additionalPrice;
    }

    const averageOpenPrice = totalCost / totalInvestment;

    if (position === 'long') {
        liquidationPrice = averageOpenPrice - (averageOpenPrice / leverage);
    } else {
        liquidationPrice = averageOpenPrice + (averageOpenPrice / leverage);
    }

    document.getElementById('result').innerText = `Средняя цена открытия: $${averageOpenPrice.toFixed(6)}\nЦена ликвидации: $${liquidationPrice.toFixed(6)}`;
}

// Функция для установки темы
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.getElementById('theme-style').setAttribute('href', themeName);
}

// Функция для инициализации темы при загрузке страницы
function initTheme() {
  const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'stylesDARK.css' : 'styles(orig).css');
  setTheme(storedTheme);
}

// Функция для смены темы с анимацией
function changeTheme(newTheme) {
  document.body.style.transition = 'background-color 0.5s';
  setTheme(newTheme);
}

// Установка начальной темы при загрузке страницы
document.addEventListener('DOMContentLoaded', initTheme);

// Добавление слушателей событий для элементов #moon и #sun
document.getElementById('moon').addEventListener('click', function() {
  changeTheme('styles.css');
});

document.getElementById('sun').addEventListener('click', function() {
  changeTheme('styles(light).css');
});
