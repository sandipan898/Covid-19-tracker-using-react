import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import { LineGraph } from "./LineGraph";

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
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // useEffect = runs a piece of code based on a gibven condition

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

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

          const sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async event => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    console.log(countryCode);
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);

        // all the data
        // from the response
        setCountryInfo(data);
      });
  };
  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          {/* Title + Select input dropdown Menu */}

          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
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
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recoverd}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        {/* Table */}
        {/* Graph */}
        <CardContent>
          <h2>Live cases by country</h2>
          <Table countries={tableData} />
          <h3>World wide cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
