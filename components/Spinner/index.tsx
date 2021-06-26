import React, { FC } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import styles from './Spinner.module.scss'

interface SpinnerProps {
  center?: boolean,
  screen?: boolean
}

const Spinner: FC<SpinnerProps> = ({center, screen}) => {
  return (
    <div className={classNames({
      [styles.center]: center,
      [`${styles.screen} ${styles.center}`]: screen
    })}>
      <FontAwesomeIcon icon={faSpinner} className='spinner' />
    </div>
  );
};

export default Spinner;
