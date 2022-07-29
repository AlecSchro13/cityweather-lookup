var submitBtn = $("#searchBtn");
var searchCities = "";

var apiKey = "d899707429dae12637678613a5874634";
var cityName = "";
var forecastDiv = [$("#day1-div"), $("#day2-div"), $("#day3-div"), $("#day4-div"), $("#day5-div")];


submitBtn.click(function() {
    console.log("");
    searchCities = $("#cityLookup").val().trim();
    var previousCities = JSON.parse(localStorage.getItem("savedCities")) || []
    previousCities.push(searchCities)
    localStorage.setItem("savedCities", JSON.stringify(previousCities))
    getLocation(searchCities)
});

function getLocation(searchCities) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchCities + "&limit=1&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
            console.log(data);
              // Gets the lon and lat of the location
              var locationLat = data[0].lat;
              var locationLon = data[0].lon;
              cityName = data[0].name;
              // Convert from Int to Str
              var latString = locationLat.toString();
              var lonString = locationLon.toString();
              // Call function to get values
              getWeatherLocation(latString, lonString);
            });
        } else {
            alert("Location Not Found");
        }
    });

};


