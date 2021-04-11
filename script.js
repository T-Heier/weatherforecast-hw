var searchBtn = document.getElementById("buttonSearch")

searchBtn.onclick = function(){
    var cityName = document.getElementsByClassName("cityInput")[0].value
    console.log(cityName)
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key)
    .then(function(response) {
        return response.json()})
    .then(function (data) {
        console.log(data)
        var lat = data.coord.lat
        var lon = data.coord.lon
        fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${key}`)
        .then(function (response) {
            return response.json()})
        .then(function (data) {
            console.log(data)
        })
        // value = uv value
    })
    fiveDay(cityName)
}

function fiveDay(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key)
    .then(function(response) {
        return response.json()})
    .then(function (data) {
    console.log(data)
    })
}


// for loop to look for specific time of day for 5 day forecast