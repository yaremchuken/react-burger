import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [ingredient, setIngredient] = useState();

  const { ingredients } = useSelector((store) => store.ingredients);

  useEffect(() => {
    if (ingredients.length > 0) {
      const ingredient = ingredients.find((i) => i._id === params.id);
      if (ingredient) {
        setIngredient(ingredient);
      } else {
        navigate('/not-found');
      }
    }
  }, [navigate, ingredients, params]);

  if (!ingredient) {
    return <Loader message="Ищем ингредиент" />;
  }

  return (
    <div className={`${styles.ingredientDetails} pb-15`}>
      <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
      <p className="text text_type_main-medium pt-4 pb-8">{ingredient.name}</p>
      <ul className={styles.nutritionList}>
        <li className={styles.nutritionDetail}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </li>

        <li className={styles.nutritionDetail}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </li>

        <li className={styles.nutritionDetail}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </li>

        <li className={styles.nutritionDetail}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
