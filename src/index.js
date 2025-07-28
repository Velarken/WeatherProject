import "./styles.css"

document.getElementById('weatherInputSubmit').addEventListener('click', (event) => {
    event.preventDefault()
    getForecast()
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
        response.days.forEach((day,i) => {
            // Get needed data from promise object
            let dailyDate = day.datetime;
            let dailyDesc = day.description;
            let dailyIcon = day.icon;
            let dailyFeelslike = day.feelslike;
            let dailyPrecipProb = day.precipprob;
            let dailyTempMin = day.tempmin;
            let dailyTempMax = day.tempmax;
            let dailyWindspeed = day.windspeed;

            // page selectors 
            let weeklyForecast = document.getElementById('displayForecast');
            // create HTML elements for each day
            let dayCard = document.createElement('div');
            dayCard.id = i;
            dayCard.classList.add('dailyCard')
            dayCard.innerHTML = `
            <div class="date" id="date${i}">${dailyDate}</div>
            <img src="${dailyIcon}" alt="Weather icon for today's forecast">
            <div class="temps">
                <p class="temp" id="dailyLow${i}">${dailyTempMin}</p>
                <p class="temp" id="feelsLike${i}">${dailyFeelslike}</p>
                <p class="temp" id="dailyHigh${i}">${dailyTempMax}</p>
            </div>
            <p class="desc" id="desc${i}">${dailyDesc}</p>
            <div class="externals" id="externals${i}">
                <p class="external" id="wind${i}">${dailyWindspeed}</p>
                <p class="external" id="precip${i}">${dailyPrecipProb}</p>
            </div>
            
            `
            weeklyForecast.appendChild(dayCard)
        })
    })
}
// need to dynamically import icons for use in the project
    // https://github.com/visualcrossing/WeatherIcons/tree/main/SVG/1st%20Set%20-%20Color
// Use async and await in the function to fetch weather
// add catch statements
// move wanted data to a NEW object
    // access data from here