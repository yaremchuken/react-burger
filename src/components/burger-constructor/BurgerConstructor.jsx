import { ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';
import styles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {
  const composition = props.composition;
  const top = composition[0];
  const bottom = composition[composition.length - 1];

  const total = composition.reduce((sum, i) => sum + i.price, 0);

  return (
    <section className={`${styles.burgerConstructor} pt-15`}>
      <div className={styles.ingredientElement} key={0}>
        <div className={styles.dragElement}></div>
        <ConstructorElement
          type={'top'}
          isLocked={true}
          text={`${top.name} (верх)`}
          price={top.price}
          thumbnail={top.image}
        />
      </div>

      <ul className={styles.ingredientList}>
        {composition
          .filter((_, idx) => idx > 0 && idx < composition.length - 1)
          .map((ingredient, idx) => mapIngredient(ingredient, idx))}
      </ul>

      <div className={styles.ingredientElement} key={composition.length - 1}>
        <div className={styles.dragElement}></div>
        <ConstructorElement
          type={'bottom'}
          isLocked={true}
          text={`${bottom.name} (низ)`}
          price={bottom.price}
          thumbnail={bottom.image}
        />
      </div>
      <div className={styles.order}>
        <div className={styles.orderTotal}>
          <p className="text text_type_digits-medium">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <button onClick={props.orderClickHandler} className={styles.orderButton}>
          <span className="text text_type_main-small">Оформить заказ</span>
        </button>
      </div>
    </section>
  );
};

const mapIngredient = (ingredient, idx) => {
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
      />
    </li>
  );
};

BurgerConstructor.propTypes = {
  composition: PropTypes.arrayOf(IngredientType).isRequired,
  orderClickHandler: PropTypes.func.isRequired,
};

export default BurgerConstructor;
