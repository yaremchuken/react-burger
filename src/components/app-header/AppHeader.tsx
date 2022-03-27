import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={`${styles.header} m-10`}>
      <nav className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li className={styles.leftBar}>
            <ul className={styles.twoListBar}>
              <li className={`${styles.navbarElement} pt-4 pb-4 pr-5 pl-5`}>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">Конструктор</p>
              </li>

              <li className={`${styles.navbarElement} pt-4 pb-4 pr-5 pl-5`}>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
              </li>
            </ul>
          </li>

          <li className={`${styles.navbarElement} ${styles.centerBar} pt-4 pb-4 pr-5 pl-5`}>
            <Logo />
          </li>

          <li className={`${styles.navbarElement} ${styles.rightBar} pt-4 pb-4 pr-5 pl-5`}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
