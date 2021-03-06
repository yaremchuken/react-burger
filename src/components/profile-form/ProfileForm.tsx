import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { updateUser } from '../../services/thunks/user';
import styles from './profile-form.module.css';

export const ProfileForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [edits, setEdits] = useState<Array<string>>([]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispath = useDispatch();

  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user && !name) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, name, setName, setEmail]);

  const updateUserData = (e: SyntheticEvent) => {
    e.preventDefault();
    const form = { name, email, password };
    if (password.length > 0) {
      form.password = password;
    }
    dispath(updateUser(form));
    setEdits([]);
  };

  const onChangeValueClick = (ref: MutableRefObject<HTMLInputElement | null>) => {
    if (!ref.current) {
      return;
    }
    if (edits.includes(ref.current.name)) {
      setEdits(edits.filter((e) => e !== ref.current!.name));
    } else {
      setEdits([...edits, ref.current.name]);
      setTimeout(() => ref.current!.focus(), 0);
    }
  };

  const isDirty = () => {
    if (!user) {
      return;
    }
    return password.length > 0 || user.name !== name || user.email !== email;
  };

  const clearChanges = () => {
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
    setPassword('');
    setEdits([]);
  };

  if (!user) {
    return null;
  }

  return (
    <form>
      <fieldset className={`${styles.fieldset} mb-6`}>
        <Input
          type="text"
          name="name"
          key={'name'}
          placeholder="??????"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={nameRef}
          icon={`${edits.includes('name') ? 'CloseIcon' : 'EditIcon'}`}
          onIconClick={(e) => onChangeValueClick(nameRef)}
          disabled={!edits.includes('name')}
        />
        <Input
          type="text"
          name="email"
          key={'email'}
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
          icon={`${edits.includes('email') ? 'CloseIcon' : 'EditIcon'}`}
          onIconClick={(e) => onChangeValueClick(emailRef)}
          disabled={!edits.includes('email')}
        />
        <Input
          type="password"
          name="password"
          key={'password'}
          placeholder="????????????"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ref={passwordRef}
          icon={`${edits.includes('password') ? 'CloseIcon' : 'EditIcon'}`}
          onIconClick={(e) => onChangeValueClick(passwordRef)}
          disabled={!edits.includes('password')}
        />
      </fieldset>

      {isDirty() && (
        <div className={styles.controllers}>
          <button className={`text text_type_main-default ${styles.cancelButton}`} onClick={clearChanges}>
            ????????????
          </button>
          <Button type="primary" size="medium" onClick={updateUserData}>
            ??????????????????
          </Button>
        </div>
      )}
    </form>
  );
};
