// variable specifiques au DOM
let villePays = document.getElementById("ville_pays");
let weather = document.getElementById("weatherMain");
let temperature = document.getElementById("temperature");
let temperatureMinMax = document.getElementById("temperatureMinMax");
let dateFormatVar = document.getElementById("dateFormat");
let bodyVar = document.body;

// creation de variables:
let tableDay = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

let tableMonth = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
let images = {
  Snow: `url("https://2.bp.blogspot.com/-Jz2U69LBGfc/WrOv1kX3M_I/AAAAAAAAApw/RsffMoaSvog3uN-u4ZOokNjA9Xms1mhzgCLcBGAs/s1600/flat-wallpaper-hd-5.jpg")`,
  Clouds: `url("https://i.pinimg.com/originals/d6/ae/14/d6ae147e644e4b22cf80cd12318ac656.png")`,
  Sunny: `url("https://images.hdqwalls.com/download/firewatch-10k-h8-1366x768.jpg")`,
  Night: `url("https://images.hdqwalls.com/download/firewatch-sd-1366x768.jpg")`,
};

var request = new XMLHttpRequest();
request.open(
  "GET",
  "http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=850d7e3aa67af68b14ffb480b2bd9280&units=metric"
);
request.send();
request.onload = getMeteo;
request.responseType = "json";

function getMeteo() {
  console.log(request.response);

  let ville = request.response.name;
  let country = request.response.sys.country;
  let weatherMain = request.response.weather[0].main;
  let temp = Math.round(request.response.main.temp);
  let temp_min = Math.round(request.response.main.temp_min);
  let temp_max = Math.round(request.response.main.temp_max);

  villePays.innerHTML = ville + ", " + country;
  dateFormatVar.innerHTML = dateFormat();
  temperature.innerHTML = temp + " °C";
  weather.innerHTML = weatherMain;
  temperatureMinMax.innerHTML = temp_min + " °C / " + temp_max + " °C";

  let date = new Date();
  let hours = date.getHours();

  if (hours <= 22 && hours >= 5) {
    if (weatherMain == "Clouds") {
      bodyVar.style.backgroundImage = images.Clouds;
    } else if (weatherMain == "Snow") {
      bodyVar.style.backgroundImage = images.Snow;
    } else {
      bodyVar.style.backgroundImage = images.Sunny;
    }
  } else {
    bodyVar.style.backgroundImage = images.Night;
  }
}

function dateFormat() {
  let date = new Date();
  return (
    tableDay[date.getDay()] +
    " " +
    date.getDate() +
    " " +
    tableMonth[date.getMonth()] +
    " " +
    date.getFullYear()
  );
}
