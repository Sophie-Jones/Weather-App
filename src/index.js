// show current date and time

let currentTime = new Date();

let h1 = document.querySelector("h1 .current-date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();

h1.innerHTML = `${day} ${hour}:${minutes}`;

// search a city and change current weather conditions

function showWeatherConditions(response) {
  document.querySelector(".current-city").innerHTML = response.data.name;

  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureMessage = `${currentTemperature}`;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temperatureMessage;

  let currentHumidity = Math.round(response.data.main.humidity);
  let humidityMessage = `Humidity: ${currentHumidity}%`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = humidityMessage;

  let currentWindSpeed = Math.round(response.data.wind.speed);
  let windspeedMessage = `Wind: ${currentWindSpeed} km/h`;
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = windspeedMessage;

  let shortDescription = response.data.weather[0].description;
  let descriptionMessage = `${shortDescription}`;

  let weatherDescription = document.querySelector(
    ".short-text-weather-description"
  );
  weatherDescription.innerHTML = descriptionMessage;
}

function search(city) {
  let apiKey = "82104c825dd2d93fbab3e7b5f1825f7a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-bar-input").value;
  search(city);
}

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", handleSubmit);
