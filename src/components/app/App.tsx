import React from 'react';
import { ingredients, initialBurger } from '../../utils/data';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import styles from './app.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor composition={initialBurger.map((id) => ingredients.find((i) => i._id === id)!)} />
      </div>
    </div>
  );
};

export default App;
