import IngredientDetails from '../../components/ingredient-details/IngredientDetails';
import styles from './ingredients.module.css';

export const Ingredients = () => {
  return (
    <div className={`${styles.ingredients} pt-20`}>
      <h1 className={styles.header}>Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};
