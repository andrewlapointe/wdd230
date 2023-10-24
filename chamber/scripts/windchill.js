const sunnyIcon = "sunny";
const cloudyIcon = "cloud";
const rainyIcon = "rainy";
const partlyCloudyIcon = "partly_cloudy_day";
const snowyIcon = "weather_snowy";
const mixedSnowIcon = "weather_mix";
const windIcon = "airwave";

let temp = 20;
let windSpeed = 15;

const icon = document.getElementById("main-weather-icon");
const weatherTypeText = document.getElementById("weather-type-text");
const windChillIcon = document.getElementById("wind-icon");
const HTMLtemp = document.getElementById("weather-temp-text")
const windchillText = document.getElementById("calculated-chill");


icon.innerHTML =  sunnyIcon; // This can be changed later to automatically choose the correct icon
weatherTypeText.innerHTML = toTitleCase(sunnyIcon)
HTMLtemp.innerHTML = String(temp);

if (temp <= 50 && windSpeed > 3) {
    let windChill = (35.74 + (0.6215 * temp) - (35.75 * (windSpeed ** 0.16)) + (0.4275 * temp * (windSpeed ** 0.16)));
    console.log(windChill);
    windChillIcon.innerHTML = windIcon;
    windchillText.innerHTML = windChill.toFixed(0);
}
else {
    windChillIcon.innerHTML = windIcon;
    windchillText.innerHTML = "N/A";
}



function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }