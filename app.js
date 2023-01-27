const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
const query = req.body.cityName;
const apiKey = "94557df19b4ddbc0e8f282d2c7e9ee3a";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
https.get(url, function(response){
   response.on("data", function(data){
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp
       const weatherDescription = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon
       const iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
       res.write("<h1>The tempreature in "+query+ " is " +temp+" degree celsius</h1>");
       res.write("<h4>The Weather is currently "+weatherDescription+"</h4>");
       res.write("<img src="+iconUrl+">");
       res.send();
   });
});
});



app.listen(process.env.PORT, function(){
    console.log("server has started");
});