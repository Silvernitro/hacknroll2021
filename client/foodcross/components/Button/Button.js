import React from 'react';
import style from './Button.module.css';

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  children, 
  type, 
  onClick, 
  buttonStyle, 
  buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) 
      ? buttonStyle 
      : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) 
      ? buttonSize
      : SIZES[0];

    return (
      <div className={style.btnMobile}>
        <button
          className={style.btnPrimary}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </div>
    )
};
