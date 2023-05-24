export async function getWeatherData(city) {
  const apiWeatherKey = 'e260d11b7e57dcaa4656de70b9022ef0'; // Clé API pour OpenWeatherMap
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiWeatherKey}`; // URL de l'API pour obtenir les données météorologiques

  const response = await fetch(apiWeatherUrl); // Appel asynchrone à l'API pour récupérer les données
  const data = await response.json(); // Conversion de la réponse en JSON

  if (data.cod !== '200') { // Si le code de réponse n'est pas 200, il y a une erreur
    throw new Error('Unable to fetch weather data'); // Lancer une exception avec un message d'erreur
  }

  const weatherData = []; // Tableau pour stocker les données météorologiques
  const uniqueDates = new Set(); // Ensemble pour stocker les dates uniques

  for (const item of data.list) {
    const date = new Date(item.dt_txt); // Récupération de la date de l'élément
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`; // Formatage de la date au format "jour/mois"

    if (!uniqueDates.has(formattedDate)) { // Vérification si la date n'est pas déjà présente dans l'ensemble
      const weather = item.weather[0].description; // Description de la météo
      const minTemp = item.main.temp_min; // Température minimale
      const maxTemp = item.main.temp_max; // Température maximale
      const temperature = item.main.temp; // Température actuelle
      weatherData.push({ date: formattedDate, weather, minTemp, maxTemp, temperature }); // Ajout des données au tableau
      uniqueDates.add(formattedDate); // Ajout de la date à l'ensemble des dates uniques
    }

    if (uniqueDates.size === 5) { // Si on a déjà récupéré 5 dates uniques, on arrête la boucle
      break;
    }
  }

  return weatherData; // Retourne les données météorologiques
};
