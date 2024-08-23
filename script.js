const apiKey = "94d0670424f7cce11e551df6cfd27690";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon img"); // Select the image inside the .weather-icon container

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    try {
        let response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Update the weather icon based on the weather condition
        const weatherCondition = data.weather[0].main.toLowerCase(); // Convert to lowercase for easier comparison
        
        if (weatherCondition === "clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === "clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === "rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition === "drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === "mist") {
            weatherIcon.src = "images/mist.png";
        } else {
            weatherIcon.src = "images/default.png"; // Fallback image if the condition doesn't match
        }
        document.querySelector(".weather").style.display = "block" ;

        searchbox.value = ""; 
    } catch (error) {
        console.error(error);
        alert(error.message); 
    }
}

searchbtn.addEventListener("click", () => {
    const city = searchbox.value;
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

searchbox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") { // Check if the pressed key is "Enter"
        const city = searchbox.value;
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    }
});
