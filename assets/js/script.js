const submitBtn = $("#searchBtn");
const searchCities = "";

var apiKey = "d899707429dae12637678613a5874634";
var cityName = "";
var forecastDiv = [$("#day1-div"), $("#day2-div"), $("#day3-div"), $("#day4-div"), $("#day5-div")];


submitBtn.click(function() {
    console.log("");
    searchCities = $("cityLookup").val().trim();
    var previousCities = JSON.parse(localStorage.getItem("savedCities")) || []
    previousCities.push(searchCities)
    localStorage.setItem("savedCities", JSON.stringify(previousCities))
    getLocation(searchCities)
});
