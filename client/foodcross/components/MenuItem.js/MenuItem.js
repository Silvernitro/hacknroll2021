import React, { useState, useEffect } from 'react';
import style from './MenuItem.module.css';

function MenuItem({ text, isSelected, onClick }) {
  return (
    <>
      <div onClick={onClick} className={isSelected ? style.btnPrimary : style.btnOutline}>
        {text}
      </div>
    </>
  );
}

export default MenuItem;
