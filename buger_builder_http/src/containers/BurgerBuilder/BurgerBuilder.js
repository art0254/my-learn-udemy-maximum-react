import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BurgerControl from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgetBuilder extends Component {
  state = {
    ingreditents: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  updatePurchaseState(ingreditents) {
    // const ingreditents = {
    //   ...this.state.ingreditents,
    // };
    const sum = Object.keys(ingreditents)
      .map((igKey) => {
        return ingreditents[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingreditents[type];
    const updateCount = oldCount + 1;
    const updatedIngreditents = {
      ...this.state.ingreditents,
    };
    updatedIngreditents[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingreditents: updatedIngreditents,
    });
    this.updatePurchaseState(updatedIngreditents);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingreditents[type];
    if (oldCount <= 0) return;
    const updateCount = oldCount - 1;
    const updatedIngreditents = {
      ...this.state.ingreditents,
    };
    updatedIngreditents[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingreditents: updatedIngreditents,
    });
    this.updatePurchaseState(updatedIngreditents);
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    //  alert("You Continue!");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingreditents,
      price: this.state.totalPrice,
      customer: {
        name: "Nattapon Suetrong",
        address: {
          street: "000",
          zipcode: "70000",
          country: "Thailand",
        },
        email: "nana.ort@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/order.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
      });
  };
  render() {
    const disabledInfo = {
      ...this.state.ingreditents,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingreditents}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingreditents={this.state.ingreditents} />
        <BurgerControl
          price={this.state.totalPrice}
          ingreditentAdded={this.addIngredientHandler}
          ingreditentRemoved={this.removeIngredientHandler}
          purchasable={this.state.purchasable}
          disabled={disabledInfo}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgetBuilder, axios);
