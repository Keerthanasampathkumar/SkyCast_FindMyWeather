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
