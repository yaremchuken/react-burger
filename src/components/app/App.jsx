import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import { clearOrderNumber } from '../../services/actions/order';
import { getIngredients } from '../../services/thunks/ingredients';
import { getUserByToken } from '../../services/thunks/user';
import { ACCESS_TOKEN_COOKIE_PATH } from '../../utils/constants';
import { getCookie } from '../../utils/utils';
import AppHeader from '../app-header/AppHeader';
import { AppRoutes } from '../app-routes/AppRoutes';
import Loader from '../loader/Loader';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredients, ingredientsRequested, ingredientsFailed } = useSelector((store) => store.ingredients);

  const { orderNumber, orderRequested } = useSelector((store) => store.order);
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      const token = getCookie(ACCESS_TOKEN_COOKIE_PATH);
      if (token) {
        dispatch(getUserByToken(token));
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [ingredients, dispatch]);

  const closeModals = () => {
    dispatch(clearOrderNumber());
    navigate(-1);
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
          <AppRoutes closeModals={closeModals} />

          {orderNumber && (
            <Modal title="Детали заказа" onCloseDemand={closeModals}>
              <OrderDetails />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default App;
