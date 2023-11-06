const getBackgroundImage = (weather) => {
    // Set the background image based on weather conditions
    let backgroundImage;

    switch (weather) {
        case 'Clear':
            backgroundImage = '../weather_backgrounds/clear.jpg'; // Clear sky image
            break;
        case 'Clouds':
            backgroundImage = '../weather_backgrounds/cloudy.jpg'; // Gray
            break;
        case 'Rain':
            backgroundImage = '../weather_backgrounds/rainy.jpg'; // Teal
            break;
        default:
            backgroundImage = '../weather_backgrounds/sandy.jpg'; // Default white
    }

    document.body.style.backgroundImage = `url(${backgroundImage})`;
}

export default getBackgroundImage;