import { ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../services/actions/burger';
import { takeOrder } from '../../services/actions/order';
import { random } from '../../utils/utils';
import Loader from '../loader/Loader';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((store) => store.ingredients);
  const { composition, price } = useSelector((store) => store.burger);

  const addIngredient = (id) => {
    const ingredient = ingredients.find((i) => i._id === id);
    dispatch({ type: ADD_INGREDIENT, ingredient });
  };

  const removeIngredient = (ingredient) => {
    dispatch({ type: REMOVE_INGREDIENT, ingredient });
  };

  const orderHandler = () => {
    const ids = composition.map((i) => i._id);
    dispatch(takeOrder([...ids, ids[0]]));
  };

  const [{ opacity }, target] = useDrop({
    accept: 'ingredient',
    drop(id) {
      addIngredient(id._id);
    },
    collect: (monitor) => ({
      opacity: monitor.isOver() ? 0.7 : 1,
    }),
  });

  // Создаём начальный бургер при загрузке страницы
  useEffect(() => {
    if (composition.length === 0) {
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
  });

  if (composition.length === 0) {
    return <Loader message={'Готовим наше лучшее предложение'} />;
  }

  const bun = composition[0];

  return (
    <section className={`${styles.burgerConstructor} pt-15`} ref={target} style={{ opacity }}>
      <div className={styles.ingredientElement} key={0}>
        <div className={styles.dragElement}></div>
        <ConstructorElement
          type={'top'}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <ul className={styles.ingredientList}>
        {composition
          .slice(1)
          .map((ingredient, idx) => mapIngredient(ingredient, idx, () => removeIngredient(ingredient)))}
      </ul>

      <div className={styles.ingredientElement} key={composition.length}>
        <div className={styles.dragElement}></div>
        <ConstructorElement
          type={'bottom'}
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

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

const mapIngredient = (ingredient, idx, closeHandler) => {
  return (
    <li className={styles.ingredientElement} key={idx}>
      <div className={styles.dragElement}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={closeHandler}
      />
    </li>
  );
};

export default BurgerConstructor;
