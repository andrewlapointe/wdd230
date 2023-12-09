// URL for fetching weather forecast data
const lat = 33.1215196;
const lon = -117.287802;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1d2089b9d3e771d71cf555b564974057&units=imperial`;

// Constant representing one day in milliseconds
const ONE_DAY = 24 * 60 * 60 * 1000;

// Function to process and display the forecast data
function showForecast(forecasts) {
    // console.log(forecasts);
    
    let dates = [];

    // Current date
    let mydate = new Date();
    for (let i = 0; i < 3; i++) {
        // Increment the date by one day
        mydate = new Date(mydate.getTime() + ONE_DAY);
        let nextdate = mydate.toISOString().slice(0, 10);
        dates.push(nextdate);
    }
    
    let filteredForecasts = [];

    for (let i = 0; i < dates.length; i++) {
        filteredForecasts.push(forecasts.filter(x => x.dt_txt.startsWith(dates[i] + ' 09:00:00')))

    }
    console.log(filteredForecasts)

    // Get the element where the forecast will be displayed
    let weatherElt = document.getElementById('forecast-grid');

    // Iterate over the dates and append the forecast data to the HTML
    for (let i = 0; i < dates.length; i++) {
        // Create a new section for each date
        let newsection = document.createElement("section");
        // Check if there is data for the date and add HTML content
        if (filteredForecasts[i]) { 
            newsection.innerHTML = `<h3>${dates[i].slice(5,)}</h3><img src="http://openweathermap.org/img/w/${filteredForecasts[i][0].weather[0].icon}.png" alt="Weather Icon for ${dates[i]}"><p>${sentenceCase(filteredForecasts[i][0].weather[0].description)}`;
        } else {
            newsection.innerHTML = `<h3>${dates[i]}</h3><p>No data available for this date</p>`;
        }
        weatherElt.append(newsection);
    }    

}

function showWeather(forecasts) {
    
    date = new Date();
    strDate = date.toISOString().slice(0,10)
    console.log(strDate)
    // Find the highest temperature for each date
    let highTemps = date => {
        // Filter forecasts for the specific date
        const filteredForecasts = forecasts.filter(x => x.dt_txt.startsWith(strDate));
        // Find the forecast with the highest temperature
        return filteredForecasts.length > 0 ? filteredForecasts.reduce((currentObj, highObj) => currentObj.main.temp > highObj.main.temp ? currentObj : highObj) : null;
    };    
    
    // Find the lowest temperature for each date
    let lowTemps = date => {
        // Filter forecasts for the specific date
        const filteredForecasts = forecasts.filter(x => x.dt_txt.startsWith(strDate));
        // Find the forecast with the lowest temperature
        return filteredForecasts.length > 0 ? filteredForecasts.reduce((currentObj, lowObj) => currentObj.main.temp < lowObj.main.temp ? currentObj : lowObj) : null;
    }; 
    
    let todayWeather = document.getElementById('today-weather');
    
    let todayNewSection = document.createElement('section');
    if (highTemps[0] && lowTemps[0]) {
        todayNewSection.innerHTML = `<p>High: ${highTemps[0].main.temp.toFixed(0)}&deg;</p><p>Low: ${lowTemps[0].main.temp.toFixed(0)}&deg;</p>`;
    } else {
        todayNewSection.innerHTML = `<h3>${date.toString().slice(0,10)}</h3><p>No data available for this date</p>`;
    }
    todayWeather.append(todayNewSection);
}

// Async function to fetch the forecast data
async function fetchForecast() {
    try {
        // Fetch data from the API
        const response = await fetch(forecastURL);
        if (response.ok) {
            // Parse the JSON response
            const data = await response.json();      
            // Pass the forecast data to showForecast function
            showForecast(data.list);
            showWeather(data.list);
        } else {
            // Handle HTTP errors
            throw Error(await response.text());
        }
    } catch (error) {
        // Log any errors to the console
        console.log(error);
    }
}

function sentenceCase(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
 
    return str.replace(/\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() +
                txt.substr(1).toLowerCase();
        });
}

// Invoke the function to fetch and display the forecast
fetchForecast();
 