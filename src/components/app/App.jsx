import React, { useEffect, useReducer, useState } from 'react';
import { BurgerContext } from '../../services/BurgerContext';
import { IngredientsContext } from '../../services/IngredientsContext';
import { API_URL, INGREDIENTS_PATH, ORDERS_PATH } from '../../utils/constants';
import { ActionType } from '../../utils/enums';
import { request } from '../../utils/utils';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Loader from '../loader/Loader';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import styles from './app.module.css';

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

  const [burgerState, burgerDispatcher] = useReducer(reducer, initialBurger);

  const [error, setError] = useState();
  const [loaderMsg, setLoaderMsg] = useState('Загружаем список ингредиентов');

  useEffect(() => {
    request(`${API_URL}${INGREDIENTS_PATH}`)
      .then((data) => setIngredients(data.data))
      .catch((err) => setError(err.message))
      .finally(setLoaderMsg);
  }, []);

  const closeModals = () => {
    setOrderNumber();
    setChosenIngredient();
  };

  const onIngredientChoose = (id) => {
    setChosenIngredient(ingredients.find((i) => i._id === id));
  };

  const onOrderAssume = () => {
    setLoaderMsg('Мы начали обработку заказа');
    request(`${API_URL}${ORDERS_PATH}`, { ingredients: [...burgerState.composition, burgerState.composition[0]] })
      .then((data) => setOrderNumber(data.order.number))
      .catch((err) => setError(err.message))
      .finally(setLoaderMsg);
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
            <Modal title="Детали заказа" onCloseDemand={closeModals}>
              <OrderDetails orderNum={orderNumber} />
            </Modal>
          )}

          {chosenIngredient && (
            <Modal title="Детали ингредиента" onCloseDemand={closeModals}>
              <IngredientDetails ingredient={chosenIngredient} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default App;
