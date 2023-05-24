// Importation des modules nécessaires
import { displayWeatherAndPhoto } from "./displayResult.js";
import { getCityPhoto } from "./getCityPicture.js";
import { getWeatherData } from "./getWeatherData.js";
import { autoComplete } from "./autoComplete.js";

// Récupération des éléments du DOM
const form = document.getElementById('formCity'); // Formulaire
const cityInput = document.querySelector('.city-input'); // Champ de saisie de la ville
const graphElement = document.getElementById('temperatureGraph'); // Élément du graphique

// Récupération de la ville sélectionnée précédemment dans le stockage local (localStorage)
const storedCity = localStorage.getItem('selectedCity');
if (storedCity) {
  cityInput.value = storedCity; // Remplissage du champ de saisie avec la ville précédemment sélectionnée
}

// Écouteur d'événement sur la soumission du formulaire
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
  const city = cityInput.value; // Récupération de la ville saisie

  // Appels asynchrones pour récupérer les données météorologiques et l'URL de la photo de la ville
  Promise.all([getWeatherData(city), getCityPhoto(city)])
    .then(([weatherData, cityPhotoUrl]) => {
      // Affichage des données météorologiques et de la photo de la ville
      displayWeatherAndPhoto(city, weatherData, cityPhotoUrl);
      localStorage.setItem('selectedCity', city); // Sauvegarde de la ville sélectionnée dans le stockage local
      cityInput.value = ''; // Réinitialisation du champ de saisie

      // Création du graphique
      const temperatureData = weatherData.map(day => ((day.temperature - 273.15).toFixed(1))); // Conversion des températures en degrés Celsius

      new Chart(graphElement, {
        type: 'line',
        data: {
          labels: weatherData.map(day => day.date), // Étiquettes du graphique (dates)
          datasets: [
            {
              label: `Temperature (${city})`,
              data: temperatureData, // Données de température à afficher sur le graphique
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch(error => {
      console.error(error);
    });
});

// Écouteur d'événement sur la saisie de la ville
cityInput.addEventListener('input', autoComplete);

