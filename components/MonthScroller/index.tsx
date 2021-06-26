import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';

import styles from './MonthScroller.module.scss';

import useStore from '../../hooks/useStore';

const MonthScroller: FC = () => {
  const { calendarStore } = useStore();

  const nextMonth = () => {
    calendarStore.changeMonth(1);
  };

  const prevMonth = () => {
    calendarStore.changeMonth(-1);
  };

  return (
    <div className={styles.scroller}>
      <button onClick={prevMonth}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className={styles.month}>
        {format(calendarStore.month, 'MMMM yyyy')}
      </div>
      <button onClick={nextMonth}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default observer(MonthScroller);
