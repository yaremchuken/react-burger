import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from '../shared/shared.module.css';

export const Login = () => {
  return (
    <div className={styles.main}>
      <h2 className="text text_type_main-medium">Вход</h2>

      <form action="" className={`pt-6 pb-20`}>
        <fieldset className={styles.fieldset}>
          <Input type="email" name="email" key={'email'} placeholder="E-mail" />
          <PasswordInput name={'password'} />
        </fieldset>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>

      <ul className={`${styles.guides} mt-20`}>
        <li className={`${styles.guide} text text_type_main-default text_color_inactive`}>
          <p className={styles.guideText}>Вы - новый пользователь? </p>
          <Link className={styles.guideLink} to={'/register'}>
            Зарегистрироваться
          </Link>
        </li>

        <li className={`${styles.guide} text text_type_main-default text_color_inactive`}>
          <p className={styles.guideText}>Забыли пароль? </p>
          <Link className={styles.guideLink} to={'/forgot-password'}>
            Восстановить пароль
          </Link>
        </li>
      </ul>
    </div>
  );
};
