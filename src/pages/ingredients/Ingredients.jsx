import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import styles from './ingredients.module.css';

export const Ingredients = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [ingredient, setIngredient] = useState();

  const { ingredients } = useSelector((store) => store.ingredients);

  useEffect(() => {
    const ingredientId = location.pathname.replace('/ingredients/', '');
    const ingredient = ingredients.find((i) => i._id === ingredientId);

    setIngredient(ingredients.find((i) => i._id === ingredientId));

    if (!ingredient) {
      navigate('/not-found');
    }

    console.log(ingredient);
  }, [location, navigate, ingredients]);

  if (!ingredient) {
    return <Loader message="Ищем ингредиент" />;
  }

  return (
    <div className={`${styles.ingredients} pt-20`}>
      <h1 className={styles.header}>Детали ингредиента</h1>

      <div className={`${styles.ingredientDetails}`}>
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
    </div>
  );
};
