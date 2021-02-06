import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
  state = {
    ingreditents: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  render() {
    return (
      <div>
        <CheckoutSummary ingreditents={this.state.ingreditents} />
      </div>
    );
  }
}

export default Checkout;
