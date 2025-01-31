document.getElementById('findButton').addEventListener('click', function () {
    const input = document.getElementById('numberInput').value;
    const operation = document.getElementById('operation').value;
    const errorMessage = document.getElementById('errorMessage');
    const resultSection = document.getElementById('resultSection');
    const numbersDisplay = document.getElementById('numbersDisplay');
    const resultDisplay = document.getElementById('resultDisplay');

    errorMessage.classList.add('hidden');
    resultSection.classList.add('hidden');
    numbersDisplay.innerHTML = '';
    resultDisplay.innerHTML = '';

    const numbers = input.split(',').map(num => num.trim()).filter(num => num !== '');
    if (numbers.some(num => isNaN(num) || num <= 0 || num.includes(' '))) {
        errorMessage.classList.remove('hidden');
        return;
    }

    const uniqueNumbers = [...new Set(numbers.map(Number))];
    uniqueNumbers.forEach(num => {
        const numElement = document.createElement('div');
        numElement.className = 'p-2 m-1 bg-purple-500 rounded-lg text-white';
        numElement.textContent = num;
        numbersDisplay.appendChild(numElement);
    });

    const hcf = (a, b) => b === 0 ? a : hcf(b, a % b);
    const lcm = (a, b) => (a * b) / hcf(a, b);

    let result;
    if (operation === 'hcf') {
        result = uniqueNumbers.reduce((acc, num) => hcf(acc, num));
    } else {
        result = uniqueNumbers.reduce((acc, num) => lcm(acc, num));
    }

    resultDisplay.textContent = result;
    resultSection.classList.remove('hidden');
});

// Share Button
document.getElementById('copy-link').addEventListener('click', function () {
    const urlField = document.getElementById('page-url');
    urlField.select();
    document.execCommand('copy');
    document.getElementById('copy-confirmation').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('copy-confirmation').classList.add('hidden');
    }, 2000);
});

document.getElementById('generate-qr').addEventListener('click', function () {
    const qr = new QRious({
        element: document.getElementById('qr-code'),
        value: document.getElementById('page-url').value,
        size: 100
    });
});