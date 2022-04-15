import React, { useEffect, useState } from 'react';
import { initialBurger } from '../../utils/data';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Loader from '../loader/Loader';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import styles from './app.module.css';

const apiPath = 'https://norma.nomoreparties.space/api';

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState();

  const [orderNumber, setOrderNumber] = useState();
  const [chosenIngredient, setChosenIngredient] = useState();

  useEffect(() => {
    fetch(`${apiPath}/ingredients`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(`Что-то пошло не так, данные не валидны ${JSON.stringify(data)}`);
        }
        setIngredients(data.data);
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

  const onOrderAssume = (ingredients) => {
    setOrderNumber(Math.floor(Math.random() * 1000000));
  };

  if (error) {
    return <Loader message={error} />;
  }

  return (
    <div className={styles.app}>
      <AppHeader />

      {ingredients.length === 0 ? (
        <Loader message={'Loading our spacy ingredients...'} />
      ) : (
        <div className={styles.main}>
          <BurgerIngredients ingredients={ingredients} ingredientClickHandler={onIngredientChoose} />
          <BurgerConstructor
            composition={initialBurger.map((id) => ingredients.find((i) => i._id === id))}
            orderClickHandler={onOrderAssume}
          />
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
    </div>
  );
};

export default App;
