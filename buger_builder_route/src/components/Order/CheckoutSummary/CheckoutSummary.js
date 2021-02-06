import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../../components/UI/Button/Button";
import classses from "./CheckoutSummary.module.css";
const checkoutSummary = (props) => {
  return (
    <div className={classses.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingreditents={props.ingreditents} />
      </div>
      <Button btnType="Danger" clicked>
        CANCEL
      </Button>
      <Button btnType="Success" clicked>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
