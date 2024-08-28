function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#weather-humidity");
  let windElement = document.querySelector("#wind-condition");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#weather-icon");


  timeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let days = [
     "Sunday",
     "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  if(minutes<10){
    minutes = `0${minutes}`
  }

  return `${day} ${hour}:${minutes}`
}

function searchCity(city) {
  let apiKey = "2f43379oac5f7ffe8tde5aff442f0cdb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timeStamp){
  let date = new Date(timeStamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];

  return days[date.getDay()];

}
function getForecast(city){
  let apiKey = "2f43379oac5f7ffe8tde5aff442f0cdb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response){
  
  
 
  let forecastHtml = "";

  response.data.daily.forEach(function(day, index){
    if (index < 5){
 forecastHtml =
   forecastHtml +
   `
  <div class="weather-forecast-day"> 
<div class="weather-forecast-date"> ${formatDay(day.time)} </div>
<div >  <img src = ${day.condition.icon_url} class="weather-forecast-icon" />
</div>
<div class="weather-forecast-temperatures"> 
    <div class="weather-forecast-temperature"><strong>${Math.round(
      day.temperature.maximum
    )}°C </strong> </div>
    <div class="weather-forecast-temperature">${Math.round(
      day.temperature.minimum
    )}°C </div>
</div>
</div>
  `;
}
  });
 let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML=forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

searchCity("London");
//displayForecast();
