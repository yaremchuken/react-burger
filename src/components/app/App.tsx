import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import styles from './app.module.css';
import { ingredients, initialBurger } from '../../utils/data';

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
