// search a city and change current weather conditions

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

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

  document.querySelector(".current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2 forecast-block">
              <h3>${formatHours(forecast.dt * 1000)}</h3>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"
                alt="Weather icon"
                id="icon"
              />
              <div class="weather-forecast-temperature">
                <strong>${Math.round(forecast.main.temp)}</strong>°C
              </div>
            </div>`;
  }
}

function search(city) {
  let apiKey = "82104c825dd2d93fbab3e7b5f1825f7a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherConditions);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar-input").value;
  search(city);
}

search("Glasgow");

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", handleSubmit);
