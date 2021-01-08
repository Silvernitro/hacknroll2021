import React from 'react';
import style from './Button.module.css';

const STYLES = [style.buttonPrimary, style.buttonOutline];

const SIZES = [style.buttonMedium, style.buttonMedium];

export const ButtonOutline = ({
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
          className={style.btnOutline}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </div>
    )
};