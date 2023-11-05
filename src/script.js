// Import modules
import fetchWeatherData from '../components/weatherData.js';
import getBackgroundImage from '../components/backgroundImage.js'
import fetch5DayWeatherForecast from "../components/weatherForecast.js";
import { display5DayForecast } from '../components/weatherForecasts/displayForecast.js'
import {
    cityInput,
    stateInput,
    countryInput,
    searchButton,
    weatherCard,
    cityName,
    weatherDescription,
    weatherIcon,
    temperature,
    feelsLike,
    pressure,
    tempMax,
    tempMin,
    sunrise,
    sunset,
    forecast,
} from '../components/domElements.js';

// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const apiKey = '4ae4a7e14072cdaa089d3848c195e1a7';

// Search Weather Event Listener
searchButton.addEventListener('click', async () => {
    const city = cityInput.value;
    const state = stateInput.value;
    const country = countryInput.value;
    if (city) {
        
        try {
            const weatherData = await fetchWeatherData(city, state, country);
            if(weatherData) {
                displayWeatherData(weatherData);
                const background = getBackgroundImage(weatherData.weather[0].main);
                console.log("weather data:", weatherData);

                updateBackgroundColor(background);

                const forecastData = await fetch5DayWeatherForecast(city, state, country);
                if (forecastData) {
                    console.log("Weather forecast:", forecastData)
                    display5DayForecast(forecastData, forecast);
                }
            }
        } catch (error) {
            console.error('Error Getting Weather Data:', error)
        }
    }  else {
        console.log("Enter the correct city name.");
    }
});


// Display weather data for location
function displayWeatherData(data) {
    cityName.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.className = `bi bi-weather-${data.weather[0].icon}`;
    temperature.textContent = `Temperature: ${data.main.temp.toFixed(1)}°F`;
    feelsLike.textContent = `Feels Like: ${data.main.feels_like.toFixed(1)}°F`;
    pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
    tempMax.textContent = `Max Temperature: ${data.main.temp_max.toFixed(1)}°F`;
    tempMin.textContent = `Min Temperature: ${data.main.temp_min.toFixed(1)}°F`;

    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);
    sunrise.textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;
    sunset.textContent = `Sunset: ${sunsetTime.toLocaleTimeString()}`;

    // Update background color based on weather
    updateBackgroundColor(data.weather[0].main);

    weatherCard.style.display = 'block';
}


function updateBackgroundColor(background) {
    // Set the background image based on weather conditions
    document.body.style.backgroundImage = background;
}

// Initial hide the weather card
weatherCard.style.display = 'none';