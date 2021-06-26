import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

const Auth: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = router.query.token;
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
      (async () => {
        await router.push('/')
      })()
    }
  }, [router.query.token]);

  return <div />;
};

export default Auth;
