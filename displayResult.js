export function displayWeatherAndPhoto(city, weatherData, photoUrl) {
  const weatherContainer = document.getElementById('displayResultContainer');
  const cityWeatherContainer = document.createElement('div');
  cityWeatherContainer.className = 'city-weather-container';

  const cityHeader = document.createElement('h2');
  cityHeader.textContent = `Weather in ${city}`;

  cityWeatherContainer.appendChild(cityHeader);

  weatherData.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('weather-day');

  

    dayElement.innerHTML = `
      <p><bold>Date: ${day.date}</bold></p>
      <p>Weather: ${day.weather}</p>
      <p>Min Temp: ${(day.minTemp-273.15).toFixed(1)}C</p>
      <p>Max Temp: ${(day.maxTemp-273.15).toFixed(1)}C</p>
      <p>Temperature: ${(day.temperature-273.15).toFixed(1)}C</p>
      `;
    cityWeatherContainer.appendChild(dayElement);
  });

  const photoContainer = document.getElementById('displayCityPictureContainer');
  const cityPhoto = document.createElement('img');
  cityPhoto.src = photoUrl;
  cityPhoto.alt = `Photo of ${city}`;
  cityPhoto.className = 'city-photo';

  cityWeatherContainer.appendChild(cityPhoto);

  weatherContainer.appendChild(cityWeatherContainer);
}
