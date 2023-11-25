const api_url = 'https://api.openweathermap.org/data/2.5/weather?lat=38.8842757&lon=-77.1926641&appid=1d2089b9d3e771d71cf555b564974057&units=imperial';

const temp = document.getElementById('#temp');
const description = document.getElementById('#description')

async function getWeather() {
    try {
        const response = await fetch(api_url);
        const data = await response.json();

        temp.innerHTML = data.main.temp


    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getWeather();
