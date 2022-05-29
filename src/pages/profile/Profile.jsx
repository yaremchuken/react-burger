import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';

export const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={`${styles.menuItem} text text_type_main-medium`}>Профиль</li>
          <li className={`${styles.menuItem} text text_type_main-medium text_color_inactive`}>История заказов</li>
          <li className={`${styles.menuItem} text text_type_main-medium text_color_inactive`}>Выход</li>
        </ul>
        <p className={`${styles.menuRemark} text text_type_main-default text_color_inactive pt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form action="">
        <fieldset className={styles.fieldset}>
          <Input type="text" name="name" key={'name'} placeholder="Имя" value="Марк" />
          <EmailInput name="email" key="email" value="me@me.ru" />
          <PasswordInput name={'password'} value="111111" />
        </fieldset>
      </form>
    </div>
  );
};
