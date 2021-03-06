import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import { registerUser } from '../../services/thunks/user';
import styles from '../shared/shared.module.css';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, registerFailed } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className={styles.main}>
      {registerFailed && (
        <p className={`text text_type_main-default pb-5 ${styles.error}`}>
          Не удалось зарегистрироваться, проверьте правильность заполнения полей формы
        </p>
      )}

      <h2 className="text text_type_main-medium">Регистрация</h2>

      <form onSubmit={onSubmit} className={`pt-6 pb-20`}>
        <fieldset className={styles.fieldset}>
          <Input
            type="text"
            name="name"
            key={'name'}
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            name="email"
            key={'email'}
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput name={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
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
