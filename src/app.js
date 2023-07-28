let currentDate = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let dayIndex = currentDate.getDay();
let minute = currentDate.getMinutes();
let hour = currentDate.getHours();
let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = `${days[dayIndex]}${hour}:${minute}`;

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  let apiKey = "bbbe124ec0oeac9atc1f0ad2a9f15a31";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  //debugger;
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

function searchLocation(position) {
  console.log(apiUrl);
  let apiKey = "bbbe124ec0oeac9atc1f0ad2a9f15a31";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentTemp = document.querySelector("#temperature");

let cLink = parseFloat(currentTemp.innerHTML);

function showCelsius() {
  currentTemp.innerHTML = cLink;
}
let celsiusTemp = document.querySelector("#cLink");
celsiusTemp.addEventListener("click", showCelsius);

function showFahrenheit() {
  let fLink = Math.round((cLink * 9) / 5 + 32);
  currentTemp.innerHTML = fLink;
}
let fahrenheitTemp = document.querySelector("#fLink");
fahrenheitTemp.addEventListener("click", showFahrenheit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

searchCity("Polokwane");
