import React from 'react';

function App() {

  //const API_KEY = process.env.REACT_APP_WEATHER_KEY;

  return (
    <div className="App">
      <div className="container">
        <div className="top"></div>
        <div className="location">
          <p>Bacoor City</p>
        </div>
        <div className="temp">
          <h1>30°C</h1>
        </div>
        <div className="description">
          <p>Sunny</p>
        </div>
        <div className="bottom"></div>
        <div className="feels">
          <p>Feels like: 32°C</p> 
          </div>
        <div className="humidity">
          <p>Humidity: 70%</p>   
        </div>
        <div className="wind">
          <p>Wind speed: 10 km/h</p>  
        </div>
      </div>
    </div>
  );
}

export default App;
