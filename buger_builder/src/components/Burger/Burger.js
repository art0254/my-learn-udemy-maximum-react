import React from "react";
import classses from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingreditents)
    .map((igKey) => {
      return [...Array(props.ingreditents[igKey])].map((_, index) => {
        return <BurgerIngredient key={igKey + index} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingreditents!</p>
    }
  return (
    <div className={classses.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default burger;
