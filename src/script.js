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


// async function display5DayForecast(data) {
//     forecast.innerHTML = ''; // Clear previous forecast
//     console.log("forecast div:", forecast)

//     if (data && data.list) {
//         for (let i = 0; i < 5; i++) {
//             const forecastItem = data.list[i * 8]; // Data for each day at 12:00 PM
//             console.log("Forecast Item:", forecastItem)
//             const date = new Date(forecastItem.dt * 1000);
    
//             const card = document.createElement('div');
//             card.classList.add('card', 'col-md-2', 'm-2');
    
//             const cardBody = document.createElement('div');
//             cardBody.classList.add('card-body');
    
//             const dateElement = document.createElement('h5');
//             dateElement.textContent = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
           
//             // if statement to change cloud icons
//             if(forecastItem) {
//                 console.log("Forecast data weather:", forecastItem.weather[0].main)
//             }
//             // Switch statement to change weather icons respectively
//             let iconElement = document.createElement('i');
//             switch (forecastItem.weather[0].main) {
//                 case "Clear":
//                     iconElement.className = `bi bi-brightness-low`;
//                     break;
//                 case "Clouds":
//                     iconElement.className = `bi bi-cloudy`;
//                     break;
//                 case "Rain":
//                     iconElement.className = `bi bi-cloud-rain`;
//                     break;
//                 case "Snow":
//                     iconElement.className = `bi bi-cloud-snow`;
//                     break;
//                 default:
//                     iconElement.className = `bi bi-brightness-alt-high`;
//             }
            
//             // Daily weather details in a div container
//             const temperatureElement = document.createElement('p');
//             temperatureElement.textContent = `Temp: ${forecastItem.main.temp.toFixed(1)}°F`;
//             temperatureElement.classList.add('card-text');
//             // Other weather details
//             const dailyFeelsLike = document.createElement('p');
//             dailyFeelsLike.textContent = `Temp: ${forecastItem.main.feels_like.toFixed(1)}°F`;
//             dailyFeelsLike.classList.add('card-text');
//             const dailyHumidity = document.createElement('p');
//             dailyHumidity.textContent = `Humidity: ${forecastItem.main.humidity}%`;
//             dailyHumidity.classList.add('card-text');
//             const dailyWeatherDesc = document.createElement('p');
//             dailyWeatherDesc.textContent = `${forecastItem.weather[0].description}`;
//             dailyWeatherDesc.classList.add('card-text');
    
//             cardBody.appendChild(dateElement);
//             cardBody.appendChild(iconElement);
//             cardBody.appendChild(temperatureElement);
//             cardBody.appendChild(dailyFeelsLike);
//             cardBody.appendChild(dailyHumidity);
//             cardBody.appendChild(dailyWeatherDesc);
//             card.appendChild(cardBody);
//             forecast.appendChild(card);
//         }
//     }
// }


function updateBackgroundColor(background) {
    // Set the background image based on weather conditions
    document.body.style.backgroundImage = background;
}

// Initial hide the weather card
weatherCard.style.display = 'none';