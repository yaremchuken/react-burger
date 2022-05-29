import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from '../shared/shared.module.css';

export const Register = () => {
  return (
    <div className={styles.main}>
      <h2 className="text text_type_main-medium">Регистрация</h2>

      <form action="" className={`pt-6 pb-20`}>
        <fieldset className={styles.fieldset}>
          <Input type="text" name="name" key={'name'} placeholder="Имя" />
          <Input type="email" name="email" key={'email'} placeholder="E-mail" />
          <PasswordInput name={'password'} />
        </fieldset>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>

      <ul className={`${styles.guides} mt-20`}>
        <li className={`${styles.guide} text text_type_main-default text_color_inactive`}>
          <p className={styles.guideText}>Уже зарегистрированы?</p>
          <Link className={styles.guideLink} to={'/login'}>
            Войти
          </Link>
        </li>
      </ul>
    </div>
  );
};
