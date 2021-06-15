import React, { FC, useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Main.module.scss';

import Calendar from '../Calendar';
import Week from '../tables/Week';
import { startOfDay } from 'date-fns';

const Main: FC = () => {

  const [day, setDay] = useState<Date>(startOfDay(new Date()))

  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <button>
          Create
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <Calendar onChooseDay={(day:Date) => setDay(day)}/>
      </div>
      <Week date={day}/>
    </div>
  );
};

export default Main;
