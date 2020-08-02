import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function LineGraph() {
  const [data, setData] = useState({});

  const buildChartData = (data, caseType = "cases") => {
    const charData = [];
    let lastDataPoint;
    for(let date in date.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          y: data[caseType][date] - lastDataPoint
        };
        charData.push(newDataPoint);
      }
      lastDataPoint = data[caseType][date];
    });
    return charData;
  };

  useEffect(() => { 
    fetch("tps://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let chartData = buildChartData(data, "cases");
        setData(chartData);
      });
  }, []);

  return (
    <div>
      <h1>Chart</h1>
      <Line
        data={{
          datasets: [
            {
              data: data,
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              borderColor: "#CC1034"
            }
          ]
        }}
        options
      />
    </div>
  );
}

export default LineGraph;
