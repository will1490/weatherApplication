export function displayWeatherAndPhoto(city, weatherData, photoUrl) {
  const weatherContainer = document.getElementById('displayResultContainer');
  const cityWeatherContainer = document.createElement('div');
  cityWeatherContainer.className = 'city-weather-container';

  const cityHeader = document.createElement('h2');
  cityHeader.textContent = `Weather in ${city}`;

  cityWeatherContainer.appendChild(cityHeader);

  weatherData.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.textContent = `Date: ${day.date}, Weather: ${day.weather}, Min Temp: ${day.minTemp}, Max Temp: ${day.maxTemp}`;
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
