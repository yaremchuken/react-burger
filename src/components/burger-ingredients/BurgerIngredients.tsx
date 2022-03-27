import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { data } from '../../utils/data';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('buns');

  return (
    <section className={styles.burgerIngredients}>
      <h1 className={`${styles.heading} text text_type_main-large pb-5`}>Соберите бургер</h1>
      <div className={styles.ingredientTypes}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredientList}>
        {getIngredientSection(
          data.filter((d) => d.type === 'bun'),
          'Булки'
        )}

        {getIngredientSection(
          data.filter((d) => d.type === 'sauce'),
          'Соусы'
        )}

        {getIngredientSection(
          data.filter((d) => d.type === 'main'),
          'Начинки'
        )}
      </div>
    </section>
  );
};

type Ingredient = {
  _id: string;
  name: string;
  image: string;
  price: number;
};

const getIngredientSection = (ingredients: Ingredient[], name: string) => {
  return (
    <div className={`${styles.ingredientSection} pt-10`} key={name}>
      <p className={`${styles.ingredientType} text text_type_main-medium`}>{name}</p>
      <ul className={styles.ingredients}>{ingredients.map((i) => getIngredientCard(i, 0))}</ul>
    </div>
  );
};

const getIngredientCard = ({ _id, name, image, price }: Ingredient, count: number) => {
  return (
    <li className={styles.ingredient} key={_id}>
      {count > 0 && <Counter count={count} size="default" />}
      <img className={styles.ingredientImage} src={image} alt={name} />
      <p className={`${styles.ingredientPrice} text text_type_digits-default`}>
        {price} <CurrencyIcon type="primary" />
      </p>
      <p className={`text text_type_main-default`}>{name}</p>
    </li>
  );
};

BurgerIngredients.propTypess = {};

export default BurgerIngredients;
