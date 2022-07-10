import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../hooks';
import { passwordResetRequested } from '../../services/actions/user';
import { forgotPassword } from '../../services/apiService';
import styles from '../shared/shared.module.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    forgotPassword(email)
      .then((res) => {
        if (res && res.success) {
          dispatch(passwordResetRequested());
          navigate('/reset-password');
        } else {
          throw new Error('Reset E-mail failed');
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
          <Input
            type="email"
            name="email"
            key={'email'}
            placeholder="Укажите e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
