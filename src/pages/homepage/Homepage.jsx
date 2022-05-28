import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import styles from './homepage.module.css';

export const Homepage = () => {
  return (
    <div className={styles.homepage}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
};
