import { FC, useEffect, useState, UIEvent } from 'react';
import { addDays, addHours, startOfWeek, format, isSameDay } from 'date-fns';

import styles from './Tables.module.scss';
import classNames from 'classnames';

interface Cell {
  time: Date;
  hour: number;
}

interface Table {
  rows: Cell[][];
  columns: Date[];
}

interface WeekProps {
  date: Date
}

const Week: FC<WeekProps> = ({date}) => {
  const [table, setTable] = useState<Table>();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    setTable({
      rows: new Array(24).fill('').map((_, hour) => {
        return new Array(7).fill('').map((_, day) => {
          return {
            time: addHours(addDays(startOfWeek(date), day), hour),
            hour: hour > 12 ? hour - 12 : hour,
          };
        });
      }),
      columns: new Array(7)
        .fill('')
        .map((_, day) => addDays(startOfWeek(date), day)),
    });
  }, [date]);

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).scrollTop > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleCellClick = (cell: Cell) => {
    console.log(cell);
  }

  return (
    <div className={styles.table}>
      <div
        className={classNames(styles.row, styles.headRow, {
          [styles.scrolled]: scrolled,
        })}
      >
        <div className={styles.emptyCell} />
        {table?.columns.map((cell) => (
          <div
            className={classNames(styles.columnTitle, {
              [styles.active]: isSameDay(cell, new Date()),
            })}
          >
            <div className={styles.titleDay}>{format(cell, 'E')}</div>
            <div className={styles.titleDate}>{cell.getDate()}</div>
          </div>
        ))}
      </div>
      <div onScroll={handleScroll} className={styles.rows}>
        {table?.rows.map((row, index) => (
          <div className={styles.row}>
            <div className={styles.timeCell}>
              {index > 12
                ? index - 12 + ' PM'
                : index !== 0
                ? index + ' AM'
                : ''}
            </div>
            {row.map((cell) => (
              <div onClick={() => handleCellClick(cell)} className={styles.cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Week;
