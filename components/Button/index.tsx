import { FC } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  style?: object;
  className?: string;
  onClick: () => void;
  square?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  square,
  className,
  style,
}) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={classNames(styles.button, {
        [className as string]: className,
        [styles.square]: square,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
