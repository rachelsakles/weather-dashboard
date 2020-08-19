
//HTML variables
//const input = document.getElementById("city-input");
let search = document.getElementById("search-button");
//const clear = document.getElementById("clear-history");
//const temp = document.getElementById("temperature");
//const humidity = document.getElementById("humidity");
//const wind = document.getElementById("wind-speed");
//const uv = document.getElementById("UV-index");
//const history = document.getElementById("history");
//const cityName = document.getElementById("city-name"); 
let APIKey = "6b46cc3d569c821c8b56b2b6152697d7"; 
let city = $("city-input").val(); 
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey; 
let cities = [];  

$(search).on("click", function (e) { 
    e.preventDefault(); 
    let city = $("city-input").val(); 
    cities.push(city) 
    getWeather(city); 
    console.log("click"); 
    console.log(queryURL);


})


function getWeather (city) {
    console.log(queryURL);
    // Run ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }) 
    .then(function (response) {  
        console.log(queryURL) 
        console.log(response);
    
    }) 
    $


}