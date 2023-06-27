import React, { useEffect, useState } from 'react';

export default function MyCustomWidget() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = '7ac52b5a2a9947ea84672756232706';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid=${apiKey}`;

    // Fetch weather data from the API
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Weather Widget</h2>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}
