export function displayWeatherData(data, cityNameElement, weatherDescriptionElement, weatherIconElement, temperatureElement, feelsLikeElement, pressureElement, tempMaxElement, tempMinElement, sunriseElement, sunsetElement, weatherCardElement) {
    cityNameElement.textContent = data.name;
    weatherDescriptionElement.textContent = data.weather[0].description;
    weatherIconElement.className = `bi bi-weather-${data.weather[0].icon}`;
    temperatureElement.textContent = `Temperature: ${data.main.temp.toFixed(1)}°F`;
    feelsLikeElement.textContent = `Feels Like: ${data.main.feels_like.toFixed(1)}°F`;
    pressureElement.textContent = `Pressure: ${data.main.pressure} hPa`;
    tempMaxElement.textContent = `Max Temperature: ${data.main.temp_max.toFixed(1)}°F`;
    tempMinElement.textContent = `Min Temperature: ${data.main.temp_min.toFixed(1)}°F`;

    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);
    sunriseElement.textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;
    sunsetElement.textContent = `Sunset: ${sunsetTime.toLocaleTimeString()}`;

    // Update background color based on weather
    updateBackgroundColor(data.weather[0].main);

    weatherCardElement.style.display = 'block';
}
