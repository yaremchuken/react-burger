import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uid } from 'uuid';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, SORT_INGREDIENTS } from '../../services/actions/burger';
import { takeOrder } from '../../services/actions/order';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((store) => store.ingredients);
  const { composition, price, draggedIngredient } = useSelector((store) => store.burger);
  const { user } = useSelector((store) => store.user);

  const navigate = useNavigate();

  const addIngredient = useCallback(
    (id) => {
      const ingredient = ingredients.find((i) => i._id === id);
      dispatch({ type: ADD_INGREDIENT, ingredient: { ...ingredient, uniqueId: uid() } });
    },
    [ingredients, dispatch]
  );

  const removeIngredient = (ingredient) => {
    dispatch({ type: REMOVE_INGREDIENT, ingredient });
  };

  const orderHandler = () => {
    if (!user) {
      navigate('/login');
    } else {
      const ids = composition.map((i) => i._id);
      dispatch(takeOrder([...ids, ids[0]]));
    }
  };

  const sortIngredients = (dragIdx, dropIdx) => {
    dispatch({ type: SORT_INGREDIENTS, idxFrom: dragIdx, idxTo: dropIdx });
  };

  const [{ opacity }, target] = useDrop({
    accept: 'ingredient',
    drop(entity) {
      if (composition.length > 0 || entity.type === 'bun') {
        addIngredient(entity.id);
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isOver() ? 0.7 : 1,
    }),
  });

  if (ingredients.length === 0) {
    return null;
  }

  const bun = composition[0];

  return (
    <section className={`${styles.burgerConstructor} pt-15`} ref={target} style={{ opacity }}>
      {bun ? (
        <>
          <BurgerIngredient key={-1} ingredient={bun} idx={0} />

          {composition.length === 1 ? (
            <p className={`${styles.empty} text text_type_main-medium`}>Теперь добавляйте ингредиенты</p>
          ) : (
            <ul className={styles.ingredientList}>
              {composition
                .slice(1)
                .filter((i) => !draggedIngredient || draggedIngredient._id !== i._id)
                .map((ingredient, idx) => (
                  <BurgerIngredient
                    key={ingredient.uniqueId}
                    ingredient={ingredient}
                    idx={idx}
                    closeHandler={() => removeIngredient(ingredient)}
                    sortHandler={sortIngredients}
                  />
                ))}
            </ul>
          )}

          <BurgerIngredient key={-2} ingredient={bun} idx={composition.length} />

          <div className={styles.order}>
            <div className={styles.orderTotal}>
              <p className="text text_type_digits-medium">{price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <button onClick={orderHandler} className={styles.orderButton}>
              <span className="text text_type_main-small">Оформить заказ</span>
            </button>
          </div>
        </>
      ) : (
        <p className={`${styles.empty} text text_type_main-medium`}>Начните собирать бургер перетащив сюда булочку</p>
      )}
    </section>
  );
};

export default BurgerConstructor;
