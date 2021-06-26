import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './modal.module.scss';

interface CreateTaskModalProps {
  relEl: HTMLDivElement;
  onClose: () => void;
}

interface Position {
  top: number;
  left: number;
}

const ModalWrapper: FC<CreateTaskModalProps> = ({ relEl, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState<Position>();

  const updatePosition = useCallback(() => {
    if (!modalRef.current) return;

    const elPosition = relEl.getBoundingClientRect();

    let position: Position = { left: 0, top: 0 };

    const modal = modalRef.current;
    const modalWidth = modal.offsetWidth;
    const modalHeight = modal.offsetHeight;

    // x
    if (elPosition.left > modalWidth) {
      position.left = elPosition.left - modalWidth - 10;
    } else if (document.body.offsetWidth - elPosition.right > modalWidth) {
      position.left = elPosition.right + 4;
    } else {
      position.left = 20;
    }

    // y
    if (document.body.offsetHeight > elPosition.bottom + modalHeight / 2) {
      if (elPosition.top < modalHeight / 2) {
        position.top = 20;
      } else {
        position.top = elPosition.top + elPosition.height / 2 - modalHeight / 2;
      }
    } else {
      position.top = document.body.offsetHeight - modalHeight - 20;
    }

    setStyle(position);
  }, []);

  const close = useCallback((e: MouseEvent) => {
    if (e.target !== modalRef.current) {
      onClose();
    }
  }, []);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('click', close);
      window.removeEventListener('resize', updatePosition);
    };
  }, [modalRef]);

  return (
    <div
      ref={modalRef}
      style={!!style ? style : { opacity: 0 }}
      className={styles.modal}
    >
      <div className={styles.header}>
        <button onClick={() => onClose()}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};
export default ModalWrapper;
