import React, { Component } from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from 'prop-types';
class BurgerIngredient extends Component {
  render() {
    let ingreditent = null;
    switch (this.props.type) {
      case "bread-bottom":
        ingreditent = <div className={classes.BreadBottom}></div>;
        break;
      case "bread-top":
        ingreditent = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
        ingreditent = <div className={classes.Meat}></div>;
        break;
      case "cheese":
        ingreditent = <div className={classes.Cheese}></div>;
        break;
      case "bacon":
        ingreditent = <div className={classes.Bacon}></div>;
        break;
      case "salad":
        ingreditent = <div className={classes.Salad}></div>;
        break;
      default:
        ingreditent = null;
    }
    return ingreditent;
  }
}
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;
