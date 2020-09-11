const fetch = require('node-fetch');
require('dotenv').config();

const getWeather = async(location, countryCode, query=undefind) => {
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location},${countryCode}&units=metric&appid=${process.env.APPID}`);
    let responseData = await data.json()
    if (query === "General Overview") {
        return{
            ...responseData.main,
            description:responseData.weather[0].description,
            name:responseData.name,
            country:responseData.sys.country
        } 
    }

    else if (query === "Wind Speed") {
        return{
            ...responseData.main,
            description:responseData.weather[0].description,
            name:responseData.name,
            country:responseData.sys.country,
            Speed:responseData.wind.speed
        } 
    }
    
    else if (query === "Sunrise") {
        let sunrise  = responseData.sys.sunrise
        let dateSunrise = new Date(sunrise * 1000)
        let sunriseResult = dateSunrise.toTimeString()
        return{
            ...responseData.main,
            description:responseData.weather[0].description,
            name:responseData.name,
            country:responseData.sys.country,
            sunrise:sunriseResult
        } 
    }
    else if (query === "Sunset") {
        let sunset = responseData.sys.sunset
        let dateSunset = new Date(sunset * 1000)
        let sunsetResult = dateSunset.toTimeString()
        return{
            ...responseData.main,
            name:responseData.name,
            description:responseData.weather[0].description,
            country:responseData.sys.country,
            sunset: sunsetResult
        } 

    }
}

module.exports = getWeather;

