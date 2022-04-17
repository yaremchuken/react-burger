import React, { useEffect, useReducer, useState } from 'react';
import { BurgerContext } from '../../services/BurgerContext';
import { IngredientsContext } from '../../services/IngredientsContext';
import { ActionType } from '../../utils/enums';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Loader from '../loader/Loader';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import styles from './app.module.css';

const apiPath = 'https://norma.nomoreparties.space/api';

const initialBurger = {
  composition: ['60d3b41abdacab0026a733c6'],
  price: 1255 * 2,
};

function reducer(state, action) {
  switch (action.type) {
    case ActionType.ADD_INGREDIENT:
      return {
        ...state,
        composition: [...state.composition, action.payload._id],
        price: state.price + action.payload.price,
      };

    case ActionType.REMOVE_INGREDIENT:
      const idx = state.composition.findIndex((id) => id === action.payload._id);
      return {
        ...state,
        composition: [...state.composition.slice(0, idx), ...state.composition.slice(idx + 1)],
        price: state.price - action.payload.price,
      };

    default:
      throw new Error(`Unknown type of action: ${action.type}`);
  }
}

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [chosenIngredient, setChosenIngredient] = useState();
  const [orderNumber, setOrderNumber] = useState();

  const [burgerState, burgerDispatcher] = useReducer(reducer, initialBurger, undefined);

  const [error, setError] = useState();
  const [loaderMsg, setLoaderMsg] = useState('Загружаем список ингредиентов');

  useEffect(() => {
    fetch(`${apiPath}/ingredients`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(`Что-то пошло не так, данные не валидны ${JSON.stringify(data)}`);
        }
        setIngredients(data.data);
        setLoaderMsg();
      })
      .catch((err) => setError(err.message));
  }, []);

  const closeModals = () => {
    setOrderNumber(undefined);
    setChosenIngredient(undefined);
  };

  const handleEscKeydown = (event) => {
    event.key === 'Escape' && closeModals();
  };

  const onIngredientChoose = (id) => {
    setChosenIngredient(ingredients.find((i) => i._id === id));
  };

  const onOrderAssume = () => {
    setLoaderMsg('Мы начали обработку заказа');
    fetch(`${apiPath}/orders`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: [...burgerState.composition, burgerState.composition[0]] }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(`Что-то пошло не так, данные не валидны ${JSON.stringify(data)}`);
        }
        setOrderNumber(data.order.number);
        setLoaderMsg();
      })
      .catch((err) => setError(err.message));
  };

  if (error) {
    return <Loader message={error} />;
  }

  return (
    <div className={styles.app}>
      <AppHeader />

      {loaderMsg ? (
        <Loader message={loaderMsg} />
      ) : (
        <>
          {ingredients.length > 0 && (
            <div className={styles.main}>
              <IngredientsContext.Provider value={{ ingredients }}>
                <BurgerContext.Provider value={{ burgerState, burgerDispatcher }}>
                  <BurgerIngredients ingredientClickHandler={onIngredientChoose} />
                  <BurgerConstructor orderClickHandler={onOrderAssume} />
                </BurgerContext.Provider>
              </IngredientsContext.Provider>
            </div>
          )}

          {orderNumber && (
            <Modal title="Детали заказа" onCloseDemand={closeModals} onKeydown={handleEscKeydown}>
              <OrderDetails orderNum={orderNumber} />
            </Modal>
          )}

          {chosenIngredient && (
            <Modal title="Детали ингредиента" onCloseDemand={closeModals} onKeydown={handleEscKeydown}>
              <IngredientDetails ingredient={chosenIngredient} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default App;
