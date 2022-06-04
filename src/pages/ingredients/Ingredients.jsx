import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails';
import Loader from '../../components/loader/Loader';
import styles from './ingredients.module.css';

export const Ingredients = () => {
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
    <div className={`${styles.ingredients} pt-20`}>
      <h1 className={styles.header}>Детали ингредиента</h1>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
};
