import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from '../shared/shared.module.css';

export const ForgotPassword = () => {
  return (
    <div className={styles.main}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      <form action="" className={`pt-6 pb-20`}>
        <fieldset className={styles.fieldset}>
          <Input type="email" name="email" key={'email'} placeholder="Укажите e-mail" />
        </fieldset>
        <Button type="primary" size="medium">
          Восстановить
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
