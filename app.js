async function getWeather(cityName){
    try{
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=9bd366405cb2a087db1cbc2f66c0a8ef`, {mode: 'cors'});
    const weatherData = await response.json();
    const newData = processData(weatherData);
    console.log(newData);}
    catch(error){
        (console.log("error"))
    }
}

function processData(weatherData){
    const myData = {
        name: weatherData.name,
        country: weatherData.sys.country,
        temperature: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        wind: weatherData.wind,
    }
    return myData;
}

const cityInputEl = document.getElementById("cityInput");
const submitBtnEl = document.getElementById("submitInput");
const formEl = document.getElementById("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = cityInputEl.value;
    getWeather(cityName);
})

