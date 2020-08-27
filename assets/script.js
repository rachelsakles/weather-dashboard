
//HTML variables
//const input = document.getElementById("city-input");
//var searchBtn = document.getElementById("search-button");
//const clear = document.getElementById("clear-history");
//const temp = document.getElementById("temperature");
//const humidity = document.getElementById("humidity");
//const wind = document.getElementById("wind-speed");
//const uv = document.getElementById("UV-index");
//const history = document.getElementById("history");
//const cityName = document.getElementById("city-name"); 
//let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=tucson" + "&appid=6b46cc3d569c821c8b56b2b6152697d7";
//let searchTerm = ""; 

//var cities = []
//var searchValue = "Scottsdale"
//var searchURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=6b46cc3d569c821c8b56b2b6152697d7&units=imperial"
//pageLoad();
// Create function that saves and appends search history
function searchHistory(searchValue) {
    var listElement = document.createElement("li");
    listElement.classList.add("list-group-item");
    listElement.textContent = searchValue; 
    historyElement = $("#history");
    $(historyElement).on("click", function () {
        if (event.target.tagName == "LI") {
            searchWeather(event.target.textContent);
           

        }
    })

    historyElement.append(listElement)
}

$(document).ready(function () {
    $("#search-button").on("click", function (e) {
        e.preventDefault();
        var searchValue = $("#city-input").val();
        //clear input box 
        //$("#search-value").val(" "); 
        $(searchValue).val(" ");
        $("#city-input").val(" ");
        searchWeather(searchValue);
        searchHistory(searchValue);   
        

        //pageLoad();


    })
})
// // function pageLoad() {
// //     var storedCities = JSON.parse(localStorage.getItem("cities"));
// //     if (storedCities !== null) {
// //         cities = storedCities;
// //         index = storedCities.length - 1
// //         city = storedCities[index]
// //     }

// }

// Retrieve data from local storage 


// Grab data from search weather
function searchWeather(searchValue) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=6b46cc3d569c821c8b56b2b6152697d7&units=imperial",
        method: "GET"
    })
        .then(function (response) {
            //getSearch(response)
            console.log(response);
            var date = moment.unix(response.dt).format("MM/DD/YYYY");
            var city = response.name;
            var temperature = response.main.temp;
            var humidity = response.main.humidity;
            var iconID = response.weather[0].icon // icon ID
            var $icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png") // icon
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var windSpeed = response.wind.speed;
            getUvIndex(lat, lon);
            getFiveDay(searchValue);

            //console.log("City: " + city + "Temperature: " + temperature + " °F " + "Humidity: " + humidity + "% " + "Wind-Speed: " + windSpeed + " MPH "); 
            // display data on page 
            $("#city-name").text(city + " " + date).append($icon);
            $("#temperature").text("Temperature: " + temperature + " °F ");
            $("#humidity").text("Humidity: " + humidity + " % ");
            $("#wind-speed").text("Wind Speed: " + windSpeed + " MPH ");

            //Local Storage
            //localStorage.setItem(searchValue, response)
        })



}
// Grab UV data
function getUvIndex(lat, lon) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=6b46cc3d569c821c8b56b2b6152697d7" + "&lat=" + lat + "&lon=" + lon,
        method: "GET"
    }).then(function (response) {
        var UVindex = response.value
        //console.log(UVindex); 
        //$("#UV-index").text( "UVindex: ") 
        // Change color of uv index based on its value
        //$("#UV-index")
        $('#UV-index').text("UV Index: ").append(`<span id="uv">${UVindex}</span>`).appendTo("#UVI")
        if (UVindex <= 2) {
            $("#uv").attr("class", "uv-low")
        } else if (UVindex <= 5) {
            $("#uv").attr("class", "uv-mod")
        } else if (UVindex <= 7) {
            $("#uv").attr("class", "uv-high")
        } else if (UVindex <= 10) {
            $("#uv").attr("class", "uv-veryhigh")
        } else if (UVindex > 10) {
            $("#uv").attr("class", "uv-extreme")
        }
        return UVindex;

    })


}

// Grab 5 day forecast  

function getFiveDay(searchValue) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=6b46cc3d569c821c8b56b2b6152697d7&units=imperial",
        method: "GET"
    }).then(function (response) {
        var five = response.list;
        //console.log(five);
        for (var i = 4; i < five.length; i = i + 8) { 
            // Creating a div
            var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
            // Store the responses of the date, temp, and humidity 
            var dayIndex = five[i];
            var fiveDate = five[i].dt_txt;
            var fiveTemp = five[i].main.temp;
            var fiveHumidity = five[i].main.humidity;

            // Create card  
            var fdDate = moment.unix(dayIndex.dt).format("MM/DD/YYYY");
            var h5date = $("<h5 class='card-title'>").text(fdDate);
            var pTemp = $("<p class='card-text'>").text("Temp: " + fiveTemp + " °F ");
            var pHum = $("<p class='card-text'>").text("Humidity " + fiveHumidity + " % "); 
            var fdIconID = dayIndex.weather[0].icon; 
            var $fdIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+fdIconID+"@2x.png");  $fdIcon.attr("style", "height: 40px; width: 40px");
            //$('#5-day').append(h5date).append(pTemp).append(pHum)  
            fiveDayDiv.append(h5date, $fdIcon , pTemp, pHum ); 
            $("#5-day").append(fiveDayDiv); 
            
           
        }
    })
}

// Store saved cities in history 
// Clear history 

