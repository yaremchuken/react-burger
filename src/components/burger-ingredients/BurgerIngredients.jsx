import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHOOSE_INGREDIENT } from '../../services/actions/ingredients';
import styles from './burger-ingredients.module.css';

const types = [
  { key: 'bun', name: 'Булки' },
  { key: 'sauce', name: 'Соусы' },
  { key: 'main', name: 'Начинки' },
];

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((store) => store.ingredients);

  const [current, setCurrent] = useState('buns');

  const onIngredientChoose = (id) => {
    dispatch({ type: CHOOSE_INGREDIENT, ingredient: ingredients.find((i) => i._id === id) });
  };

  return (
    <section className={styles.burgerIngredients}>
      <h1 className={`${styles.heading} text text_type_main-large pb-5`}>Соберите бургер</h1>
      <div className={styles.ingredientTypes}>
        <a className={styles.tabLink} href="#Булки">
          <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>

        <a className={styles.tabLink} href="#Соусы">
          <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>

        <a className={styles.tabLink} href="#Начинки">
          <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={styles.ingredientList}>
        {types.map((type) =>
          toIngredientsSection(
            ingredients.filter((d) => d.type === type.key),
            type.name,
            onIngredientChoose
          )
        )}
      </div>
    </section>
  );
};

const toIngredientsSection = (ingredients, name, clickHandler) => {
  return (
    <div className={`${styles.ingredientSection} pt-10`} key={name} id={name}>
      <p className={`${styles.ingredientType} text text_type_main-medium`}>{name}</p>
      <ul className={styles.ingredients}>{ingredients.map((i) => toIngredientCard(i, clickHandler, 0))}</ul>
    </div>
  );
};

const toIngredientCard = ({ _id, name, image, price }, clickHandler, count) => {
  return (
    <li className={styles.ingredient} key={_id} onClick={() => clickHandler(_id)}>
      {count > 0 && <Counter count={count} size="default" />}
      <img className={styles.ingredientImage} src={image} alt={name} />
      <p className={`${styles.ingredientPrice} text text_type_digits-default`}>
        {price}{' '}
        <span className={styles.currency}>
          <CurrencyIcon type="primary" />
        </span>
      </p>
      <p className={`text text_type_main-default`}>{name}</p>
    </li>
  );
};

export default BurgerIngredients;
