import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CHOOSE_INGREDIENT, getIngredients } from '../../services/actions/ingredients';
import { CLEAR_ORDER_NUMBER } from '../../services/actions/order';
import AppHeader from '../app-header/AppHeader';
import { AppRoutes } from '../app-routes/AppRoutes';
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
      <BrowserRouter>
        <AppHeader />

        {ingredientsRequested ? (
          <Loader message={'Загружаем список ингредиентов'} />
        ) : orderRequested ? (
          <Loader message={'Обрабатываем Ваш заказ'} />
        ) : (
          <>
            {ingredients.length > 0 && <AppRoutes />}

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
      </BrowserRouter>
    </div>
  );
};

export default App;
