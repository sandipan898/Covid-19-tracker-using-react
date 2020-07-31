import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InputBox({ title, cases, total }) {
  return (
    <div>
      <Card className="infoBox">
        <CardContent>
          {/* Title */}
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>
          {/* No of Cases */}
          <h2 className="infoBox__cases">{cases}</h2>
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
