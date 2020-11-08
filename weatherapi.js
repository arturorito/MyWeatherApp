/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
$("button").on("click", function() {

    // queryURL is the url we'll use to query the API
    var apikey = "&appid=27fa69b94fe4ce92a6e8393728f74817";
    var apikey5 = "&appid=dfdf94c00f064f5842902b0d4e4da549";

    var cityname = $("#citysearch").val().trim();

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + apikey;
    var queryURL5 ="http://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityname + "&cnt=5" +apikey5;


console.log(cityname)

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        console.log(queryURL);

        console.log(response);

        var results = response;
        var d = new Date();
        var date = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
        var iconurl = "http://openweathermap.org/img/w/" + results.weather[0].icon + ".png";
        var iconcode = results.weather[0].icon;
        console.log(iconcode);
        console.log(iconurl);
        
        $('#wicon').attr('src', iconurl);
        $(".allweather").empty();
        $("#cityname").append(results.name);
        $("#citydate").append(date);
        $("#temp").append("Temperature: " + (((results.main.temp - 273.15) * (9/5) ) + 32).toFixed(2) + " Fahrenheit");
        $("#hum").append("Humidity: " + results.main.humidity + "%");
        $("#wind").append("Wind Speed " + results.wind.speed + " MPH");
        $("#uv").append();

        })

    $.ajax({
        url: queryURL5,
        method: "GET"
    })

    .then(function(response5) {
        console.log(queryURL5);

        console.log(response5);
    })
});