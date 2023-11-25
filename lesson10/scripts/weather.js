const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.getElementById('figcaption');

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.7779862&lon=6.4846519&appid=1d2089b9d3e771d71cf555b564974057&units=imperial";

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}
  
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    // Since 'weather' is an array, you need to access its first element
    const weatherData = data.weather[0];

    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);

    // Set caption description if needed
    captionDesc.textContent = weatherData.description;
}


apiFetch();
  