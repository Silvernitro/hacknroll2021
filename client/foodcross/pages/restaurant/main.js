import React, { useState, useEffect } from 'react';
import styles from "../../styles/RestaurantMain.module.css";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { ButtonPrimary } from "components/Button/ButtonPrimary";
import { MenuItem } from "components/MenuItem/MenuItem";
import Navbar from 'components/Navbar/NavbarRestaurant';
import { ButtonOutline } from 'components/Button/ButtonOutline';

function main() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const [click, setClick] = useState(false);

  return (
      <>
        <Navbar /> 
        <div className={styles.background}>
          <div className={styles.columnFlex}>
          <div className={styles.heading}>
            Balance
            <h1 className={styles.subtitle}>$10000000000</h1>
          </div>
          <div className={styles.columnFlex}>
            <div className={styles.formContainer}>
              <h1 className={styles.title}>New Claim</h1>
              <p className={styles.subtitle}>Restaurant ABC</p>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.menuWrapper}>
                <MenuItem>
                  Chicken Rice
                </MenuItem>
                <MenuItem>
                  Lor Mee
                </MenuItem>
                <MenuItem>
                  Ham Jin Beng
                </MenuItem>
              </div>
              <div className={styles.buttonContainer}>
                <ButtonPrimary>Claim</ButtonPrimary>
              </div>
              </form>
              <div className={styles.signUpContainer}></div>
            </div>
          </div>
        </div>
        
      <div className={styles.transactions}>
          Past Transactions
          <h1 className={styles.subtitle}></h1>
          <ul className={styles.listItem}>
            <li>
              Claimed 1 Chicken rice worth $5 at 10/10/2020 2000
            </li> 
          </ul>
      </div>
    </div>
    </>
    )
}

export default main
