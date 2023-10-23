
const apiKey = '32c3c88c5dc5fd8c9c01a88b515965dc';
const lat = "-34.6118"
const lon = "-58.4173"

function getWeather(country) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
        const countryElement = document.getElementById('country');
        const temperatureElement = document.getElementById('temperature');

        countryElement.textContent = data.name;
        temperatureElement.textContent = data.main.temp;
        })
        .catch((error) => {
        console.error('Error al obtener los datos del clima:', error);
        });
    }

getWeather('Argentina');
