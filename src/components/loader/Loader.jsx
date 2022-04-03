import React from 'react';
import PropTypes from 'prop-types';
import styles from './loader.module.css';

const Loader = (props) => {
  return <div className={`${styles.loader} text text_type_main-medium`}>{props.message}</div>;
};

Loader.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loader;
