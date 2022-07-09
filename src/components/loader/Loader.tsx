import loaderImg from '../../image/loader.png';
import styles from './loader.module.css';

type LoaderProps = {
  message: string;
};

const Loader = ({ message }: LoaderProps) => {
  return (
    <div className={`${styles.loader} text text_type_main-medium`}>
      <img className={styles.image} src={loaderImg} alt="Загрузка" />
      {message}
    </div>
  );
};

export default Loader;
