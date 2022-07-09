import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import styles from './modal.module.css';

const container = document.querySelector('#modals');

type ModalProps = {
  title?: string;
  onCloseDemand: () => void;
  children: any;
};

const Modal = ({ title, onCloseDemand, children }: ModalProps) => {
  useEffect(() => {
    const handleEscKeydown = (event: KeyboardEvent) => {
      event.key === 'Escape' && onCloseDemand();
    };

    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, [onCloseDemand]);

  if (!container) {
    return null;
  }

  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.heading}>
          <h3 className={`text text_type_main-large`}>{title}</h3>
          <CloseIcon type="primary" onClick={onCloseDemand} />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onCloseDemand} />
    </>,
    container
  );
};

export default Modal;
