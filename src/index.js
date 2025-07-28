import "./styles.css"

document.getElementById('weatherInputSubmit').addEventListener('click', (event) => {
    event.preventDefault();
    
    getForecast();
})

function getForecast() {
    let cityLocation = document.getElementById('cityInput').value;
    let stateLocation = document.getElementById('stateInput').value;
    let weatherLocation = cityLocation + ',' + stateLocation
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}?key=7AY5JHS42ZZMML6FHJ6N7YSJU`, {
        mode:'cors'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        let cityName = document.getElementById('cityName')
        console.log(response);
        cityName.textContent = response.address
        response.days.forEach((day,i) => {
            // Get needed data from promise object
            let dayForecast = {
                dailyDate: day.datetime,
                dailyDesc: day.description,
                dailyIcon: day.icon,
                dailyFeelslike: day.feelslike,
                dailyPrecipProb: day.precipprob,
                dailyTempMin: day.tempmin,
                dailyTempMax: day.tempmax,
                dailyWindspeed: day.windspeed
            }

            // page selectors 
            let weeklyForecast = document.getElementById('displayForecast');
            // create HTML elements for each day
            let dayCard = document.createElement('div');
            dayCard.id = i;
            dayCard.classList.add('dailyCard')
            dayCard.innerHTML = `
            <div class="date" id="date${i}">${dayForecast.dailyDate}</div>
            <div class="temps">
                <p class="temp" id="dailyLow${i}"><strong>Today's Low:</strong>  ${dayForecast.dailyTempMin}&deg;F</p>
                <p class="temp" id="feelsLike${i}"><strong>Feel's Like:</strong>  ${dayForecast.dailyFeelslike}&deg;F</p>
                <p class="temp" id="dailyHigh${i}"><strong>Today's High:</strong>  ${dayForecast.dailyTempMax}&deg;F</p>
            </div>
            <p class="desc" id="desc${i}">${dayForecast.dailyDesc}</p>
            <div class="externals" id="externals${i}">
                <p class="external" id="wind${i}"><strong>Current Wind Speed:</strong>  ${dayForecast.dailyWindspeed} mph</p>
                <p class="external" id="precip${i}"><strong>Precipitation Chance:</strong>  ${dayForecast.dailyPrecipProb}%</p>
            </div>
            
            `
            weeklyForecast.appendChild(dayCard)
        })
    })
    .catch(function(reject) {
        alert(reject);
    })
}
function resetData() {
    let weeklyForecast = document.getElementById('displayForecast');
    let citySelector = document.getElementById('citySelector')
    weeklyForecast.innerHTML = "";
    citySelector.reset();
}
// need to dynamically import icons for use in the project
    // https://github.com/visualcrossing/WeatherIcons/tree/main/SVG/1st%20Set%20-%20Color
// Use async and await in the function to fetch weather
// add catch statements

// change 14 day forecast function to only show range 1-14 in array
// create individual forecast card to show 0 in array - current day
