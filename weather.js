// JavaScript code to fetch weather data from an API and display it on the website

const API_KEY = "6062600607f3888b715b05befc1cf899"; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('icon');
const weatherCardsElement = document.getElementById('weatherCards');

// Function to fetch current weather data
async function getCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === 200) {
    const location = `${data.name}, ${data.sys.country}`;
    const temperature = `${data.main.temp.toFixed(1)}°C`;
    const description = data.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    locationElement.textContent = location;
    temperatureElement.textContent = temperature;
    descriptionElement.textContent = description;
    iconElement.src = icon;
  } else {
    alert('Invalid city name');
  }
}

// Function to fetch hourly forecast data
async function getHourlyForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === 200) {
    const hourlyData = data.list.slice(1, 9); // Get hourly forecast for next 8 hours

    weatherCardsElement.innerHTML = ''; // Clear existing weather cards

    for (const hour of hourlyData) {
      const time = new Date(hour.dt * 1000).getHours();
      const temperature = `${hour.main.temp.toFixed(1)}°C`;
      const description = hour.weather[0].description;
      const icon = `http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;

      const weatherCardHTML = `
        <div class="weather-card">
          <h3>${time}:00</h3>
          <img src="${icon}" alt="${description}">
          <p>${temperature}</p>
          <p>${description}</p>
        </div>
      `;

      weatherCardsElement.innerHTML += weatherCardHTML;
    }
  } 
  else {
    alert('Invalid city name');
  }
}

// Search button event listener
searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getCurrentWeather(city);
    getHourlyForecast(city);
  }
});
