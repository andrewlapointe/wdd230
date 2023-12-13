const jsonFile = './data/fruits.json'
const select1 = document.getElementById('fruit1');
const select2 = document.getElementById('fruit2');
const select3 = document.getElementById('fruit3');

const purchasedLSKEY = 'purchased';

let selectElements = [select1, select2, select3]

function loadFruits(data) {
    generateOptions(select1, data);
    generateOptions(select2, data);
    generateOptions(select3, data); 
}

function generateOptions(selectElem, data) {
    for (i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = data[i].name;
        option.value = `${data[i].name}`;

        selectElem.append(option);
    }
}

async function fetchFruits() {
    try {
        const response = await fetch(jsonFile);
        if (response.ok) {
            // Parse the JSON response
            const data = await response.json();      
            loadFruits(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Fetch fruits when the DOM is fully loaded
    fetchFruits();

    // Prevent the default form submission temporarily
    document.getElementById('order-form').addEventListener('submit', function (event) {
        event.preventDefault();

        let old = localStorage.getItem(purchasedLSKEY);
        localStorage.setItem(purchasedLSKEY, (parseInt(old)+1).toString())

        // submit form when local storage has been updated
        this.submit();
    });
});