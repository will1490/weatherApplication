import { displayWeatherAndPhoto } from "./displayResult.js";
import { getCityPhoto } from "./getCityPicture.js";
import { getWeatherData } from "./getWeatherData.js";

const form = document.getElementById('formCity');
const cityInputs = document.getElementsByClassName('city-input');

for (const input of cityInputs) {
  const storedCity = localStorage.getItem(input.id);
  if (storedCity) {
    input.value = storedCity;
  }
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const cities = Array.from(cityInputs).map(input => input.value);

  const promises = cities.map(async city => {
    const [weatherData, cityPhotoUrl] = await Promise.all([getWeatherData(city), getCityPhoto(city)]);
    return { city, weatherData, cityPhotoUrl };
  });

  Promise.all(promises)
    .then(results => {
      results.forEach(({ city, weatherData, cityPhotoUrl }) => {
        displayWeatherAndPhoto(city, weatherData, cityPhotoUrl);
        localStorage.setItem(city, city);
      });
    });
});