import { FC, useEffect } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';

const Home: FC = () => {

  useEffect(() => {
    console.log('Fetch user');
  }, [])

  return (
    <div>
      <Header />
      <Main />
    </div>
  )
};

export default Home;
