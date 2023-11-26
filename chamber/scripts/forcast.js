// URL for fetching weather forecast data
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=38.8842369&lon=-77.2132642&appid=1d2089b9d3e771d71cf555b564974057&units=imperial";

// Constant representing one day in milliseconds
const ONE_DAY = 24 * 60 * 60 * 1000;

// Function to process and display the forecast data
function showForecast(forecasts) {
    // Log the raw forecast data for debugging
    console.log(forecasts);
    
    // Array to store the dates for which we need forecasts
    let dates = [];

    // Current date
    let mydate = new Date();
    for (let i = 0; i < 3; i++) {
        // Convert date to ISO string and take the first 10 characters (YYYY-MM-DD)
        let nextdate = mydate.toISOString().slice(0, 10);
        dates.push(nextdate);
        // Increment the date by one day
        mydate = new Date(mydate.getTime() + ONE_DAY);
    }
    // Log the dates for which forecasts will be displayed
    console.log(dates);
    
    // Find the highest temperature for each date
    let highTemps = dates.map((date) => {
        // Filter forecasts for the specific date
        const filteredForecasts = forecasts.filter(x => x.dt_txt.startsWith(date));
        // Find the forecast with the highest temperature
        return filteredForecasts.length > 0 ? filteredForecasts.reduce((currentObj, highObj) => currentObj.main.temp > highObj.main.temp ? currentObj : highObj) : null;
    });    
    
    // Find the lowest temperature for each date
    let lowTemps = dates.map((date) => {
        // Filter forecasts for the specific date
        const filteredForecasts = forecasts.filter(x => x.dt_txt.startsWith(date));
        // Find the forecast with the lowest temperature
        return filteredForecasts.length > 0 ? filteredForecasts.reduce((currentObj, lowObj) => currentObj.main.temp < lowObj.main.temp ? currentObj : lowObj) : null;
    });    
    // Log the high and low temperatures for debugging
    console.log(highTemps);
    console.log(lowTemps);

    // Get the element where the forecast will be displayed
    let weatherElt = document.getElementById('information');

    // Iterate over the dates and append the forecast data to the HTML
    for (let i = 0; i < dates.length; i++) {
        // Create a new section for each date
        let newsection = document.createElement("section");
        // Check if there is data for the date and add HTML content
        if (highTemps[i] && lowTemps[i]) {
            newsection.innerHTML = `<h2>${dates[i]}</h2><p>High: ${highTemps[i].main.temp.toFixed(0)}&deg;</p><p>Low: ${lowTemps[i].main.temp.toFixed(0)}&deg;</p>`;
        } else {
            newsection.innerHTML = `<h2>${dates[i]}</h2><p>No data available for this date</p>`;
        }
        // Append the section to the DOM
        weatherElt.append(newsection);
    }    
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
        } else {
            // Handle HTTP errors
            throw Error(await response.text());
        }
    } catch (error) {
        // Log any errors to the console
        console.log(error);
    }
}

// Invoke the function to fetch and display the forecast
fetchForecast();
