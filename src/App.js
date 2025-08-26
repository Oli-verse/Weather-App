import React from 'react';
import cloudyVideo from './resources/cloudy.mp4';


function App() {
  
  //const API_KEY = process.env.REACT_APP_WEATHER_KEY;

  return (
    <div className="App">
       <video autoPlay loop muted playsInline className="background-video">
          <source src={require('./resources/cloudy.mp4')} type="video/mp4" />
        </video>


      <div className="card-container">
        <div className="glass-card top-card">
          <div className="location">
            <p>Bacoor City</p>
          </div>
          <div className="temp">
            <h1>30°C</h1>
          </div>
          <div className="description">
            <p>cloudy</p>
          </div>
        </div>

        <div className="glass-card bottom-card">
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
    </div>
  );
}

export default App;
