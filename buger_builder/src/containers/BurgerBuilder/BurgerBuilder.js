import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BurgerControl from "../../components/Burger/BuildControls/BuildControls";
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
  };

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
        <Burger ingreditents={this.state.ingreditents} />
        <BurgerControl
          price={this.state.totalPrice}
          ingreditentAdded={this.addIngredientHandler}
          ingreditentRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgetBuilder;
