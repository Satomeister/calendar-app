import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import Main from '../components/Main';
import useStore from '../hooks/useStore';
import Spinner from '../components/Spinner';

const Home: FC = () => {
  const router = useRouter();

  const { userStore } = useStore();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        await userStore.me();
        setIsReady(true);
      } catch (error) {
        await router.push('/login');
      }
    })();
  }, []);

  return (
    <div>
      {isReady ? (
        <>
          <Header />
          <Main />
        </>
      ) : (
        <Spinner screen />
      )}
    </div>
  );
};

export default Home;
