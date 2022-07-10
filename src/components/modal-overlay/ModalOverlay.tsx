import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay = ({ onClick }: ModalOverlayProps) => {
  return <div className={styles.modalOverlay} onClick={onClick} />;
};

export default ModalOverlay;
