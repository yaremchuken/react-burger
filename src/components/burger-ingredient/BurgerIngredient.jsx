import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredient.module.css';

const BurgerIngredient = (props) => {
  const { ingredient, idx, closeHandler, sortHandler } = props;

  const ref = useRef();

  const [, drop] = useDrop({
    accept: 'sorting',
    drop: (item, monitor) => {
      if (item.idx === idx) {
        return;
      }

      console.log(item);

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (item.idx < idx && hoverClientY < hoverMiddleY) {
        return;
      }

      if (item.idx > idx && hoverClientY > hoverMiddleY) {
        return;
      }

      // +1 т.к. нулевой индекс в редюсере занимает булка, которую двигать нельзя
      sortHandler(item.idx + 1, idx + 1);
    },
  });

  const [{ display }, drag] = useDrag({
    type: 'sorting',
    item: { idx },
    collect: (monitor) => ({
      display: monitor.isDragging() ? 'none' : 'flex',
    }),
  });

  drag(drop(ref));

  if (ingredient.type === 'bun') {
    if (idx === 0) {
      return (
        <div className={styles.ingredientElement} style={{ display }}>
          <div className={styles.dragElement}></div>
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={`${ingredient.name} (верх)`}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        </div>
      );
    }
    return (
      <div className={styles.ingredientElement} style={{ display }}>
        <div className={styles.dragElement}></div>
        <ConstructorElement
          type={'bottom'}
          isLocked={true}
          text={`${ingredient.name} (низ)`}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      </div>
    );
  }

  return (
    <li className={styles.ingredientElement} draggable ref={ref} style={{ display }}>
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

BurgerIngredient.propTypes = {
  ingredient: IngredientType,
  idx: PropTypes.number.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default BurgerIngredient;
