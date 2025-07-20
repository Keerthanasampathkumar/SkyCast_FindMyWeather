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
