import React from "react";
import classes from "./Modal.module.css";
const modal = (props) => (
  <div
    style={{
      transform: props.show ? "translateY(0)" : "transalteY(-100)",
      opacity: props.show ? "1" : "0",
    }}
    className={classes.Modal}
  >
    {props.children}
  </div>
);

export default modal;
