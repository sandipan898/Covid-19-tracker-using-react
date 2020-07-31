import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl } from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";

/*
function RenderDropdown({ countries }) {
  console.log(countries);
  const countriesList = countries.map(country => (
    <MenuItem value="worldwide">{country}</MenuItem>
  ));
  return countriesList;
}*/

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("W");

  // useEffect = runs a piece of code based on a gibven condition
  useEffect(() => {
    // The code inside here will run once when the component loads
    // and not again

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country, // United States, India ...
            value: country.countryInfo.iso2 // USA, IN
          }));

          setCountries(countries);
          console.log(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = event => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
        {/* Header */}
        {/* Title + Select input dropdown Menu */}

        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="W">World Wide</MenuItem>
            {/* Loop through all the countries and how a dropdown list */}
            {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

            {/* <RenderDropdown countries={countries} /> */}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        {/* InfoBoxes title="CoronaCirus Cases" */}
        {/* InfoBoxes title="CoronaCirus recoveries" */}
        {/* InfoBoxes title="CoronaCirus deaths" */}
        <InfoBox title="Coronavirus Cases" cases={2000} total={200000} />
        <InfoBox title="Recovered" cases={2000} total={200000} />
        <InfoBox title="Deaths" cases={2000} total={200000} />
      </div>
      {/* Table */}
      {/* Graph */}
      {/* Map */}
      <Map />
    </div>
  );
}

export default App;
