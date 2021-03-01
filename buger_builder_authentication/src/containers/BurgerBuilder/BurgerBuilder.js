import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControl from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgetBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    this.props.onInitIngredient();
  }
  updatePurchaseState(ingreditents) {
    const sum = Object.keys(ingreditents)
      .map((igKey) => {
        return ingreditents[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: '/checkout',
    });
  };
  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingreditents={this.props.ings} />
          <BurgerControl
            price={this.props.price}
            ingreditentAdded={this.props.onIngredientAdded}
            ingreditentRemoved={this.props.onIngredientRemove}
            purchasable={this.updatePurchaseState(this.props.ings)}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgetBuilder, axios));
