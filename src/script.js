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

// Display weather data for location
function displayWeatherData(data) {
    cityName.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.className = `bi bi-weather-`;
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

async function get5DayForecast(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            console.log("Daily weather data:", data)
            display5DayForecast(data);
        } else {
            console.error('Failed to fetch forecast data');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function display5DayForecast(data) {
    forecast.innerHTML = ''; // Clear previous forecast
    console.log("forecast div:", forecast)

    for (let i = 0; i < 5; i++) {
        const forecastItem = data.list[i * 8]; // Data for each day at 12:00 PM
        console.log("Forecast Item:", forecastItem)
        const date = new Date(forecastItem.dt * 1000);

        const card = document.createElement('div');
        card.classList.add('card', 'col-md-2', 'm-2');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const dateElement = document.createElement('h5');
        dateElement.textContent = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

       
        // if statement to change cloud icons
        if(forecastItem) {
            console.log("Forecast data weather:", forecastItem.weather[0].main)
        }
        // Switch statement to change weather icons respectively
        let iconElement = document.createElement('i');
        switch (forecastItem.weather[0].main) {
            case "Clear":
                iconElement.className = `bi bi-brightness-low-fill`;
                break;
            case "Clouds":
                iconElement.className = `bi bi-cloudy-fill`;
        }
        
        // Daily weather details in a div container
        const weatherDetails = document.createElement('div');
        weatherDetails.classList.add('card-text');
        const temperatureElement = document.createElement('p');
        temperatureElement.textContent = `Temp: ${forecastItem.main.temp.toFixed(1)}°F`;
        // Other weather details
        const dailyFeelsLike = document.createElement('p');
        dailyFeelsLike.textContent = `Temp: ${forecastItem.main.feels_like.toFixed(1)}°F`;
        const dailyHumidity = document.createElement('p');
        dailyHumidity.textContent = `Humidity: ${forecastItem.main.humidity}%`;
        const dailyWeatherDesc = document.createElement('p');
        dailyWeatherDesc.textContent = `${forecastItem.weather[0].description}`;

        cardBody.appendChild(dateElement);
        cardBody.appendChild(iconElement);
        weatherDetails.appendChild(temperatureElement)
        weatherDetails.appendChild(dailyFeelsLike)
        weatherDetails.appendChild(dailyWeatherDesc)
        weatherDetails.appendChild(dailyHumidity)
        // cardBody.appendChild(temperatureElement);
        // cardBody.appendChild(dailyFeelsLike);
        // cardBody.appendChild(dailyHumidity);
        // cardBody.appendChild(dailyWeatherDesc);
        cardBody.appendChild(weatherDetails);
        card.appendChild(cardBody);
        forecast.appendChild(card);
    }
}
