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

function getWeatherLocation(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
            console.log(data);
            var todaysCity = $("#currentCity");
            todaysCity.text(cityName);
            var todaysTemp = $("#currentTemp");
            todaysTemp.text(data.current.temp);
            var todaysWind = $("#currentWind");
            todaysWind.text(data.current.wind_speed);
            var todaysUV = $("#currentUV");
            todaysUV.text(data.current.uvi);
            var todaysHumidity = $("#currentHumidity");
            todaysHumidity.text(data.current.humidity)

            for(var i = 0; i < forecastDiv.length; i++) {
                forecastDiv[i].find("#temp").text(data.daily[i + 1].temp.day)
                forecastDiv[i].find("#wind").text(data.daily[i + 1].wind_speed)
                forecastDiv[i].find("#UV").text(data.daily[i + 1].uvi)
                forecastDiv[i].find("#humidity").text(data.daily[i + 1].humidity)
            }
            });
        }
    });

};


