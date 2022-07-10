import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import { Ingredient, IngredientType } from '../../models/Ingredient';
import { Order } from '../../models/Order';
import { wsConnectionClose, wsConnectionStart } from '../../services/actions/web-socket';
import { ACCESS_TOKEN_COOKIE_PATH } from '../../utils/constants';
import { dateString, getCookie, mapOrderStatus } from '../../utils/utils';
import styles from './order-info.module.css';

export const OrderInfo = () => {
  const { ingredients } = useSelector((store) => store.ingredients);
  const { wsRequested, wsConnected, orders } = useSelector((store) => store.webSocket);

  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [order, setOrder] = useState<Order | null>(null);
  const [composition, setComposition] = useState<ReadonlyArray<{ ingredient: Ingredient; count: number }>>([]);

  const total = () => {
    return composition.map((i) => i.ingredient.price * i.count).reduce((res, pr) => (res += pr), 0);
  };

  useEffect(() => {
    if (!wsConnected && !wsRequested) {
      const profile = location.pathname.startsWith('/profile');
      let token = getCookie(ACCESS_TOKEN_COOKIE_PATH);
      if (token) {
        token = token.replace('Bearer ', '');
      }
      dispatch(wsConnectionStart(profile ? '' : '/all', profile ? token : undefined));
    }
  }, [wsConnected, wsRequested, dispatch, location]);

  useEffect(() => {
    if (orders.length > 0 && composition.length === 0) {
      const order = orders.find((o) => o.number === Number(params.id))!;
      const idsToCount = reduce(order.ingredients);
      setOrder(order);
      setComposition(
        idsToCount
          .map((item) => {
            return { ingredient: ingredients.find((i) => i._id === item.id)!, count: item.count };
          })
          .sort((a, b) =>
            a.ingredient.type === IngredientType.BUN ? -1 : a.ingredient._id.localeCompare(b.ingredient._id)
          )
      );
    }
  }, [ingredients, composition, orders, params]);

  useEffect(() => {
    return () => {
      if (wsConnected) {
        dispatch(wsConnectionClose());
      }
    };
  }, [wsConnected, dispatch]);

  if (!order) {
    return null;
  }

  return (
    <section className={styles.order}>
      <p className="text text_type_digits-default pb-10">#{order.number}</p>
      <p className={`${styles.title} text text_type_main-medium pb-3`}>{order.name}</p>
      <p
        className={`${styles.leftAligned} text text_type_main-default pb-15 ${
          order.status === 'done' && 'text_color_inactive'
        }`}
      >
        {mapOrderStatus(order)}
      </p>
      <p className={`${styles.leftAligned} text text_type_main-medium pb-6`}>Состав:</p>
      <ul className={styles.ingredients}>
        {composition.map((item, idx) => (
          <li className={styles.item} key={idx}>
            <div className={styles.itemReps}>
              <div className={styles.image} style={{ backgroundImage: `url(${item.ingredient.image})` }}></div>
              <p className={`${styles.itemName} text text_type_main-default pl-4`}>{item.ingredient.name}</p>
            </div>
            <div className={`${styles.priceTag} text text_type_digits-default`}>
              {`${item.count} x ${item.ingredient.price}`} <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles.meta} pb-6`}>
        <p className="text text_type_main-default text_color_inactive">{dateString(order.createdAt)}</p>
        <div className={`${styles.price} text_type_digits-default`}>
          {total()} <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};

const reduce = (ingredientIds: ReadonlyArray<string>) => {
  let result: Array<{ id: string; count: number }> = [];
  ingredientIds.forEach((id) => {
    const exist = result.find((i) => i.id === id);
    if (exist) {
      result = result.filter((i) => i.id !== id);
    }
    result = [...result, { id, count: (exist?.count ?? 0) + 1 }];
  });

  return result;
};
