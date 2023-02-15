//Toggle btn
const chk = document.getElementById("chk");
chk.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    var root = document.querySelector(":root");
    var rootStyles = getComputedStyle(root);
    var body = rootStyles.getPropertyValue("--body");
    var icons = rootStyles.getPropertyValue("--icons");
    var text = rootStyles.getPropertyValue("--text");
    var border = rootStyles.getPropertyValue("--border");

    root.style.setProperty("--body", "#393939");
    root.style.setProperty("--text", "#fff");
    root.style.setProperty("--icons", "#777");
    root.style.setProperty("--border", "#181818");
  } else {
    var root = document.querySelector(":root");
    var rootStyles = getComputedStyle(root);
    var body = rootStyles.getPropertyValue("--body");
    var icons = rootStyles.getPropertyValue("--icons");
    var text = rootStyles.getPropertyValue("--text");
    var border = rootStyles.getPropertyValue("--border");

    root.style.setProperty("--body", "#fff");
    root.style.setProperty("--text", "#003459");
    root.style.setProperty("--icons", "#007ea7");
    root.style.setProperty("--border", "#e5ebef");
  }
});

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
  celcuisTemprature = response.data.main.temp;
  let temp = Math.round(celcuisTemprature);
  let tempNumb = document.querySelector("div.current-temperature");
  tempNumb.innerHTML = `${temp}°`;
  let wind = Math.round(response.data.wind.speed);
  let windNumb = document.querySelector("div.wind");
  windNumb.innerHTML = `Wind: ${wind} Km/H`;
  let description = response.data.weather[0].description;
  let descriptionNumb = document.querySelector("div.current-weather");
  descriptionNumb.innerHTML = description;
  let humidity = response.data.main.humidity;
  let humidityNumb = document.querySelector("div.humidity");
  humidityNumb.innerHTML = `Humidity: ${humidity}%`;
  lowestTemperatureConversion = response.data.main.temp_min;
  let lowestTemperature = Math.round(lowestTemperatureConversion);
  let lowestTemperatureNumb = document.querySelector("div.lowest-temperature");
  lowestTemperatureNumb.innerHTML = `${lowestTemperature}°`;
  highestTemperatureConversion = response.data.main.temp_max;
  let highestTemperature = Math.round(highestTemperatureConversion);
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
  celcuisTemprature = response.data.main.temp;

  let temp = Math.round(celcuisTemprature);
  let h1 = document.querySelector("div.current-temperature");
  h1.innerHTML = `${temp}°`;
  let wind = Math.round(response.data.wind.speed);
  let windNumb = document.querySelector("div.wind");
  windNumb.innerHTML = `Wind: ${wind} Km/H`;
  let description = response.data.weather[0].description;
  let descriptionNumb = document.querySelector("div.current-weather");
  descriptionNumb.innerHTML = description;
  let humidity = response.data.main.humidity;
  let humidityNumb = document.querySelector("div.humidity");
  humidityNumb.innerHTML = `Humidity: ${humidity}%`;
  lowestTemperatureConversion = response.data.main.temp_min;
  let lowestTemperature = Math.round(lowestTemperatureConversion);
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

// Temprature conversion
let celcuisTemprature = null;
let lowestTemperatureConversion = null;
let highestTemperatureConversion = null;

let celcuis = document.querySelector("#cel");
let fahrenheit = document.querySelector("#fer");

function celBtn(event) {
  event.preventDefault();
  let lowestTemperature = Math.round(lowestTemperatureConversion);
  let lowestTemperatureNumb = document.querySelector("div.lowest-temperature");
  lowestTemperatureNumb.innerHTML = `${lowestTemperature}°`;

  let highestTemperature = Math.round(highestTemperatureConversion);
  let highestTemperatureNumb = document.querySelector(
    "div.highest-temperature"
  );
  highestTemperatureNumb.innerHTML = `${highestTemperature}°`;
  let currentTemp = document.querySelector("div.current-temperature");
  let unit = document.querySelector("#unit");
  currentTemp.innerHTML = Math.round(celcuisTemprature) + "°";
  unit.innerHTML = "Celsius";
}
celcuis.addEventListener("click", celBtn);

function ferBtn(event) {
  event.preventDefault();
  let lowestTemperatureNumb = document.querySelector("div.lowest-temperature");
  let lowestTemperature = Math.round(lowestTemperatureConversion * 1.8 + 32);
  lowestTemperatureNumb.innerHTML = `${lowestTemperature}°`;
  let highestTemperature = Math.round(highestTemperatureConversion * 1.8 + 32);
  let highestTemperatureNumb = document.querySelector(
    "div.highest-temperature"
  );
  highestTemperatureNumb.innerHTML = `${highestTemperature}°`;
  let currentTemp = document.querySelector("div.current-temperature");
  let unit = document.querySelector("#unit");
  currentTemp.innerHTML = Math.round(celcuisTemprature * 1.8 + 32) + "°";
  unit.innerHTML = "Fahrenheit";
}
fahrenheit.addEventListener("click", ferBtn);
