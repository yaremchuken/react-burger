import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

export const Login = () => {
  const [showPassword, setShowPassword] = useState();

  return (
    <section className={`${styles.login}`}>
      <h2 className="text text_type_main-medium">Вход</h2>

      <form action="" className={`${styles.form} pt-6 pb-20`}>
        <fieldset className={styles.fieldset}>
          <input
            type="email"
            id="email"
            name="email"
            className={`${styles.input} text text_type_main-default text_color_inactive`}
            placeholder="E-mail"
            required
          />
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            id="password"
            name="password"
            className={`${styles.input} ${styles.password} text text_type_main-default text_color_inactive`}
            placeholder="Пароль"
            required
          />
          <button type="button" className={styles.showPassword} onClick={() => setShowPassword(!showPassword)}></button>
        </fieldset>
        <button type="submit" className={`${styles.submit} text text_type_main-default`}>
          Войти
        </button>
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
          <Link className={styles.guideLink} to={'/reset-password'}>
            Восстановить пароль
          </Link>
        </li>
      </ul>
    </section>
  );
};
