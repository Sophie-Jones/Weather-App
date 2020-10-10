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

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(".cloud-cover").innerHTML = `Cloud cover: ${Math.round(
    response.data.clouds.all
  )}%`;

  document.querySelector(".humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;

  document.querySelector(".wind-speed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  document.querySelector(".short-text-weather-description").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "82104c825dd2d93fbab3e7b5f1825f7a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-bar-input").value;
  search(city);
}

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", handleSubmit);
