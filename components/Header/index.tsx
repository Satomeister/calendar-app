import { FC, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

import styles from './Header.module.scss';

import useStore from '../../hooks/useStore';
import MonthScroller from '../MonthScroller';
import Button from '../Button';

const Header: FC = () => {
  const router = useRouter();

  const { userStore } = useStore();
  const { calendarStore } = useStore();

  const handleClickLogout = () => {
    (async () => {
      await router.push('/login');
      userStore.logout();
    })();
  };

  const handleClickToday = () => {
    calendarStore.setDate(new Date());
    calendarStore.setCurrentMonth();
  };

  return (
    <div className={styles.header}>
      {userStore.isAuth && userStore.user && (
        <>
          <img src={userStore.user.photoUrl} className={styles.photo} />
          <div className={styles.name}>{userStore.user.name}</div>
          <Button
            style={{ margin: '0 20px' }}
            onClick={handleClickToday}
            square
          >
            Today
          </Button>
          <MonthScroller />
          <Button onClick={handleClickLogout} className={styles.logout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
};
export default observer(Header);
