function currentDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day},    ${hours}:${minutes}`;
}
function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#new-city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity-new").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-new").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function searchCity(city) {
  let unit = "imperial";
  let apiKey = "31062848022c12a9b5c54447286aa8b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let unit = "imperial";
  let apiKey = "31062848022c12a9b5c54447286aa8b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

let currentDateElement = document.querySelector("#date");
let currentTime = new Date();
currentDateElement.innerHTML = currentDate(currentTime);

let city = document.querySelector("#search-form");
city.addEventListener("submit", searchInput);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Paris");
