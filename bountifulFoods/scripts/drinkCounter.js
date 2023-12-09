const drinksPurchased = document.getElementById('drinks-purchased');
const drinksRemaining = document.getElementById('drinks-remaining');

purchasedLSKEY = 'purchased';

function loadValues() {
    drinksPurchased.innerHTML = getPurchasedFromLocalStorage()
}

function getPurchasedFromLocalStorage() {
    const purchasedStr = localStorage.getItem(purchasedLSKEY);
    return purchasedStr;
}
// function getRemainingFromLocalStorage() {
//     const purchasedStr = localStorage.getItem('purchased');
//     return JSON.parse(purchasedStr);
// }
loadValues();