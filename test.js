"use strict"

const apiKey = "";


const formEl = document.querySelector("form");
const cityInputEl = document.getElementById("cityInput");
const weatherDataEl = document.getElementById("weatherData");


formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeather(cityValue);
});

async function getWeather(cityValue) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
    if (!response) {
      throw new Error("Netwrok is not working !");
    }
    const data = await response.json();

    console.log(data);

    const temperature = data.main.temp;
    const description = data.weather[0].description;
    // const humidity = data.main.humidity;
    // const feels_like = data.main.feels_like;
    // const wind = data.wind.speed;
    const details = [
      `Feels like : ${Math.round(data.main.feels_like)}`,
      `Humidity : ${data.main.humidity}`,
      `Wind Speed : ${data.wind.speed}`,
    ]
    const icon = data.weather[0].icon;


    weatherDataEl.querySelector('.icon').innerHTML =
      `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`;
    weatherDataEl.querySelector('.temperature').textContent = `${temperature}°C`;

    weatherDataEl.querySelector('.description').textContent = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details.map(details =>
      `<div>${details}</div>`).join('');


  } catch (err) {

  }
}




