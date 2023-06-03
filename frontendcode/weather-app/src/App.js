import React, { useState } from 'react';
import './App.css';

function App() {
  const [citiesInput, setCitiesInput] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setCitiesInput(event.target.value);
  };

  const handleGetWeather = () => {
    fetch('http://localhost:5000/getWeather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cities: citiesInput.split(',') }),
    })
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data.weather);
        setError('');
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching weather data');
      });
  };

  return (
    <div className="App">
      <div className="input-container">
        <label htmlFor="citiesInput">Enter cities:</label>
        <input type="text" id="citiesInput" value={citiesInput} onChange={handleInputChange} />
        <button onClick={handleGetWeather}>Get Weather</button>
      </div>
      {Object.keys(weatherData).length > 0 && (
        <div>
          <h2>Weather Results</h2>
          <ul>
            {Object.entries(weatherData).map(([city, temperature]) => (
              <li key={city}>
                {city}: {temperature}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;

