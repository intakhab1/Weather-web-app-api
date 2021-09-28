const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// make get request to external server node using popular Request module (but it shutdownd in 2020)
// we can use other external server node ex. Axion etc
// ḤERE WE use internal server node i.e https module of node

const https = require('https')

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

app.post('/', function(req , res){
// req.body.cityName;
// 1.fetching data from external server (API)
      const query = req.body.cityName;
      const apikey = 'e836297f92c10ceaf63d1ddf87fd4e7d';
      const units = 'metric'
      const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query  +'&appid=' + apikey +'&units=' +units ;

      https.get(url, function(response){
        console.log(response.statusCode);

//2. getting data in form of JSON

      response.on('data', function(data){

//3. passing data in js object (weatherData)

      const weatherData = JSON.parse(data)
      // console.log(weatherData)

// 4.now getting peice of data we want ex temp , description , windspeed

      const temp = weatherData.main.temp
      // console.log(temp)
      const weatherDescription = weatherData.weather[0].description
      // console.log(weatherDescription)
      const icon = weatherData.weather[0].icon
      const imageURL = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'

//5. Passing DAta back to our server i.e APP.get

      res.write('<p>current weather condition ' + weatherDescription+ '</p>');
      res.write('<h1>Temperature in '+ query +' ' + temp + ' degree celcious</h1>');
      res.write('<img src=' + imageURL + ' >');
       // CAN ONLY HAVE 1 RES.SEND SO USE RES.WRITE THNE RES.SEND
      res.send()

    });
  });
});

app.listen(3000, function(){
  console.log('server is running on port 3000');
});
