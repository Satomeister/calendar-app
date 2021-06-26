import React, { FC, useEffect, useState, UIEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { addDays, addHours, startOfWeek, format, isSameDay } from 'date-fns';
import classNames from 'classnames';

import styles from './Tables.module.scss';
import useStore from '../../hooks/useStore';
import Cell, { Cell as ICell } from '../Cell';

interface Table {
  rows: ICell[][];
  columns: Date[];
}

const Week: FC = () => {
  const { calendarStore } = useStore();

  const [table, setTable] = useState<Table>({ rows: [], columns: [] });
  const [scrolled, setScrolled] = useState<boolean>(false);
  

  useEffect(() => {
    setTable({
      rows: new Array(24).fill('').map((_, hour) => {
        return new Array(7).fill('').map((_, day) => {
          return {
            time: addHours(addDays(startOfWeek(calendarStore.date), day), hour),
            hour: hour > 12 ? hour - 12 : hour,
            tasks: [],
            createTask: false,
          };
        });
      }),
      columns: new Array(7)
        .fill('')
        .map((_, day) => addDays(startOfWeek(calendarStore.date), day)),
    });
  }, [calendarStore.date]);

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).scrollTop > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // const handleCellClick = (e: React.MouseEvent<HTMLDivElement>, cell: Cell) => {
  //   setTable((prev) => ({
  //     ...prev,
  //     rows: prev.rows.map((row) =>
  //       row.map((c) => {
  //         if (c.time === cell.time) {
  //           c.createTask = true;
  //         }
  //         return c;
  //       })
  //     ),
  //   }));
  //
  //   setCreateTask({
  //     open: true,
  //     relEl: e.target as HTMLDivElement,
  //   });
  // };

  // const handleModalClose = () => {
  //   setCreateTask({ open: false });
  //   setTable((prev) => ({
  //     ...prev,
  //     rows: prev.rows.map((row) =>
  //       row.map((c) => {
  //         c.createTask = false;
  //
  //         return c;
  //       })
  //     ),
  //   }));
  // };

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
              <Cell cell={cell}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default observer(Week);
