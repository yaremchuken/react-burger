import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import styles from './app.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.main}>
        <BurgerConstructor />
        <BurgerIngredients />
      </div>
    </div>
  );
};

export default App;
