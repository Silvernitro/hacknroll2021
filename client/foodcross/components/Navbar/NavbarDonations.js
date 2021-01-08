import React, { useState, useEffect } from 'react';
import style from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCocktail, faCoffee, fas, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
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
          <Link href="/">
            <div className={style.navbarLogo} onClick={closeMobileMenu}>
              FoodCross
            </div>
          </Link>
          <div className={style.menuIcon} onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faTimes : faBars} />
          </div>
          <ul className={click ? style.navMenuActive : style.navMenu}>
          <li className={style.navItem}>
              <Link to href="/" className={style.navLinks} onClick={closeMobileMenu}>
                Home
              </Link>
          </li>
          </ul>
        </div>
        <div className={style.profileIcon}>
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
      </nav>
    </>
  );
}

export default Navbar;