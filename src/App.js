import React, { useState, useEffect } from 'react';


import clearNight from './resources/clearNight.mp4';
import sunny from './resources/sunny.mp4';
import stormy from './resources/Stormy.mp4';
import cloudy from './resources/cloudy.mp4';
import rainy from './resources/rainy.mp4';

function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_KEY;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Bacoor&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => console.error(err));
  }, [API_KEY]);

  const getBackgroundVideo = () => {
    if (!weather) return cloudy; 

    const condition = weather.weather[0].main.toLowerCase();
    const description = weather.weather[0].description.toLowerCase();

    if (condition === 'clear') {
      
      const hours = new Date().getHours();
      return hours >= 18 || hours < 6 ? clearNight : sunny;
    }
    if (condition === 'clouds') return cloudy;
    if (condition === 'rain') return rainy;
    if (condition === 'thunderstorm' || description.includes('storm')) return stormy;

    return cloudy; // fallback video
  };

  return (
    <div className="App">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={getBackgroundVideo()} type="video/mp4" />
      </video>

      {weather && (
        <div className="card-container">
          <div className="glass-card top-card">
            <div className="location">
              <p>{weather.name}</p>
            </div>
            <div className="temp">
              <h1>{Math.round(weather.main.temp)}°C</h1>
            </div>
            <div className="description">
              <p>{weather.weather[0].description}</p>
            </div>
          </div>

          <div className="glass-card bottom-card">
            <div className="feels">
              <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div className="humidity">
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
            <div className="wind">
              <p>Wind speed: {Math.round(weather.wind.speed)} km/h</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
