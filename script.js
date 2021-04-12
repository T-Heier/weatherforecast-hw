var searchBtn = document.getElementById("buttonSearch")

searchBtn.onclick = function(){
    var cityName = document.getElementsByClassName("cityInput")[0].value
    
    fiveDay(cityName)
    getWeather(cityName)
}

function fiveDay(cityName) {

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key)
    .then(function(response) {
        return response.json()})
    .then(function (data) {
        createCards(data)
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

function appendData(data) {
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

function createCards(data) {
    console.log(data)
}






// for loop to look for specific time of day for 5 day forecast