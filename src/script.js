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
    var border = rootStyles.getPropertyValue("--hover");

    root.style.setProperty("--body", "#393939");
    root.style.setProperty("--text", "#fff");
    root.style.setProperty("--icons", "#777");
    root.style.setProperty("--border", "#181818");
    root.style.setProperty("--hover", "#ec6e4c");
  } else {
    var root = document.querySelector(":root");
    var rootStyles = getComputedStyle(root);
    var body = rootStyles.getPropertyValue("--body");
    var icons = rootStyles.getPropertyValue("--icons");
    var text = rootStyles.getPropertyValue("--text");
    var border = rootStyles.getPropertyValue("--border");
    var border = rootStyles.getPropertyValue("--hover");

    root.style.setProperty("--body", "#fff");
    root.style.setProperty("--text", "#EC6E4C");
    root.style.setProperty("--icons", "#49484a");
    root.style.setProperty("--border", "#fce8d5");
    root.style.setProperty("--hover", "#49484a");
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
    "Saturday",
  ];
  let days = daysOfTheWeek[currentTime.getDay()];
  return days;
}
weatherAppTime.innerHTML = timeFunc();
weatherAppDay.innerHTML = dayFunc();
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfTheWeek[day];
}
function futureForecast(response) {
  let forecast = response.data.daily;
  let futureForecast = document.querySelector("#future-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="future-weather">${formatDay(forecastDay.dt)}</div>
                <div class="future-weather-icon">
                  <img
                    class="forecast-image"
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt="icon"
                  />
                </div>
                <div class="future-temperature">
                  <span class="weather-forcast-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <strong>|</strong>
                  <span class="weather-forcast-min"> ${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  futureForecast.innerHTML = forecastHTML;
}

// Search Button
function showForecast(coordinates) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(futureForecast);
}

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

  let icon = response.data.weather[0].icon;
  let iconPic = document.querySelector("#current-weather-icon");
  iconPic.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  showForecast(response.data.coord);
}

function cityInput(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");
  let cityInp = document.querySelector("#city-input");
  search((cityName.innerHTML = cityInp.value));
}
function search(city) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCityTemprature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
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

search("lagos");
