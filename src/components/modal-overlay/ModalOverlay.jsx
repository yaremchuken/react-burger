import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
  return <div className={styles.modalOverlay} onClick={onClick} />;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
