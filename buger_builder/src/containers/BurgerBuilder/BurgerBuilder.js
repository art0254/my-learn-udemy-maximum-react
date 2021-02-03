import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
class BurgetBuilder extends Component {
  state = {
    ingreditents: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
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
