const startbtn = document.querySelector(".start");
const search = document.querySelector("#inputfield");
const searchicon = document.querySelector("#searchicon");
const desc = document.querySelector("#desc");
const temp = document.querySelector("#temp");
const cityN = document.querySelector("#City");
const wind = document.querySelector("#windspeed");
const humidity = document.querySelector("#humidityspeed");
const goHome = document.querySelector(".homebtn");
const icon = document.querySelector("#icon");
const mainBox1 = document.querySelector(".mainBox1");
const mainBox2 = document.querySelector(".mainBox2");
const mainBox3 = document.querySelector(".mainBox3");

startbtn.addEventListener("click", () => {
  mainBox1.classList.add("inactive");
  mainBox2.classList.remove("inactive");
});

function changeIcon(weatherMain) {
  let icons = {
    Clouds: "./images/cloud.jpg",
    Rain: "./images/rain.jpg",
    Haze: "./images/haze.jpg",
    Snow: "./images/snow.jpg",
    Mist: "./images/mist.png",
    Clear: "./images/clear.webp",
  };

  icon.src = icons[weatherMain] || "./images/sunimage.png";
}

const url = "https://api.openweathermap.org/data/2.5/weather?";

const apiKey = "a5f1e73b444624787961f9211521f200";

async function getWeatherData(city) {
  let finalUrl = `${url}q=${city}&appid=${apiKey}`;
  let weatherData = await fetch(finalUrl).then((res) => res.json());
  console.log(weatherData);
  if (weatherData.cod == 404) {
    mainBox2.classList.add("inactive");

    mainBox3.classList.remove("inactive");
  }

  desc.innerHTML = weatherData.weather[0].description;
  temp.innerHTML = Math.round(weatherData.main.temp - 273.15) + "°C";
  cityN.innerHTML = weatherData.name;
  wind.innerHTML = weatherData.wind.speed + "km/h";
  humidity.innerHTML = weatherData.main.humidity + "%";

  changeIcon(weatherData.weather[0].main);
}
searchicon.addEventListener("click", () => {
  getWeatherData(search.value);
});
search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeatherData(search.value);
  }
});

goHome.addEventListener("click", () => {
  mainBox3.classList.add("inactive");
  mainBox1.classList.remove("inactive");
});
