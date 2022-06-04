import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, SORT_INGREDIENTS } from '../../services/actions/burger';
import { takeOrder } from '../../services/actions/order';
import { random, uniqueIdProvider } from '../../utils/utils';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';
import Loader from '../loader/Loader';
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
      dispatch({ type: ADD_INGREDIENT, ingredient: { ...ingredient, uniqueId: uniqueIdProvider() } });
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
      addIngredient(entity.id);
    },
    collect: (monitor) => ({
      opacity: monitor.isOver() ? 0.7 : 1,
    }),
  });

  // Создаём начальный бургер при загрузке страницы
  useEffect(() => {
    if (ingredients.length > 0 && composition.length === 0) {
      const ingredientsbyType = ingredients.reduce(
        (res, current) => {
          res[current.type].push(current._id);
          return res;
        },
        {
          bun: [],
          sauce: [],
          main: [],
        }
      );

      addIngredient(random(ingredientsbyType.bun));
      addIngredient(random(ingredientsbyType.sauce));
      addIngredient(random(ingredientsbyType.main));
    }
  }, [addIngredient, ingredients, composition]);

  if (ingredients.length === 0) {
    return null;
  }

  if (composition.length === 0) {
    return <Loader message={'Готовим наше лучшее предложение'} />;
  }

  const bun = composition[0];

  return (
    <section className={`${styles.burgerConstructor} pt-15`} ref={target} style={{ opacity }}>
      <BurgerIngredient key={-1} ingredient={bun} idx={0} closeHandler={() => {}} />

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

      <BurgerIngredient key={-2} ingredient={bun} idx={composition.length} closeHandler={() => {}} />

      <div className={styles.order}>
        <div className={styles.orderTotal}>
          <p className="text text_type_digits-medium">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <button onClick={orderHandler} className={styles.orderButton}>
          <span className="text text_type_main-small">Оформить заказ</span>
        </button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
