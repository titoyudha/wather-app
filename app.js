const bodyParser = require('body-parser');
// const { query } = require('express');
const express = require('express');
const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/" , (req, res) => {
   
    const cityName = req.body.cityName
    const apiKey = "ff6f35114aeb33c10eac43a8164c60c8";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+ apiKey +"&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode); 

        response.on("data", function (data) {

            //parsing data into json
           const weatherData =  JSON.parse(data);
           const temp = weatherData.main.temp;
           //fetching json weather object , index 0 ,field description
           const weather = weatherData.weather[0].description
           //fetch icon uri from open weather then adding to client-side
           const icon = weatherData.weather[0].icon
           const imageURI = " http://openweathermap.org/img/wn/" + icon + "@2x.png"


           res.write("<h1>The temperature on " + cityName + " " + "is " + temp + " Degree Celcius"+ "</h1>");
           res.write("<p>The weather outside is " + weather +"</p>"); 
           res.write("<img src=" + imageURI + ">")
        });
    });
});

app.listen(8000, function () {
    console.log("Server is running on port 8000")
});

   