export async function getCityPhoto(city) {
  const unsplashApiKey = 'NoVC9i9bWbky0XQWQNsAFKIq1T-UtI087ft6F7mvPLs'; // Clé API pour Unsplash
  const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${city}`; // URL de l'API pour obtenir une photo aléatoire

  const response = await fetch(unsplashApiUrl, {
    headers: {
      Authorization: `Client-ID ${unsplashApiKey}` // Ajout de l'en-tête d'autorisation avec la clé API
    }
  });
  const data = await response.json(); // Conversion de la réponse en JSON

  if (!data.urls || !data.urls.regular) { // Si les URLs ou l'URL régulière de la photo ne sont pas présentes dans les données
    throw new Error('Unable to fetch city photo'); // Lancer une exception avec un message d'erreur
  }

  const photoUrl = data.urls.regular; // Récupération de l'URL régulière de la photo
  return photoUrl; // Retourne l'URL de la photo
}
