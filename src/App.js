import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`https://crio-location-selector.onrender.com/${selectedCountry}/states`)
        .then((res) => {
          setStates(res.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(`https://crio-location-selector.onrender.com/${selectedCountry}/${selectedState}/cities`)
        .then((res) => setCities(res.data))
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedState]);

  return (
    <div className="city-selector" role="presentation">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="dropdown"
          disabled={!selectedCountry}
        >
          <option value="" disabled>Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="dropdown"
          disabled={!selectedState}
        >
          <option value="" disabled>Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity}</span>
          <span className="fade">, {selectedState}, {selectedCountry}</span>
        </h2>
      )}
    </div>
  );
}
//comment