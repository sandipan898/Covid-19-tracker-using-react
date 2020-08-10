import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InputBox({ title, cases, active, total, ...props }) {
  return (
    <div className={`${active && "infoBox--selected"}`}>
      <Card
        className={`infoBox 
        ${props.isCase && "infoBox--blue"} 
        ${props.isRecovered && "infoBox--green"}
        ${props.isDeath && "infoBox--red"}`}
        onClick={props.onClick}
      >
        <CardContent>
          {/* Title */}
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>
          {/* No of Cases */}
          <h2
            className={`
            ${props.isCase && "infoBox__cases--blue"} 
            ${props.isRecovered && "infoBox__cases--green"} 
            ${props.isDeath && "infoBox__cases--red"}`}
          >
            {" "}
            {cases}
          </h2>
          {/* Total no of cases */}
          <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InputBox;
