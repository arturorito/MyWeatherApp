

var citySearchHistory = JSON.parse(localStorage.getItem("citiesSearched"));
var cityname;
var queryCity
var queryURLUV;
var apikey = "&appid=27fa69b94fe4ce92a6e8393728f74817";
var latt;
var lonn;
var reverseCitySearchHistory;
var response = {};
var result = {};

if (citySearchHistory == undefined) {
    citySearchHistory = [];
}
loadHistory();

$(document).on('click', '.history', function(event) {

    event.preventDefault();
    console.log("history class clicked");
    cityname = $(this).attr("index-city");
    runSearch();
})  
$("button").on("click", function(event) {
    event.preventDefault();
    cityname = $("#citysearch").val().trim();
    runSearch();
});
function runSearch() {
    queryCity = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + apikey;
    $("#citySearchHistory").empty();
    $(".allweather").empty();
    for (var i=1; i<6; i++) {
        $("#div1" + i).remove();
    }
    console.log(queryCity);
    pullCityName();
}
function pullCityName() {
    $.ajax({
        url: queryCity,
        method: "GET"
    }).then(function(re) {
        console.log(re);
        var iconcode = re.weather[0].icon; 
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $("#welcome").text("Current City:").attr("class", "card-title text-left")
        $("#cityname").html(re.name + "<img src="+ iconurl +">");
        $("#temp").append("Temperature: " + (((re.main.temp - 273.15) * (9/5) ) + 32).toFixed(2) + " °F");
        $("#hum").append("Humidity: " + re.main.humidity + "%");
        $("#wind").append("Wind Speed: " + re.wind.speed + " MPH");
        latt = re.coord.lat;
        lonn = re.coord.lon;
        console.log(latt, lonn)
        queryURLUV =    "https://api.openweathermap.org/data/2.5/onecall?lat=" + latt + "&lon=" + lonn + apikey;
        console.log(citySearchHistory);
        console.log(re.name);
        citySearchHistory.push(re.name);
        localStorage.setItem("citiesSearched", JSON.stringify(citySearchHistory));
        citySearchHistory = JSON.parse(localStorage.getItem("citiesSearched"));
        loadHistory();  
        pullCityData();  
    })
}
function pullCityData() {
    $.ajax({
        url: queryURLUV,
        method: "GET"
    }).then(function(response) {
        console.log(queryURLUV);
        console.log(response);
        var d = new Date();
        var date = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
        $("#citydate").append(date);
        $("#uv").append("UV Levels: " + response.current.uvi)   
        for (var i=1; i < 6; i++) {
            var iconcode = response.daily[i].weather[0].icon; 
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";        
            var div1 = $("<div>").attr({"class": "col col-sm", "id": "div1"+i});
            $("#five-day-weather").append(div1);
            var div2 = $("<div>").attr({"class": "card text-white bg-primary mb-3", "style": "max-width: 18rem;", id: "div2"+i});
            $("#div1"+i).append(div2);
            var div3 = $("<div>").attr({"class": "card-body", id: "div3" +i })
            $("#div2"+i).append(div3);
            var otherDay = new Date(d);
            otherDay.setDate(d.getDate() + i);
            var h3 = $("<h5>").attr("class", "card-title").html("<h6>"+ (otherDay.getMonth()+1) + "/" + otherDay.getDate() + "/" + otherDay.getFullYear() + "<img src="+ iconurl +">"+ "</h6>")
            var pCard = $("<p>").attr("card-text")
            var br1 = $("<br>");
            var pTemp = $("<p>").html("Temp: "+ (((response.daily[i].temp.day - 273.15) * (9/5) ) + 32).toFixed(2) + " °F")
            var pHumidity = $("<p>").html("Humidity: "+ response.daily[i].humidity +" %")
            var mainDayData = [
                h3,
                pCard,
                br1,
                pTemp,
                br1,
                pHumidity,
                br1
            ]
            $("#div3"+i).append(mainDayData);
        }
    });
};
function loadHistory() {
    for (var i = 0; i < citySearchHistory.length; i++) {
        citySearchHistory = (JSON.parse(localStorage.getItem("citiesSearched")));
        reverseCitySearchHistory = citySearchHistory.reverse();   
        var addCities = $("<li>").html(reverseCitySearchHistory[i]).attr({"class": "history list-group-item", "index-city": reverseCitySearchHistory[i]});
        $("#citySearchHistory").append(addCities);
        citySearchHistory = reverseCitySearchHistory.reverse();
    }
}