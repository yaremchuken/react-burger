import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CHOOSE_INGREDIENT, getIngredients } from '../../services/actions/ingredients';
import { CLEAR_ORDER_NUMBER } from '../../services/actions/order';
import { getUserByToken } from '../../services/actions/user';
import { ACCESS_TOKEN_COOKIE_PATH } from '../../utils/constants';
import { getCookie } from '../../utils/utils';
import AppHeader from '../app-header/AppHeader';
import { AppRoutes } from '../app-routes/AppRoutes';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Loader from '../loader/Loader';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredients, ingredientsRequested, ingredientsFailed, chosenIngredient } = useSelector(
    (store) => store.ingredients
  );

  const { orderNumber, orderRequested } = useSelector((store) => store.order);
  const { user } = useSelector((store) => store.user);
  const { tokenRequested } = useSelector((store) => store.token);

  useEffect(() => {
    if (!user) {
      const token = getCookie(ACCESS_TOKEN_COOKIE_PATH);
      if (token && !tokenRequested) {
        dispatch(getUserByToken(token));
      }
    }
  }, [user, dispatch, tokenRequested]);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [ingredients, dispatch]);

  const closeModals = () => {
    dispatch({ type: CLEAR_ORDER_NUMBER });
    dispatch({ type: CHOOSE_INGREDIENT });
    navigate('/');
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
        <Loader message={'Обрабатываем Ваш заказ'} />
      ) : (
        <>
          <AppRoutes />

          {orderNumber && (
            <Modal title="Детали заказа" onCloseDemand={closeModals}>
              <OrderDetails />
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
