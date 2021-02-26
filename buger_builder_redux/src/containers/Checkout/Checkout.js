import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
  state = {
    ingreditents: null,
    totalPrice: 0,
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingreditents = {};
    let price = 0;
    for (let param of query.entries()) {
      //['salad', '1']
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingreditents[param[0]] = +param[1];
      }
    }
    this.setState({ ingreditents: ingreditents, totalPrice: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingreditents={this.state.ingreditents}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingreditents={this.state.ingreditents}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
