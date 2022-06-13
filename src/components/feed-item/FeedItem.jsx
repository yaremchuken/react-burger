import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './feed-item.module.css';

export const FeedItem = ({ withStatus, onClickHandler }) => {
  const { ingredients } = useSelector((store) => store.ingredients);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length === 0) {
      setItems(random(ingredients));
    }
  }, [items, ingredients]);

  return (
    <li className={styles.feedItem} onClick={onClickHandler}>
      <div className={styles.meta}>
        <p className={`${styles.id} text_type_digits-default`}>#034535</p>
        <p className={`${styles.date} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
      </div>

      <div className={styles.statusTitle}>
        <div className={`${styles.leftAligned} text text_type_main-medium`}>Death Star Starship Main бургер</div>
        {withStatus && <div className={`${styles.leftAligned} text text_type_main-default pt-2`}>Выполнен</div>}
      </div>

      <div className={styles.composition}>
        <div className={styles.ingredients}>
          {items.map(
            (item, idx) =>
              idx < 6 && (
                <React.Fragment key={idx}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${item.image})`,
                      zIndex: items.length - idx,
                      opacity: idx < 5 ? 1 : 0.6,
                    }}
                  ></div>
                  {idx === 5 && (
                    <span className={`${styles.counter} text text_type_main-default`}>+{items.length - 5}</span>
                  )}
                </React.Fragment>
              )
          )}
        </div>
        <div className={`${styles.price} text_type_digits-default`}>
          480 <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

const random = (ingredients) => {
  return Array.from(Array(Math.floor(Math.random() * 10) + 3).keys()).map(
    (_) => ingredients[Math.floor(Math.random() * ingredients.length)]
  );
};
