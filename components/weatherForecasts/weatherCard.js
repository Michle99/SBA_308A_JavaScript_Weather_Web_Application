import { createCardElement } from "./cardElement.js";
import { createWeatherIcon } from "./weatherIcon.js";


export function createForecastCard(date, forecastItem) {
    const card = document.createElement('div');
    card.classList.add('card', 'col-md-2', 'm-2');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    console.log("Weather Forecast cards:", card)

    const dateElement = createCardElement('h5', date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    const iconElement = createWeatherIcon(forecastItem.weather[0].icon);
    console.log("iconElement:", iconElement);
    console.log("forecast data:", forecastItem.weather[0].icon);
    console.log("forecast main:", forecastItem.weather[0].main);
    const temperatureElement = createCardElement('p', `Temp: ${forecastItem.main.temp.toFixed(1)}°F`);
    const dailyFeelsLike = createCardElement('p', `Feels Like: ${forecastItem.main.feels_like.toFixed(1)}°F`);
    const dailyHumidity = createCardElement('p', `Humidity: ${forecastItem.main.humidity}%`);
    const dailyWeatherDesc = createCardElement('p', forecastItem.weather[0].description);

    cardBody.appendChild(dateElement);
    cardBody.appendChild(iconElement);
    cardBody.appendChild(temperatureElement);
    cardBody.appendChild(dailyFeelsLike);
    cardBody.appendChild(dailyHumidity);
    cardBody.appendChild(dailyWeatherDesc);

    card.appendChild(cardBody);

    return card;
}