import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { Ingredient } from '../../models/Ingredient';
import IngredientCard from '../ingredient-card/IngredientCard';
import styles from './burger-ingredients.module.css';

const types = [
  { key: 'bun', name: 'Булки' },
  { key: 'sauce', name: 'Соусы' },
  { key: 'main', name: 'Начинки' },
];

const BurgerIngredients = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { ingredients } = useSelector((store) => store.ingredients);

  const [current, setCurrent] = useState('buns');
  const [holderOffset, setHolderOffset] = useState(0);

  const bunRef = useRef<HTMLDivElement | null>(null);
  const sauceRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  const onIngredientChoose = (id: string) => {
    const pathname = `/ingredients/${id}`;
    navigate(pathname, { state: { background: { ...location, pathname } } });
  };

  useEffect(() => {
    if (bunRef.current && holderOffset === 0) {
      setHolderOffset(bunRef.current.getBoundingClientRect().y);
    }
  }, [bunRef, holderOffset]);

  // Выделяем таб содержимое которого сейчас занимает основное экранное пространство (ближе всего к верхней границе)
  const tabAdviser = () => {
    const closest = [getYOffset('buns', bunRef), getYOffset('sauces', sauceRef), getYOffset('mains', mainRef)].reduce(
      (prev, curr) => (curr.yPos < prev.yPos ? curr : prev)
    ).key;

    if (current !== closest) {
      setCurrent(closest);
    }
  };

  const getYOffset = (key: 'buns' | 'sauces' | 'mains', ref: MutableRefObject<HTMLDivElement | null>) => {
    if (!ref.current) {
      return { key, yPos: 0 };
    }
    return { key, yPos: Math.abs(ref.current.getBoundingClientRect().y - holderOffset) };
  };

  if (ingredients.length === 0) {
    return null;
  }

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
      <div className={styles.ingredientList} onScroll={tabAdviser}>
        {types.map((type) =>
          toIngredientsSection(
            ingredients.filter((d) => d.type === type.key),
            type.name,
            onIngredientChoose,
            type.key === 'bun' ? bunRef : type.key === 'sauce' ? sauceRef : mainRef
          )
        )}
      </div>
    </section>
  );
};

const toIngredientsSection = (
  ingredients: ReadonlyArray<Ingredient>,
  name: string,
  clickHandler: (id: string) => void,
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  return (
    <div className={`${styles.ingredientSection} pt-10`} key={name} id={name} ref={ref}>
      <p className={`${styles.ingredientType} text text_type_main-medium`}>{name}</p>
      <ul className={styles.ingredients}>
        {ingredients.map((i) => (
          <IngredientCard key={i._id} ingredient={i} clickHandler={clickHandler} />
        ))}
      </ul>
    </div>
  );
};

export default BurgerIngredients;
