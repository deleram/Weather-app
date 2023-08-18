function dateUpdate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let Day = days[day];
  return [`${Day}, ${hour}:${minute}`, day];
}

function updateData(response) {
  //city name
  let city = document.querySelector("h1#city");
  city.innerHTML = response.data.name;
  // tempreture
  let temp = Math.round(response.data.main.temp);
  let degree = document.querySelector(".main_degree");
  degree.innerHTML = `${temp}°`;
  C_degree = response.data.main.temp;
  // wind
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `wind : ${windSpeed} km/h`;
  // humidty
  let humidity = Math.round(response.data.main.humidity);
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `humidity : ${humidity} %`;
  // description
  let description = response.data.weather[0].description;
  let descript = document.querySelector("#description");
  descript.innerHTML = description;
  // date
  let dataFormated = dateUpdate(response.data.dt * 1000);
  let dateElement = document.querySelector("span#dateTime");
  dateElement.innerHTML = dataFormated[0];
  // icon
  let icon = response.data.weather[0].icon;
  weather_icon = {
    "01d": "fa-regular fa-sun",
    "02d": "fa-solid fa-cloud-sun",
    "03d": "fa-solid fa-cloud",
    "04d": "fa-solid fa-cloud",
    "09d": "fa-solid fa-cloud-rain",
    "10d": "fa-solid fa-cloud-sun-rain",
    "11d": "fa-solid fa-cloud-bolt",
    "13d": "fa-regular fa-snowflake",
    "50d": "fa-solid fa-smog",
    "01n": "fa-regular fa-sun",
    "02n": "fa-solid fa-cloud-sun",
    "03n": "fa-solid fa-cloud",
    "04n": "fa-solid fa-cloud",
    "09n": "fa-solid fa-cloud-rain",
    "10n": "fa-solid fa-cloud-sun-rain",
    "11n": "fa-solid fa-cloud-bolt",
    "13n": "fa-regular fa-snowflake",
    "50n": "fa-solid fa-smog",
  };

  let main_icon = document.querySelector(".main_icon i");
  main_icon.className = weather_icon[icon];
}

function Save_city(event) {
  event.preventDefault();
  let searched = document.querySelector("#inputPassword5");
  let enteredCity = searched.value;
  cityEnter(enteredCity);
}

function cityEnter(enteredCity) {
  let apiKey = "5c9688543e1981e4307feea878cc3a57";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&appid=${apiKey}&units=metric`;
  axios.get(url).then(updateData);
}

function F_degree_change(event) {
  event.preventDefault();
  let degreeF = document.querySelector("span.main_degree");
  degreeF.innerHTML = `${Math.round(C_degree * 1.8 + 32)}°`;
  F.classList.add("active");
  C.classList.remove("active");
}
function C_degree_change(event) {
  event.preventDefault();
  let degreeC = document.querySelector("span.main_degree");
  degreeC.innerHTML = `${Math.round(C_degree)}°`;
  C.classList.add("active");
  F.classList.remove("active");
}

let C_degree = null;

let city_search = document.querySelector("#city_search");
city_search.addEventListener("submit", Save_city);

cityEnter("tehran");

let C = document.querySelector(".centigrad");
C.addEventListener("click", C_degree_change);

let F = document.querySelector(".farenheit");
F.addEventListener("click", F_degree_change);
