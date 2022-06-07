import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/apiService';
import styles from '../shared/shared.module.css';

export const ResetPassword = () => {
  const [password, setPasswod] = useState('');
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const { passwordResetRequested } = useSelector((storer) => storer.user);

  useEffect(() => {
    if (!passwordResetRequested) {
      navigate('/forgot-password');
    }
  }, [passwordResetRequested, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    resetPassword({ password, token })
      .then((res) => {
        if (res && res.success) {
          navigate('/login');
        } else {
          throw new Error('Reset Password failed');
        }
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  return (
    <div className={styles.main}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      <form onSubmit={submitHandler} className={`pt-6 pb-20`}>
        <fieldset className={styles.fieldset}>
          <PasswordInput
            name="password"
            placeholder="Введите новый пароль"
            value={password}
            onChange={(e) => setPasswod(e.target.value)}
          />
          <Input
            type="text"
            name="token"
            key="token"
            placeholder="Введите код из письма"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
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
