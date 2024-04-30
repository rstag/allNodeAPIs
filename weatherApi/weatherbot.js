const express = require('express');
// var bodyParser = require('body-parser');

const routers = express.Router();

let userLocation={}
let weatherHourly ={}
let weatherDaily={}
const fetchOptions={
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.XRapidAPIKey || "d440c309famsh260a9639803fadep103d24jsn46366a82b1af",
      "X-RapidAPI-Host": process.env.XRapidAPIHost ||"weatherbit-v1-mashape.p.rapidapi.com",
    },
  }

routers.get('/', (req, res) => {
    console.log("weather")
    res.send("Weather Home")
});



routers.get('/getHourly', async (req, res) => {
  let lat = req.query.lat || 40.72
  let lon = req.query.lon || -74.56
  let ref = req.query.ref || false
    console.log(ref)
    
    let r= await checkWeatherHourly(lat,lon,ref)
    // console.log(r)
  res.send(weatherHourly)
})

routers.get('/getDaily', async (req, res) => {
    let lat = req.query.lat || 40.72
    let lon = req.query.lon || -74.56
  let ref = req.query.ref || false

    console.log(ref)
    let r= await checkWeatherDaily(lat,lon,ref)
    // console.log(r)
  res.send(weatherDaily)
})

routers.post('/search', async (req, res) => {
    let reqData=req.body
    console.log(reqData)
//   res.send(r)
})

async function run() {
    console.log("Async call")
    return 0
}

const checkWeatherHourly = async (lat,lon,ref) => {
  if(isObjectEmpty(weatherHourly) || ref=='true'){
    console.log("Calling API weatherHourly")
    let url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lat=${lat}&&lon=${lon}`;
    await fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        weatherHourly=data
        return weatherHourly;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  console.log("from object weatherHourly")
  return weatherHourly;
  };

  const checkWeatherDaily = async (lat,lon,ref) => {
    
    if(isObjectEmpty(weatherDaily) || ref=='true'){
      console.log("Calling API weatherDaily")
    let url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=${lat}&&lon=${lon}`;
    await fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        weatherDaily=data
        return weatherDaily;
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
    console.log("from object weatherDaily")
    return weatherDaily;
  };

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
  }

module.exports = routers;