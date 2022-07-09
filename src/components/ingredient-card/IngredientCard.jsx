import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../hooks';
import { IngredientType } from '../../utils/types';
import styles from './ingredient-card.module.css';

const IngredientCard = ({ ingredient, clickHandler }) => {
  const { _id, name, image, price, type } = ingredient;

  const { composition } = useSelector((store) => store.burger);
  let count = composition.filter((ing) => ing._id === _id).length;

  if (type === 'bun') {
    count *= 2;
  }

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { id: _id, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <li className={styles.ingredient} onClick={() => clickHandler(_id)} draggable ref={ref} style={{ opacity }}>
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

IngredientCard.propTypes = {
  ingredient: IngredientType,
  clickHandler: PropTypes.func.isRequired,
};

export default IngredientCard;
