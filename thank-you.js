function generateOrderNumber() {
    return 'ORD-' + Math.floor(Math.random() * 1000000);
}

function setOrderNumber() {
    const orderNumberElement = document.getElementById('order-number');
    orderNumberElement.textContent = generateOrderNumber();
}

function redirectToHomePage() {
    setTimeout(() => {
        window.location.href = 'index.html'; 
    }, 5000); 
}

window.onload = () => {
    setOrderNumber();
    redirectToHomePage();
};
