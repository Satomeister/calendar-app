import React, { FC, useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Main.module.scss';

import Calendar from '../Calendar';
import Week from '../tables/Week';
import Button from '../Button';

const Main: FC = () => {
  const handleCreate = () => {};

  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <Button onClick={handleCreate}>
          Create
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Calendar />
      </div>
      <Week />
    </div>
  );
};

export default Main;
