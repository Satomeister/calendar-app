import React, { FC, useRef, useState } from 'react';

import styles from './Cell.module.scss';

import ModalWrapper from '../modals/ModalWrapper';

export interface Task {
  title: string;
}

export interface Cell {
  time: Date;
  hour: number;
  tasks: Task[];
}

interface CellProps {
  cell: Cell
}

const Cell:FC<CellProps> = ({cell}) => {
  const cellRef = useRef<HTMLDivElement>(null)

  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      {modal && cellRef.current && (
        <ModalWrapper relEl={cellRef.current} onClose={() => setModal(false)} />
      )}
      <div
        onClick={() => setModal(true)}
        className={styles.cell}
        ref={cellRef}
      >
        {modal && <div className={styles.task} />}
      </div></>

  )
}

export default Cell