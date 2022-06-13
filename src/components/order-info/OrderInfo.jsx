import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './order-info.module.css';

export const OrderInfo = () => {
  const { ingredients } = useSelector((store) => store.ingredients);
  const [composition, setComposition] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (ingredients.length > 0 && composition.length === 0) {
      const comp = map(random(ingredients));
      setComposition(comp);
      setTotal(comp.map((i) => i.item.price).reduce((res, pr) => (res += pr), 0));
    }
  }, [ingredients, composition]);

  return (
    <section className={styles.order}>
      <p className="text text_type_digits-default pb-10">#034533</p>
      <p className={`${styles.leftAligned} text text_type_main-medium pb-3`}>Black Hole Singularity острый бургер</p>
      <p className={`${styles.leftAligned} text text_type_main-default pb-15`}>Выполнен</p>
      <p className={`${styles.leftAligned} text text_type_main-medium pb-6`}>Состав:</p>
      <ul className={styles.ingredients}>
        {composition.map((item) => (
          <li className={styles.item} key={item._id}>
            <div className={styles.itemReps}>
              <div className={styles.image} style={{ backgroundImage: `url(${item.item.image})` }}></div>
              <p className={`${styles.itemName} text text_type_main-default pl-4`}>{item.item.name}</p>
            </div>
            <div className={`${styles.priceTag} text text_type_digits-default`}>
              {`${item.count} x ${item.item.price}`} <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles.meta} pb-6`}>
        <p className="text text_type_main-default text_color_inactive">Вчера, 13:50 i-GMT+3</p>
        <div className={`${styles.price} text_type_digits-default`}>
          {total} <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};

const map = (composition) => {
  let result = [];
  composition.forEach((item) => {
    const exist = result.find((i) => i._id === item._id);
    if (exist) {
      result = result.filter((i) => i._id !== item._id);
    }
    result = [...result, { _id: item._id, item, count: exist?.count ?? 1 }];
  });

  return result;
};

const random = (ingredients) => {
  return Array.from(Array(Math.floor(Math.random() * 10) + 5).keys()).map(
    (_) => ingredients[Math.floor(Math.random() * ingredients.length)]
  );
};
