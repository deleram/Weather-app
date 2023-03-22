function updateData(response) {
  // tempreture
  let temp = Math.round(response.data.main.temp);
  let degree = document.querySelector(".main_degree");
  degree.innerHTML = temp;
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
}

function cityEnter(event) {
  let apiKey = "5c9688543e1981e4307feea878cc3a57";
  event.preventDefault();
  let searched = document.querySelector("#inputPassword5");
  let enteredCity = searched.value;
  let city = document.querySelector("h1#city");
  city.innerHTML = enteredCity;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&appid=${apiKey}&units=metric`;
  axios.get(url).then(updateData);
}

let city_search = document.querySelector("#city_search");
city_search.addEventListener("submit", cityEnter);

function dateUpdate(date) {
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

  return `${Day}, ${hour}:${minute}`;
}

let currentTime = new Date();
let nowDate = document.querySelector("span#dateTime");
nowDate.innerHTML = dateUpdate(currentTime);

let C = document.querySelector("#centigrad");
C.addEventListener("click", function (event) {
  event.preventDefault();
  let degreeC = document.querySelector("span.main_degree");
  degreeC.innerHTML = "10° ";
});

let F = document.querySelector("#farenheit");
F.addEventListener("click", function (event) {
  event.preventDefault();
  let degreeF = document.querySelector("span.main_degree");
  degreeF.innerHTML = "50° ";
});
