let order = [];
let totalPrice = 0;

const welcomeScreen = document.getElementById('welcomeScreen');
const kioskScreen = document.getElementById('kioskScreen');
const finalScreen = document.getElementById('finalScreen');

const currencies = {
    en: { symbol: '$', rate: 1 },
    cz: { symbol: 'Kč', rate: 22.5 },
    sk: { symbol: '€', rate: 0.9 }
};

let currentCurrency = 'en';

const translations = {
    en: {
        welcomeText: "Welcome to Arby's",
        menuTitle: "Arby's Menu",
        burgerTitle: "Burgers",
        drinkTitle: "Drinks",
        friesTitle: "Fries",
        dessertTitle: "Desserts",
        yourOrderText: "Your Order",
        totalText: "Total",
        paymentText: "Payment",
        paymentInstruction: "Scan the QR code to complete payment."
    },
    cz: {
        welcomeText: "Vítejte v Arby's",
        menuTitle: "Menu Arby's",
        burgerTitle: "Burgery",
        drinkTitle: "Nápoje",
        friesTitle: "Hranolky",
        dessertTitle: "Dezerty",
        yourOrderText: "Vaše objednávka",
        totalText: "Celkem",
        paymentText: "Platba",
        paymentInstruction: "Naskenujte QR kód pro dokončení platby."
    },
    sk: {
        welcomeText: "Vitajte v Arby's",
        menuTitle: "Menu Arby's",
        burgerTitle: "Hamburgery",
        drinkTitle: "Nápoje",
        friesTitle: "Hranolky",
        dessertTitle: "Dezerty",
        yourOrderText: "Vaša objednávka",
        totalText: "Celkom",
        paymentText: "Platba",
        paymentInstruction: "Naskenujte QR kód pre dokončenie platby."
    },
};

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(section => section.classList.add('hidden'));
    screen.classList.remove('hidden');
    screen.classList.add('visible');
}

function addItem(item, price) {
    order.push({ item, price });
    updateOrderSummary();
}

function updateOrderSummary() {
    const orderList = document.getElementById('orderList');
    const totalPriceElement = document.getElementById('totalPrice');
    const currencySymbol = currencies[currentCurrency].symbol;

    orderList.innerHTML = '';
    order.forEach(entry => {
        const itemEl = document.createElement('p');
        itemEl.textContent = `${entry.item} - ${currencySymbol}${(entry.price * currencies[currentCurrency].rate).toFixed(2)}`;
        orderList.appendChild(itemEl);
    });

    totalPrice = order.reduce((sum, entry) => sum + entry.price, 0);
    totalPriceElement.textContent = `${currencySymbol}${(totalPrice * currencies[currentCurrency].rate).toFixed(2)}`;
}

function resetToHome() {
    order = [];
    totalPrice = 0;
    updateOrderSummary();
    showScreen(welcomeScreen);
}

function confirmOrder() {
    if (order.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    completeOrder();
}

document.getElementById('startOrder').addEventListener('click', function() {
    showScreen(kioskScreen);
});

document.getElementById('confirmOrder').addEventListener('click', confirmOrder);
document.getElementById('cancelOrder').addEventListener('click', resetToHome);

function completeOrder() {
    window.location.href = 'thank-you.html';
}

function changeLanguage() {
    const language = document.getElementById('languageSelect').value;
    currentCurrency = language;

    const translation = translations[language];
    if (translation) {
        document.getElementById('welcomeText').textContent = translation.welcomeText;
        document.getElementById('menuTitle').textContent = translation.menuTitle;
        document.getElementById('burgerTitle').textContent = translation.burgerTitle;
        document.getElementById('drinkTitle').textContent = translation.drinkTitle;
        document.getElementById('friesTitle').textContent = translation.friesTitle;
        document.getElementById('dessertTitle').textContent = translation.dessertTitle;
        document.getElementById('yourOrderText').textContent = translation.yourOrderText;
        document.getElementById('totalText').textContent = `${translation.totalText}:`;
        document.getElementById('paymentText').textContent = translation.paymentText;
        document.getElementById('paymentInstruction').textContent = translation.paymentInstruction;

        updateOrderSummary();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    changeLanguage();
});
