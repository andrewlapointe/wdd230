const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=38.8842369&lon=-77.2132642&appid=1d2089b9d3e771d71cf555b564974057&units=imperial";

const ONE_DAY = 24 * 60 * 60 * 1000;

function showForecast(forecasts) {
    console.log(forecasts);
    let dates = [];
    let mydate = new Date();
    for (let i = 0; i < 3; i++) {
        mydate = new Date(mydate.getTime() + ONE_DAY);
        let nextdate = mydate.toISOString().slice(0, 10);
        dates.push(nextdate);
    }
    console.log(dates);
    
    // Find the object with the highest temperature for each day
    let highTemps = dates.map((date) => forecasts
        .filter(x => x.dt_txt.startsWith(date))
        .reduce((currentObj, highObj) => currentObj.main.temp > highObj.main.temp ? currentObj : highObj, {})
    );    
    // Find the object with the lowest temperature for each day
    let lowTemps = dates.map((date) => forecasts
        .filter(x => x.dt_txt.startsWith(date))
        .reduce((currentObj, lowObj) => currentObj.main.temp < lowObj.main.temp ? currentObj : lowObj, {})
    );    
    console.log(highTemps);
    console.log(lowTemps);

    // Add the forecast information to the HTML document
    let weatherElt = document.getElementById('information');
    for (let i = 0; i < dates.length; i++) {
        let newsection = document.createElement("section");
        newsection.innerHTML = `<h2>${dates[i]}</h2><p>High: ${highTemps[i].main?.temp.toFixed(0)}&deg;</p><p>Low: ${lowTemps[i].main?.temp.toFixed(0)}&deg;</p>`;
        weatherElt.append(newsection);
    }    
}

async function fetchForecast() {
    try {
        const response = await fetch(weatherURL);
        if (response.ok) {
            const data = await response.json();        
            showForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

fetchForecast();
