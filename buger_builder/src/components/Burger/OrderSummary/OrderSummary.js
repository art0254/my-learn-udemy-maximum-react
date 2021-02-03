import React from "react";
import Aux from "../../../hoc/Auxiliary";
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li style={{ textTransform: "capitalize" }}>
        <span>{igKey}</span> : {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingreditents :</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout ? </p>
    </Aux>
  );
};

export default orderSummary;
