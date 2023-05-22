export async function getCityPhoto(city) {
  const unsplashApiKey = 'NoVC9i9bWbky0XQWQNsAFKIq1T-UtI087ft6F7mvPLs';
  const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${city}`;

  const response = await fetch(unsplashApiUrl, {
    headers: {
      Authorization: `Client-ID ${unsplashApiKey}`
    }
  });
  const data = await response.json();

  if (!data.urls || !data.urls.regular) {
    throw new Error('Unable to fetch city photo');
  }

  const photoUrl = data.urls.regular;
  return photoUrl;
}