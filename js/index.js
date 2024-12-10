document.addEventListener("DOMContentLoaded", function() {
    const locationInput = document.getElementById("search");
    const findButton = document.getElementById("findBtn");

    async function fetchWeatherForecast(location) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=54a600c068ab4ceea7962243240912&q=${location}&days=7&aqi=no&alerts=no`);
            const data = await response.json();
            if (response.ok) {
                displayCurrentWeather(data.current, data.location);
                displayForecast(data.forecast.forecastday.slice(1, 4)); 
            } else {
                console.error("Error:", data.error.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    locationInput.addEventListener("input", function() {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeatherForecast(location);
        }
    });

    findButton.addEventListener("click", function() {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeatherForecast(location);
        }
    });

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function displayCurrentWeather(current, location) {
        const localTime = new Date(location.localtime);
        
        console.log(current);
        
        const currentWeatherHTML = `
            <div class="col">
                <div class="forecast-card my-card">
                    <div class="card-header">
                        <h4 class="mb-0 h6 text-white text-opacity-50 py-3">${daysOfWeek[localTime.getDay()]}</h4>
                    </div>
                    <div class="card-body py-5">
                        <div class="location h1 pb-3 text-white">${location.name}</div>
                        <div class="degree">
                            <div class="num h1 text-white">${current.temp_c}<sup>o</sup>C</div>
                        </div>
                        <div class="d-flex justify-content-center align-items-center pt-2">
                            <div class="textInfo">${current.condition.text}</div>
                            <div><img src="https:${current.condition.icon}" alt="Weather Icon" width="90"></div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="umbrella pe-2 text-white text-opacity-50"><i class="fa-solid fa-umbrella"></i> ${current.cloud}%</span>
                        <span class="wind pe-2 text-white text-opacity-50"><i class="fa-solid fa-wind"></i> ${current.wind_kph} km/h</span>
                        <span class="compass text-white text-opacity-50"><i class="fa-regular fa-compass"></i> ${current.wind_dir}</span>
                    </div>
                </div>
            </div>
        `;
        document.getElementById("currentWeatherContainer").innerHTML = currentWeatherHTML;
    }

    function displayForecast(forecast) {
        let forecastHTML = "";
        forecast.forEach(day => {
            const date = new Date(day.date);
            forecastHTML += `
                <div class="col">
                    <div class="forecast-card my-card">
                        <div class="card-header py-3">
                            <h4 class="mb-0 h6 text-white text-opacity-50">${daysOfWeek[date.getDay()]}</h4>
                        </div>
                        <div class="card-body py-5">
                            <img src="https:${day.day.condition.icon}" alt="Condition Icon" />
                            <div class="forecast-deg text-white">
                                <h2 class="mt-3">${day.day.maxtemp_c}<sup>o</sup>C</h2>
                                <h6 class="text-white text-opacity-50 mb-4 fw-light">${day.day.mintemp_c}<sup>o</sup>C</h6>
                                <span class="textInfo forecast-condition fw-light">${day.day.condition.text}</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            `;
        });
        document.getElementById("forecastContainer").innerHTML = forecastHTML;
    }

    fetchWeatherForecast("Cairo");
});
