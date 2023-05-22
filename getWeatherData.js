export async function getWeatherData(city) {
  const apiWeatherKey = 'e260d11b7e57dcaa4656de70b9022ef0';
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiWeatherKey}`;

  const response = await fetch(apiWeatherUrl);
  const data = await response.json();

  if (data.cod !== '200') {
    throw new Error('Unable to fetch weather data');
  }

  const weatherData = [];
  const uniqueDates = new Set();

  for (const item of data.list) {
    const date = new Date(item.dt_txt);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;

    if (!uniqueDates.has(formattedDate)) {
      const weather = item.weather[0].description;
      const minTemp = item.main.temp_min;
      const maxTemp = item.main.temp_max;
      const temperature = item.main.temp;
      weatherData.push({ date: formattedDate, weather, minTemp, maxTemp, temperature });
      uniqueDates.add(formattedDate);
    }

    if (uniqueDates.size === 5) {
      break;
    }
  }

  return weatherData;
};