export function displayWeatherAndPhoto(city, weatherData, photoUrl) {
  const weatherContainer = document.getElementById('displayResultContainer'); // Conteneur pour afficher les données météorologiques
  const cityWeatherContainer = document.createElement('div'); // Conteneur pour une ville spécifique
  cityWeatherContainer.className = 'city-weather-container'; // Classe CSS pour le conteneur

  const cityHeader = document.createElement('h2'); // En-tête pour afficher le nom de la ville
  cityHeader.textContent = `Weather in ${city}`; // Texte de l'en-tête avec le nom de la ville

  cityWeatherContainer.appendChild(cityHeader); // Ajout de l'en-tête au conteneur

  weatherData.forEach(day => {
    const dayElement = document.createElement('div'); // Élément pour afficher les données météorologiques d'un jour spécifique
    dayElement.classList.add('weather-day'); // Classe CSS pour l'élément

    dayElement.innerHTML = `
      <p><bold>Date: ${day.date}</bold></p>
      <p>Weather: ${day.weather}</p>
      <p>Min Temp: ${(day.minTemp-273.15).toFixed(1)}C</p>
      <p>Max Temp: ${(day.maxTemp-273.15).toFixed(1)}C</p>
      <p>Temperature: ${(day.temperature-273.15).toFixed(1)}C</p>
    `; // Contenu HTML de l'élément avec les données météorologiques du jour

    cityWeatherContainer.appendChild(dayElement); // Ajout de l'élément au conteneur pour une ville spécifique
  });

  const photoContainer = document.getElementById('displayCityPictureContainer'); // Conteneur pour afficher la photo de la ville
  const cityPhoto = document.createElement('img'); // Élément pour afficher la photo
  cityPhoto.src = photoUrl; // URL de la photo
  cityPhoto.alt = `Photo of ${city}`; // Texte alternatif de la photo
  cityPhoto.className = 'city-photo'; // Classe CSS pour la photo

  cityWeatherContainer.appendChild(cityPhoto); // Ajout de la photo au conteneur pour une ville spécifique

  weatherContainer.appendChild(cityWeatherContainer); // Ajout du conteneur pour une ville spécifique au conteneur principal
}
