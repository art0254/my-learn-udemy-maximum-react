import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import classes from "./Person.css";
import withClass from "../../../hoc/withClass";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
  }
  render() {
    console.log("[Person.js] rendering...");
    return (
      <Aux>
        <AuthContext.Consumer>
          {(context) =>
            context.authenticated ? <p>Authenticated!</p> : <p>Please Login</p>
          }
        </AuthContext.Consumer>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
          ref={this.inputElementRef}
          // ref={(inputEl) => {this.inputElement = inputEl}}
        />
      </Aux>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};
export default withClass(Person, classes.Person);
