# SkyCast - Find My Weather
## Date:20.07.2025
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
## Home.jsx:
```
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ city, setCity }) {
  const [input, setInput] = useState(city);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (input.trim() === '') {
      setError('City name cannot be empty.');
      return;
    }
    setError('');
    setCity(input);
    navigate('/weather');
  }, [input, navigate, setCity]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌤️ Weather App</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter city name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Get Weather</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}

      <footer style={styles.footer}>
        <hr />
        <p><strong>Name:</strong> Keerthana S</p>
        <p><strong>Reg. No:</strong> 212222230066</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: { marginBottom: '1.5rem', fontSize: '2rem', color: '#333' },
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    border: '2px solid #ccc',
    borderRadius: '8px',
    marginBottom: '1rem',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4a90e2',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  error: { color: 'red', marginTop: '0.5rem' },
  footer: {
    marginTop: '2rem',
    fontSize: '0.9rem',
    color: '#555',
    borderTop: '1px solid #ddd',
    paddingTop: '1rem',
  },
};

export default Home;

```
## Weather.jsx:
```
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Weather({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!city) {
      navigate('/');
      return;
    }

    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
        setError('');
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch weather data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city, navigate]);

  const fahrenheit = useMemo(() => {
    if (!weather) return null;
    return (weather.main.temp * 9) / 5 + 32;
  }, [weather]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Weather in {city}</h1>
      {loading ? (
        <p>Loading weather...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <div style={styles.card}>
          <p><strong>🌡️ Temperature:</strong> {weather.main.temp}°C / {fahrenheit.toFixed(1)}°F</p>
          <p><strong>💧 Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>🌬️ Wind Speed:</strong> {weather.wind.speed} m/s</p>
          <p><strong>☁️ Condition:</strong> {weather.weather[0].main}</p>
        </div>
      )}
      <button style={styles.button} onClick={() => navigate('/')}>
        🔙 Search Another City
      </button>

      <footer style={styles.footer}>
        <hr />
        <p><strong>Name:</strong> Keerthana S</p>
        <p><strong>Reg. No:</strong> 212222230066</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#eef2f7',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: { fontSize: '2rem', color: '#333', marginBottom: '1rem' },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
    lineHeight: '1.6',
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  error: { color: 'red' },
  footer: {
    marginTop: '2rem',
    fontSize: '0.9rem',
    color: '#555',
    borderTop: '1px solid #ddd',
    paddingTop: '1rem',
  },
};

export default Weather;

```
## App.jsx:
```
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Weather from './Weather';
function App() {
  const [city, setCity] = useState('');
  return (
    <Routes>
      <Route path="/" element={<Home city={city} setCity={setCity} />} />
      <Route path="/weather" element={<Weather city={city} />} />
    </Routes>
  );
}
export default App;
```
## App.jsx:
```
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Weather from './Weather';

function App() {
  const [city, setCity] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home city={city} setCity={setCity} />} />
        <Route path="/weather" element={<Weather city={city} />} />
      </Routes>
    </Router>
  );
}

export default App;

```

## main.jsx:
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```
## Output:
<img width="1920" height="1080" alt="Screenshot (70)" src="https://github.com/user-attachments/assets/5999898d-2db8-4575-b7b0-6c71b807a3d1" />

<img width="1920" height="1080" alt="Screenshot (71)" src="https://github.com/user-attachments/assets/1edd6a2f-40f3-4674-a30e-10334474af6c" />

## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
