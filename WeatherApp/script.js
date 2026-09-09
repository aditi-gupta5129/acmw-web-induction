const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const error = document.getElementById("error");
const loading = document.getElementById("loading");
const unitToggle = document.getElementById("unitToggle");

let currentTemperature = null;
let currentUnit = "C";

function getWeatherCondition(code) {

    if (code === 0) {
        return "Clear☀️";
    } else if (code === 1 || code === 2) {
        return "Partly Cloudy⛅";
    } else if (code === 3) {
        return "Cloudy☁️";
    } else if (code >= 51 && code <= 57) {
        return "Drizzle🌦️";
    } else if (code >= 61 && code <= 67) {
        return "Rain🌧️";
    } else if (code >= 71 && code <= 77) {
        return "Snow❄️";
    } else if (code >= 80 && code <= 82) {
        return "Rain Showers🌧️";
    } else if (code >= 95) {
        return "Thunderstorm⛈️";
    } else {
        return "Unknown🌡️";
    }
}

function convertTemperature(temp) {

    if (currentUnit === "C") {
        return temp;
    } else {
        return (temp * 9 / 5) + 32;
    }
}
searchBtn.addEventListener("click", async function() {

    const city = cityInput.value;

    if (city === "") {
        error.textContent = "Please enter a city name.";
        return;
    }

    error.textContent = "";
    loading.textContent = "Loading...";
    searchBtn.disabled = true;

    try {

        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            loading.textContent = "";
            searchBtn.disabled = false;

            error.textContent = "City not found. Please enter a valid city.";
            return;
        }

        const latitude = locationData.results[0].latitude;
        const longitude = locationData.results[0].longitude;

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();

        loading.textContent = "";
        searchBtn.disabled = false;

        const currentWeather = weatherData.current;

        currentTemperature = currentWeather.temperature_2m;
        const humidityValue = currentWeather.relative_humidity_2m;
        const windSpeed = currentWeather.wind_speed_10m;
        const weatherCode = currentWeather.weather_code;

        const weatherCondition = getWeatherCondition(weatherCode);

        cityName.textContent = locationData.results[0].name;
        const displayedTemperature = convertTemperature(currentTemperature);

        temperature.textContent = `Temperature: ${displayedTemperature.toFixed(1)}°${currentUnit}`;
        condition.textContent = `Condition: ${weatherCondition}`;
        humidity.textContent = `Humidity: ${humidityValue}%`;
        wind.textContent = `Wind Speed: ${windSpeed} km/h`;

        } catch (err) {

        loading.textContent = "";
        searchBtn.disabled = false;

        error.textContent = "Something went wrong. Please try again.";
    }

});  // closes searchBtn event listener


unitToggle.addEventListener("click", function() {

    if (currentTemperature === null) {
        return;
    }

    if (currentUnit === "C") {
        currentUnit = "F";
        unitToggle.textContent = "Switch to °C";
    } else {
        currentUnit = "C";
        unitToggle.textContent = "Switch to °F";
    }

    const displayedTemperature = convertTemperature(currentTemperature);

    temperature.textContent =
        `Temperature: ${displayedTemperature.toFixed(1)}°${currentUnit}`;

});  