// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const apiKey = '4ae4a7e14072cdaa089d3848c195e1a7';

// DOM elements
const cityInput = document.getElementById('city-input');
const stateInput = document.getElementById('state-input');
const countryInput = document.getElementById('country-input');
const searchButton = document.getElementById('search-button');
const weatherCard = document.getElementById('weather-card');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const pressure = document.getElementById('pressure');
const tempMax = document.getElementById('temp-max');
const tempMin = document.getElementById('temp-min');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const forecast = document.getElementById('forecast');

// Search Weather Event Listener
searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    const state = stateInput.value;
    const country = countryInput.value;
    if (city && country) {
        const location = state ? `${city},${state},${country}` : `${city},${country}`;
        getWeatherData(location);
        get5DayForecast(location);
    }
});

async function getWeatherData(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeatherData(data);
        } else {
            console.error('Failed to fetch weather data');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}