import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BurgerControl from "../../components/Burger/BuildControls/BuildControls";

class BurgetBuilder extends Component {
  state = {
    ingreditents: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };
  render() {
    return (
      <Aux>
        <Burger ingreditents={this.state.ingreditents}/>
        <BurgerControl />
      </Aux>
    );
  }
}

export default BurgetBuilder;
