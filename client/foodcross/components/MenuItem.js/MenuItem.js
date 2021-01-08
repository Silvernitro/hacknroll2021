import React, { useState, useEffect } from 'react';
import style from './MenuItem.module.css';

function MenuItem(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <div onClick={handleClick} className={click ? style.btnPrimary : style.btnOutline}>
        {props.text}
      </div>
    </>
  );
}

export default MenuItem;