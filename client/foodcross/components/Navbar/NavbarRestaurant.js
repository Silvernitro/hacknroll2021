import React, { useState, useEffect } from 'react';
import { ButtonPrimary } from '../Button/ButtonPrimary';
import style from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faCocktail, faCoffee, fas, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ButtonOutline } from '../Button/ButtonOutline';
import Link from 'next/link';

function Navbar({ toggleQrModal }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (typeof window != 'undefined') {
      if(window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    }
  };

  useEffect(() => {
    showButton();
  }, [])

  if (typeof window != 'undefined') {
    window.addEventListener('resize', showButton);
  }

  return (
    <>
      <nav className={style.navbar}>
        <div className={style.navbarContainer}>
          <Link to href="/">
            <div className={style.navbarLogo} onClick={closeMobileMenu}>
              FoodCross
            </div>
          </Link>
          <div className={style.menuIcon} onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faTimes : faBars} />
          </div>
          <ul className={click ? style.navMenuActive : style.navMenu}>
            <li className={style.navItem}>
              <div className={style.navLinks} onClick={closeMobileMenu}>
                <Link to href="/restaurant/main">
                Home
                </Link>
              </div>
            </li>
            <li className={style.navItem}>
              <div className={style.navLinks} onClick={closeMobileMenu}>
                <Link to href="/restaurant/menu">
                Menu
                </Link>
              </div>
            </li>
            <li className={style.navItem}>
              <div className={style.navLinks} onClick={toggleQrModal}>
                QR Code
              </div>
            </li>
          </ul>
          <div className={style.profileIcon}>
          <FontAwesomeIcon icon={faUserCircle} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
