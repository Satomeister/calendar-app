import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './login.module.scss';

const Login: FC = () => {
  const router = useRouter();

  const handleClick = async () => {
    await router.push('http://localhost:3001/auth/github')
  }

  return (
    <div className={styles.auth}>
      <div className={styles.title}>Welcome to Calendar</div>

      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faGithub} />
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;
