import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
  return <div className={styles.modalOverlay} onClick={onClick} />;
};

export default ModalOverlay;
