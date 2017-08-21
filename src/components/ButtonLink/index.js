import React from 'react';
import cx from 'classnames';

const ButtonLink = ({isActive, onClick, type, children}) => (
  <button
    onClick={() => onClick(type)}
    className={cx('Button Button--link', isActive ? 'is-active' : '')}>
    {children}
  </button>
);

export default ButtonLink;
