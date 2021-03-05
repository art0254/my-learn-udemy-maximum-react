import React, { useState, useEffect, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    fetch(
      'https://react-hook-max-52acc-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  useEffect(() => {
    fetch(
      'https://react-hook-max-52acc-default-rtdb.firebaseio.com/ingredients.json'
    )
      .then((response) => response.json())
      .then((responseData) => {
        const lodedIngredients = [];
        for (const key in responseData) {
          lodedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(lodedIngredients);
      });
  }, []);
  const removeIngredientHandler = (ingredientId) => {
    fetch(
      `https://react-hook-max-52acc-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => {
        setUserIngredients((prevIngredients) =>
          prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
        );
      })
      .catch((error) => {});
  };
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
