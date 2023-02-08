//Time
let weatherAppTime = document.querySelector("div.current-time");
let weatherAppDay = document.querySelector("div.day");

function timeFunc() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let min = currentTime.getMinutes();
  min = min < 10 ? "0" + min : min;
  let acctualTime = `${hours}:${min}`;
  return acctualTime;
}

//Day
function dayFunc() {
  let currentTime = new Date();
  let daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let days = daysOfTheWeek[currentTime.getDay()];
  return days;
}
weatherAppTime.innerHTML = timeFunc();
weatherAppDay.innerHTML = dayFunc();

// Search Button
function weatherCity(position) {}

function getCityTemprature(response) {
  let temp = Math.round(response.data.main.temp);
  let tempNumb = document.querySelector("div.current-temperature");
  tempNumb.innerHTML = `${temp}°`;
  let wind = Math.round(response.data.wind.speed);
  let windNumb = document.querySelector("div.wind");
  windNumb.innerHTML = `Wind: ${wind} m/s`;
  let description = response.data.weather[0].description;
  let descriptionNumb = document.querySelector("div.current-weather");
  descriptionNumb.innerHTML = description;
  let humidity = response.data.main.humidity;
  let humidityNumb = document.querySelector("div.humidity");
  humidityNumb.innerHTML = `Humidity: ${humidity}%`;
  let lowestTemperature = Math.round(response.data.main.temp_min);
  let lowestTemperatureNumb = document.querySelector("div.lowest-temperature");
  lowestTemperatureNumb.innerHTML = `${lowestTemperature}°`;
  let highestTemperature = Math.round(response.data.main.temp_max);
  let highestTemperatureNumb = document.querySelector(
    "div.highest-temperature"
  );
  highestTemperatureNumb.innerHTML = `${highestTemperature}°`;
}

function cityInput(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");
  let cityInp = document.querySelector("#city-input");
  let cityy = (cityName.innerHTML = cityInp.value);
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityy}&units=metric&appid=04abef462527db55ccb51e4f11eee73d`;

  axios.get(api).then(getCityTemprature);
}

let searchBtn = document.querySelector(".search-form");
searchBtn.addEventListener("submit", cityInput);

function currentLocInput(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getLocation);
}
function getTemprature(response) {
  let city = response.data.name;
  let tempNumb = document.querySelector("#city");
  tempNumb.innerHTML = `${city}`;
  let temp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("div.current-temperature");
  h1.innerHTML = `${temp}°`;
  let wind = Math.round(response.data.wind.speed);
  let windNumb = document.querySelector("div.wind");
  windNumb.innerHTML = `Wind: ${wind} m/s`;
  let description = response.data.weather[0].description;
  let descriptionNumb = document.querySelector("div.current-weather");
  descriptionNumb.innerHTML = description;
  let humidity = response.data.main.humidity;
  let humidityNumb = document.querySelector("div.humidity");
  humidityNumb.innerHTML = `Humidity: ${humidity}%`;
  let lowestTemperature = Math.round(response.data.main.temp_min);
  let lowestTemperatureNumb = document.querySelector("div.lowest-temperature");
  lowestTemperatureNumb.innerHTML = `${lowestTemperature}°`;
  let highestTemperature = Math.round(response.data.main.temp_max);
  let highestTemperatureNumb = document.querySelector(
    "div.highest-temperature"
  );
  highestTemperatureNumb.innerHTML = `${highestTemperature}°`;
}
function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=04abef462527db55ccb51e4f11eee73d`;
  axios.get(api).then(getTemprature);
}

let currentLocBtn = document.querySelector(".currentlocation-btn");
currentLocBtn.addEventListener("click", currentLocInput);
