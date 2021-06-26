import React, { FC, useEffect, useState } from 'react';
import {
  addDays,
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import styles from './Calendar.module.scss';

import useStore from '../../hooks/useStore';
import MonthScroller from '../MonthScroller';

interface CalendarDay {
  date: Date;
  day: number;
  isSameMonth: boolean;
  current: boolean;
  chosen: boolean;
}

const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar: FC = () => {
  const { calendarStore } = useStore();
  const [calendar, setCalendar] = useState<Array<CalendarDay[]>>([]);

  useEffect(() => {
    const firstDay = startOfWeek(startOfMonth(calendarStore.month));

    let day = addDays(firstDay, -1);

    const calendar: Array<CalendarDay[]> = [];

    for (let w = 0; w < 6; w++) {
      const days = new Array(7).fill('').map(() => {
        const d = addDays(day, 1);
        day = d;
        return {
          date: d,
          day: d.getDate(),
          isSameMonth: !isSameMonth(d, calendarStore.month),
          current: isSameDay(d, new Date()),
          chosen: !!calendarStore.date && isSameDay(calendarStore.date, d),
        };
      });
      calendar.push(days);
    }

    setCalendar(calendar);
  }, [calendarStore.month, calendarStore.date]);

  const handleClick = ({ date }: CalendarDay) => {
    calendarStore.setDate(date);
  };

  return (
    <div className={styles.calendar}>

      <MonthScroller />

      <div>
        {dayNames.map((name, i) => (
          <span
            className={classNames(
              styles.cell,
              styles.sameMonth,
              styles.disabled
            )}
            key={i}
          >
            {name}
          </span>
        ))}
        {calendar.map((week, i) => {
          return (
            <div key={i}>
              {week.map((day, i) => {
                return (
                  <span
                    onClick={() => handleClick(day)}
                    className={classNames(styles.cell, {
                      [styles.sameMonth]: day.isSameMonth,
                      [styles.current]: day.current,
                      [styles.chosen]: day.chosen,
                    })}
                    key={i}
                  >
                    {day.day}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(Calendar);
