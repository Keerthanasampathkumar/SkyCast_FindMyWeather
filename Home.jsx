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
