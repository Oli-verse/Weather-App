import React, { useState, useEffect, useRef } from 'react';
import clearNight from './resources/clearNight.mp4';
import sunny from './resources/sunny.mp4';
import stormy from './resources/Stormy.mp4';
import cloudy from './resources/cloudy.mp4';
import rainy from './resources/rainy.mp4';

function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_KEY;
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Bacoor');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    if (!city) return;
    setError('');
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError(`City "${city}" not found. Try again.`);
          return;
        }
        setWeather(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Something went wrong. Check your connection.');
      });
  }, [city, API_KEY]);

  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [weather]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      setCity(trimmed);
      setInput('');
    }
  };

  const getBackgroundVideo = () => {
    if (!weather) return cloudy;

    const condition = weather.weather[0].main; 

    const hours = new Date().getHours();
    const isNight = hours >= 18 || hours < 6;

    switch (condition) {
      case 'Clear':
        return isNight ? clearNight : sunny;

      case 'Clouds':
        return cloudy;

      
      case 'Drizzle':
      case 'Rain':
        return rainy;

      
      case 'Thunderstorm':
        return stormy;

      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        return cloudy;

      
      case 'Snow':
        return cloudy;

      default:
        return cloudy;
    }
  };

  return (
  <div className="App">
    <video ref={videoRef} autoPlay loop muted playsInline className="background-video">
      <source src={getBackgroundVideo()} type="video/mp4" />
    </video>

    <div className="card-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <>
          <div className="glass-card top-card">
            <div className="location">
              <p>{weather.name}, {weather.sys.country}</p>
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
        </>
      )}
    </div>
  </div>
);
}
export default App;