const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const error = document.getElementById("error");

searchBtn.addEventListener("click", function() {

    const city = cityInput.value;

    if (city === "") {
        error.textContent = "Please enter a city name.";
        return;
    }

    error.textContent = "";
    cityName.textContent = city;
});