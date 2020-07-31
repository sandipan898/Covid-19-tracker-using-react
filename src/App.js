import React, { useState } from "react";
import { MenuItem, Select, FormControl } from "@material-ui/core";
import "./App.css";

// function renderDropdown(countries) {
//   return countriesList;
// }

function App() {
  const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
  return (
    <div className="app">
      {/* Header */}
      {/* Title + Select input dropdown Menu */}
      {/* InfoBoxes */}
      {/* Table */}
      {/* Graph */}
      {/* Map */}
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* Loop through all the countries and how a dropdown list */}
            {countries.map(country => (
              <MenuItem value="worldwide">{country}</MenuItem>
            ))}
            ;
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
