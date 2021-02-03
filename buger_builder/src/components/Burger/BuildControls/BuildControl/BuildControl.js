import React from "react";
import classes from "./buildControl.module.css";

const buildControl = (props) => (
  <div className={classes.buildControl}>
    <div className={classes.Label}>{props.label}</div>
    <div className={classes.Less}>Less</div>
    <div className={classes.More}>More</div>
  </div>
);

export default buildControl;
