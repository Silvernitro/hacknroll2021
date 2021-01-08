import React from 'react';
import style from './MenuItem.module.css';

export const MenuItem = ({
  children, 
  type, 
  buttonStyle, 
  buttonSize
}) => {

    const STYLES = [style.btnPrimary, style.btnOutline]
    const onClick = () => {
        this.setState({buttonStyle: style.btnPrimary});
    } 
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