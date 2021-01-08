import React, { useState, useEffect } from 'react';
import { ButtonPrimary } from '../Button/ButtonPrimary';
import style from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faCocktail, faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ButtonOutline } from '../Button/ButtonOutline';

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
          <div className={style.navbarLogo} onClick={closeMobileMenu}>
            FoodCross
          </div>
          <div className={style.menuIcon} onClick={handleClick}>
            <FontAwesomeIcon icon={click ? ['fas', 'fa-times'] : faCoffee} />
          </div>
          <ul className={style.navMenu}>
            <li className={style.navItem}>
              <div className={style.navLinks} onClick={closeMobileMenu}>
                Home
              </div>
            </li>
            <li className={style.navItem}>
              <div className={style.navLinks} onClick={closeMobileMenu}>
                About Us
              </div>
            </li>
          </ul>
          {button && <ButtonPrimary>Contact</ButtonPrimary>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;