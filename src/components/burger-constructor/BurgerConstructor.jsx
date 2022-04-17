import { ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect } from 'react';
import { BurgerContext } from '../../services/BurgerContext';
import { IngredientsContext } from '../../services/IngredientsContext';
import { ActionType } from '../../utils/enums';
import { random } from '../../utils/utils';
import styles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {
  const { ingredients } = useContext(IngredientsContext);
  const { burgerState, burgerDispatcher } = useContext(BurgerContext);

  const addIngredient = useCallback(
    (ingredient) => {
      burgerDispatcher({ type: ActionType.ADD_INGREDIENT, payload: ingredient });
    },
    [burgerDispatcher]
  );

  const removeIngredient = useCallback(
    (ingredient) => {
      burgerDispatcher({ type: ActionType.REMOVE_INGREDIENT, payload: ingredient });
    },
    [burgerDispatcher]
  );

  // При отсутствии ингредиентов (кроме булки) создаём рандомный бургер для проверки функционала.
  useEffect(() => {
    if (burgerState.composition.length === 1) {
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

  const composition = burgerState.composition.map((id) => ingredients.find((ing) => ing._id === id));
  const bun = composition[0];

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
          <p className="text text_type_digits-medium">{burgerState.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <button onClick={props.orderClickHandler} className={styles.orderButton}>
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

BurgerConstructor.propTypes = {
  orderClickHandler: PropTypes.func.isRequired,
};

export default BurgerConstructor;
