import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import styles from './modal.module.css';

const container = document.querySelector('#modals');

const Modal = ({ title, onCloseDemand, children }) => {
  useEffect(() => {
    const handleEscKeydown = (event) => {
      event.key === 'Escape' && onCloseDemand();
    };

    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, [onCloseDemand]);

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

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onCloseDemand: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
