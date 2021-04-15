var searchBtn = document.getElementById("buttonSearch")

var key = "b82055c3c49f1d8771873add039c1767"

searchBtn.onclick = function(){
    var cityName = document.getElementsByClassName("cityInput")[0].value
    
    getWeather(cityName)
    fiveDay(cityName)
}

function appendLocal() {
    localStorage.getItem('forecastInfo', JSON.parse(forecastInfo))
    createCards(forecastInfo);
}

// appendLocal(forecastInfo);

function fiveDay(cityName) {

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key)
    .then(function(response) {
        return response.json()})
    .then(function (data) {
        cardInfo(data)
    })
}

function getWeather(cityName) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key)
    .then(function(response) {
        return response.json()})
    .then(function (data) {
        appendData(data)
        var lat = data.coord.lat
        var lon = data.coord.lon
        fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${key}`)
        .then(function (response) {
            return response.json()})
        .then(function (data) {
            UV(data)
        })
    })
}
// this is where my data should append to
const cityName = document.getElementsByClassName("cityName")
const cityInfo = document.getElementsByClassName("cityWeather")

// this creates all the current weather data
function appendData(data) {
    if (cityInfo.childNodes > 0) {
        cityInfo.removeChild()
    }
    let createH1 = document.createElement("h1")
    let cityWeather = [data.main.temp, data.main.humidity, data.wind.speed, data.name]
    var createLi;
    cityName[0].appendChild(createH1)
    createH1.textContent = cityWeather[3]

    for (i = 0; i < cityWeather.length - 1; i++ ) {
        createLi = document.createElement("li")
        createLi.textContent = cityWeather[i]
        cityInfo[0].appendChild(createLi);
    }
    cityInfo[0].appendChild(createLi)
}

function UV(data) {
    console.log(data.value)
    var createLi;
    createLi = document.createElement("li")
    createLi.textContent = data.value
    cityInfo[0].appendChild(createLi);
}

// this gets the selected days i want for my forecast infomation
function cardInfo(data) {
    var forecastInfo = []
    var fiveDayArr = data.list
    fiveDayArr.forEach(dateCheck);
    function dateCheck(dates) {
        if (dates.dt_txt.includes("09:00:00")) {
            forecastInfo.push(dates)
        }
    }
    localStorage.setItem('forecastInfo', JSON.stringify(forecastInfo));
    createCards(forecastInfo);
}


const cards = document.getElementById("5DayForecast")
// this gets the data for the card information
function createCards(forecastInfo) {
    var foreData = []
    var createLi;
    var createUl;
    for (i = 0; i < forecastInfo.length; i++) {
        foreData.push(forecastInfo[i].dt_txt)
        foreData.push(forecastInfo[i].main.temp)
        foreData.push(forecastInfo[i].main.humidity)
        foreData.push(forecastInfo[i].wind.speed)
    }
    for (j = 0; j < foreData.length; j+=4) {
        createUl = document.createElement('ul')
        cards.appendChild(createUl)
        for (k = 0; k < 4; k++) {
            createLi = document.createElement("li")
            createLi.textContent = foreData[j+k]
            createUl.appendChild(createLi)
        }

    }

}






// for loop to look for specific time of day for 5 day forecast