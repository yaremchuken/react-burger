import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-ingredients/BurgerIngredients';
import BurgerIngredients from '../burger-constructor/BurgerConstructor';
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
