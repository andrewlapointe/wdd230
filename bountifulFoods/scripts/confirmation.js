const jsonFile = './data/fruits.json'
let url = new URL(window.location);
let params  = url.searchParams;

let firstName = params.get("firstName");
let email = params.get("email");
let phoneNumber = params.get("phoneNumber");
let fruit1 = params.get("fruit1");
let fruit2 = params.get("fruit2");
let fruit3 = params.get("fruit3");

document.querySelector('#firstName').textContent = firstName;
document.querySelector('#email').textContent = email;
document.querySelector('#phoneNumber').textContent = phoneNumber;
document.querySelector('#fruit1').textContent = fruit1;
document.querySelector('#fruit2').textContent = fruit2;
document.querySelector('#fruit3').textContent = fruit3;

// Check to see if the instructions are empty
let instructions = params.get("instructions");
if (instructions != '') {
    document.querySelector('#instructions').textContent = instructions;
} else {
    document.querySelector('#instructions').textContent = "None";
}

function calcNutrition(data) {
    fruit1Values = findValuesByName(fruit1, data);
    fruit2Values = findValuesByName(fruit2, data);
    fruit3Values = findValuesByName(fruit3, data);

    const calories = document.getElementById("calories");
    const protein = document.getElementById("protein");
    const fat = document.getElementById("fat");
    const carbs = document.getElementById("carbohydrates");
    const sugar = document.getElementById("sugar");

    calories.innerHTML = Math.round(fruit1Values[0] + fruit2Values[0] + fruit3Values[0]);
    protein.innerHTML = Math.round(fruit1Values[1] + fruit2Values[1] + fruit3Values[1]);
    fat.innerHTML = Math.round(fruit1Values[2] + fruit2Values[2] + fruit3Values[2]);
    carbs.innerHTML = Math.round(fruit1Values[3] + fruit2Values[3] + fruit3Values[3]);
    sugar.innerHTML = Math.round(fruit1Values[4] + fruit2Values[4] + fruit3Values[4]);
}

function findValuesByName(name, data) {
    for (const item of data) {
      if (item.name === name) {
        return [item.nutritions.calories, item.nutritions.protein, item.nutritions.fat, item.nutritions.carbohydrates, item.nutritions.sugar];
      }
    }
    return null;
}

function getTimePlus10Minutes() {
    const currentTime = new Date();
    const tenMinutesLater = new Date(currentTime.getTime() + 10 * 60000); // 1 minute = 60000 milliseconds
  
    const hours = tenMinutesLater.getHours().toString().padStart(2, '0');
    const minutes = tenMinutesLater.getMinutes().toString().padStart(2, '0');
    
    let span = document.getElementById("pickup-time");
    span.innerHTML = `${hours}:${minutes}`;
}

const currentDate = new Date();

// Get the span element by its id
const dateSpan = document.getElementById('date-here');

// Set the inner text of the span to the current date
dateSpan.innerText = currentDate.toDateString();

async function fetchFruits() {
    try {
        const response = await fetch(jsonFile);
        if (response.ok) {
            // Parse the JSON response
            const data = await response.json();      
            calcNutrition(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

fetchFruits();
getTimePlus10Minutes();