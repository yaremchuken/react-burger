import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from '../shared/shared.module.css';

export const ResetPassword = () => {
  return (
    <div className={styles.main}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      <form action="" className={`pt-6 pb-20`}>
        <fieldset className={styles.fieldset}>
          <PasswordInput name="password" placeholder="Введите новый пароль" />
          <Input type="text" name="code" key="code" placeholder="Введите код из письма" />
        </fieldset>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>

      <ul className={`${styles.guides} mt-20`}>
        <li className={`${styles.guide} text text_type_main-default text_color_inactive`}>
          <p className={styles.guideText}>Вспомнили пароль?</p>
          <Link className={styles.guideLink} to={'/login'}>
            Войти
          </Link>
        </li>
      </ul>
    </div>
  );
};
