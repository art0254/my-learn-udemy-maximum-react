import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
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
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgetBuilder;
