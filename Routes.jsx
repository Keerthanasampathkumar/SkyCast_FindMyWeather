<Routes>
  <Route path="/" element={<Home city={city} setCity={setCity} />} />
  <Route path="/weather" element={<Weather city={city} />} />
</Routes>
