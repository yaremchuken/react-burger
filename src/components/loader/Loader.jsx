import React from 'react';
import PropTypes from 'prop-types';
import styles from './loader.module.css';
import loaderImg from '../../image/loader.png';

const Loader = (props) => {
  return (
    <div className={`${styles.loader} text text_type_main-medium`}>
      <img className={styles.image} src={loaderImg} alt="Загрузка" />
      {props.message}
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loader;
