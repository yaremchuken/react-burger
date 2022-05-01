import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHOOSE_INGREDIENT, getIngredients } from '../../services/actions/ingredients';
import { CLEAR_ORDER_NUMBER } from '../../services/actions/order';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Loader from '../loader/Loader';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();

  const { ingredients, ingredientsRequested, ingredientsFailed, chosenIngredient } = useSelector(
    (store) => store.ingredients
  );
  const { orderNumber, orderRequested } = useSelector((store) => store.order);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeModals = () => {
    dispatch({ type: CLEAR_ORDER_NUMBER });
    dispatch({ type: CHOOSE_INGREDIENT });
  };

  if (ingredientsFailed) {
    return <Loader message={'Не удалось загрузить список ингредиентов'} />;
  }

  return (
    <div className={styles.app}>
      <AppHeader />

      {ingredientsRequested ? (
        <Loader message={'Загружаем список ингредиентов'} />
      ) : orderRequested ? (
        <Loader message={'Обрабаиываем Ваш заказ'} />
      ) : (
        <>
          {ingredients.length > 0 && (
            <div className={styles.main}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          )}

          {orderNumber && (
            <Modal title="Детали заказа" onCloseDemand={closeModals}>
              <OrderDetails />
            </Modal>
          )}

          {chosenIngredient && (
            <Modal title="Детали ингредиента" onCloseDemand={closeModals}>
              <IngredientDetails />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default App;
