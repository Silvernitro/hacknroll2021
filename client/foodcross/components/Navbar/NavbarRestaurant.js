import React, { useState, useEffect } from 'react';
import { ButtonPrimary } from '../Button/ButtonPrimary';
import style from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faCocktail, faCoffee, fas, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ButtonOutline } from '../Button/ButtonOutline';
import Link from 'next/link';

function Navbar() {
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
          <ul className={style.navMenu}>
            <li className={style.navItem}>
              <div className={style.navLinks} onClick={closeMobileMenu}>
                <Link to href="/">
                Home
                </Link>
              </div>
            </li>
            <li className={style.navItem}>
              <div className={style.navLinks} onClick={closeMobileMenu}>
                Menu
              </div>
            </li>
          </ul>
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
      </nav>
    </>
  );
}

export default Navbar;