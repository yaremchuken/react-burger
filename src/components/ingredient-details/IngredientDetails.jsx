import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
  const { chosenIngredient } = useSelector((store) => store.ingredients);

  return (
    <div className={`${styles.ingredientDetails} pb-15`}>
      <img className={styles.image} src={chosenIngredient.image} alt={chosenIngredient.name} />
      <p className="text text_type_main-medium pt-4 pb-8">{chosenIngredient.name}</p>
      <ul className={styles.nutritionList}>
        <li className={styles.nutritionDetail}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{chosenIngredient.calories}</p>
        </li>

        <li className={styles.nutritionDetail}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{chosenIngredient.proteins}</p>
        </li>

        <li className={styles.nutritionDetail}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{chosenIngredient.fat}</p>
        </li>

        <li className={styles.nutritionDetail}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{chosenIngredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
