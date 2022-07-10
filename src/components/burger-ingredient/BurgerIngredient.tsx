import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Ingredient, IngredientType } from '../../models/Ingredient';
import styles from './burger-ingredient.module.css';

type BurgerIngredientProps = {
  ingredient: Ingredient;
  idx: number;
  closeHandler?: () => void;
  sortHandler?: (idxFrom: number, idxTo: number, onTop: boolean) => void;
};

const BurgerIngredient = ({ ingredient, idx, closeHandler, sortHandler }: BurgerIngredientProps) => {
  const ref = useRef<HTMLLIElement | null>(null);

  const [, drop] = useDrop({
    accept: 'sorting',
    drop: (item: { idx: number }, monitor) => {
      if (!ref.current || !sortHandler) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      let onTop = false;
      if (hoverClientY < hoverMiddleY) {
        onTop = true;
      }

      // +1 т.к. нулевой индекс в редюсере занимает булка, которую двигать нельзя
      sortHandler(item.idx + 1, idx + (item.idx < idx ? 0 : 1) + (onTop ? 0 : 1), onTop);
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

  if (ingredient.type === IngredientType.BUN) {
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

export default BurgerIngredient;
