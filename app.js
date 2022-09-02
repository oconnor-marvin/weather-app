window.onload = getWeather("London");

//get weather from API
async function getWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=9bd366405cb2a087db1cbc2f66c0a8ef`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    const newData = processData(weatherData);
    console.log(newData);
    displayData(newData);
  } catch (error) {
    console.log("error");
    alert("Invalid City");
  }
}

//turn data into object
function processData(weatherData) {
  const myData = {
    icon: weatherData.weather[0].main,
    description: weatherData.weather[0].description,
    name: weatherData.name,
    country: weatherData.sys.country,
    temperature: weatherData.main.temp,
    feelsLike: weatherData.main.feels_like,
    humidity: weatherData.main.humidity,
    wind: weatherData.wind.speed,
  };
  return myData;
}

//submit
const cityInputEl = document.getElementById("cityInput");
const formEl = document.getElementById("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityName = cityInputEl.value;
  getWeather(cityName);
});

//render data
function displayData(newData) {
  mainInfo(newData);
  icons(newData);
  temperature(newData);
  humidity(newData);
  windSpeed(newData);
}

function mainInfo(newData) {
  const conditions = document.getElementById("conditions");
  const location = document.getElementById("location");

  conditions.textContent = newData.description;
  location.textContent = `${newData.name}, ${newData.country}`;
}

function icons(newData) {
  const icon = document.getElementById("icon");
  if (newData.icon === "Clouds") {
    icon.innerHTML = '<i class="fa-solid fa-cloud"></i>';
  } else if (newData.icon === "Clear") {
    icon.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else if (newData.icon === "Snow") {
    icon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
  } else if (newData.icon === "Rain") {
    icon.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
  } else if (newData.icon === "Drizzle") {
    icon.innerHTML = '<i class="fa-solid fa-umbrella"></i>';
  } else {
    icon.innerHTML = '<i class="fa-solid fa-smog"></i>';
  }
}

function temperature(newData) {
  const temperature = document.getElementById("temperature");
  const feelsLike = document.getElementById("feelsLike");

  const celcius = Math.round(newData.temperature - 273.15);
  temperature.innerHTML = `${celcius}&deg;C`;

  const celciusFeelsLike = Math.round(newData.feelsLike - 273.15);
  feelsLike.innerHTML = `<i class="fa-solid fa-temperature-half"></i> feels like: ${celciusFeelsLike}&deg;C`;
}

function humidity(newData) {
  const humidity = document.getElementById("humidity");
  humidity.innerHTML = `<i class="fa-solid fa-water"></i> humidity: ${newData.humidity}%`;
}

function windSpeed(newData) {
  const windSpeed = document.getElementById("windSpeed");
  windSpeed.innerHTML = `<i class="fa-solid fa-wind"></i> wind speed: ${newData.wind}m/s`;
}
