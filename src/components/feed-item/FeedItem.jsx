import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { OrderType } from '../../utils/types';
import { dateString, mapOrderStatus } from '../../utils/utils';
import styles from './feed-item.module.css';

export const FeedItem = ({ order, withStatus, onClickHandler }) => {
  const { ingredients } = useSelector((store) => store.ingredients);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (order && images.length === 0) {
      setImages(order.ingredients.map((id) => ingredients.find((i) => i._id === id).image));
    }
  }, [order, images, ingredients]);

  if (!images) {
    return null;
  }

  const total = order.ingredients.reduce((res, id) => {
    const ingredient = ingredients.find((i) => i._id === id);
    res += ingredient.price;
    return res;
  }, 0);

  return (
    <li className={styles.feedItem} onClick={onClickHandler}>
      <div className={styles.meta}>
        <p className={`${styles.id} text_type_digits-default`}>#{order.number}</p>
        <p className={`${styles.date} text text_type_main-default text_color_inactive`}>
          {dateString(order.createdAt)}
        </p>
      </div>

      <div className={styles.statusTitle}>
        <div className={`${styles.leftAligned} text text_type_main-medium`}>{order.name}</div>
        {withStatus && (
          <div
            className={`${styles.leftAligned} text text_type_main-default pt-2 ${
              order.status === 'done' && 'text_color_inactive'
            }`}
          >
            {mapOrderStatus(order)}
          </div>
        )}
      </div>

      <div className={styles.composition}>
        <div className={styles.ingredients}>
          {images.map(
            (item, idx) =>
              idx < 6 && (
                <React.Fragment key={idx}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${item})`,
                      zIndex: images.length - idx,
                      opacity: idx < 5 ? 1 : 0.6,
                    }}
                  ></div>
                  {idx === 5 && (
                    <span className={`${styles.counter} text text_type_main-default`}>+{images.length - 5}</span>
                  )}
                </React.Fragment>
              )
          )}
        </div>
        <div className={`${styles.price} text_type_digits-default`}>
          {total} <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

FeedItem.propTypes = {
  order: OrderType.isRequired,
  withStatus: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
};
