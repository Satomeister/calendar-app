import React, { FC, useEffect, useState } from "react";
import {
  addDays,
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Calendar.module.scss";
import classNames from "classnames";

interface CalendarDay {
  day: number;
  isSameMonth: boolean;
  current: boolean;
}

const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

const Calendar: FC = () => {
  const [month, setMonth] = useState<Date>(new Date());
  const [calendar, setCalendar] = useState<Array<CalendarDay[]>>([]);

  useEffect(() => {
    const firstDay = startOfWeek(startOfMonth(month));

    let day = addDays(firstDay, -1);

    const calendar: Array<CalendarDay[]> = [];

    for (let w = 0; w < 6; w++) {
      const days = new Array(7).fill("").map(() => {
        const d = addDays(day, 1);
        day = d;
        return {
          day: d.getDate(),
          isSameMonth: !isSameMonth(d, month),
          current: isSameDay(d, new Date()),
        };
      });
      calendar.push(days);
    }

    setCalendar(calendar);
  }, [month]);

  const nextMonth = () => {
    setMonth((prev) => addMonths(prev, 1));
  };

  const prevMonth = () => {
    setMonth((prev) => addMonths(prev, -1));
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={prevMonth}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>{format(month, "MMMM yyyy")}</span>
        <button onClick={nextMonth}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

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
                    className={classNames(styles.cell, {
                      [styles.sameMonth]: day.isSameMonth,
                      [styles.current]: day.current,
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

export default Calendar;
