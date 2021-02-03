import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BurgerControl from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
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
  render() {
    const disabledInfo = {
      ...this.state.ingreditents,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingreditents} />
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

export default BurgetBuilder;
