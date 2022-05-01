import { ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../services/actions/burger';
import { takeOrder } from '../../services/actions/order';
import { random } from '../../utils/utils';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((store) => store.ingredients);
  const { composition, price } = useSelector((store) => store.burger);

  const addIngredient = (ingredient) => {
    dispatch({ type: ADD_INGREDIENT, id: ingredient._id, price: ingredient.price });
  };

  const removeIngredient = (ingredient) => {
    dispatch({ type: REMOVE_INGREDIENT, id: ingredient._id, price: ingredient.price });
  };

  const orderHandler = () => {
    dispatch(takeOrder([...composition, composition[0]]));
  };

  // При отсутствии ингредиентов (кроме булки) создаём рандомный бургер для проверки функционала.
  useEffect(() => {
    if (composition.length === 1) {
      const ingredientsbyType = ingredients.reduce(
        (res, current) => {
          res[current.type].push(current);
          return res;
        },
        {
          bun: [],
          sauce: [],
          main: [],
        }
      );

      addIngredient(random(ingredientsbyType.sauce));
      addIngredient(random(ingredientsbyType.main));
      addIngredient(random(ingredientsbyType.main));
      addIngredient(random(ingredientsbyType.main));
      addIngredient(random(ingredientsbyType.sauce));
    }
  });

  const burger = composition.map((id) => ingredients.find((ing) => ing._id === id));
  const bun = burger[0];

  return (
    <section className={`${styles.burgerConstructor} pt-15`}>
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
        {burger.slice(1).map((ingredient, idx) => mapIngredient(ingredient, idx, () => removeIngredient(ingredient)))}
      </ul>

      <div className={styles.ingredientElement} key={burger.length}>
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
