import React from "react";
import styles from "../../styles/CustomerMain.module.css";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { ButtonPrimary } from "components/Button/ButtonPrimary";
import Navbar from 'components/Navbar/NavbarRestaurant';

function main() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
      <>
        <Navbar /> 
        <div className={styles.background}>
          <div className={styles.columnFlex}>
          <div className={styles.heading}>
            Total donations
            <h1 className={styles.subtitle}>$10000000000</h1>
          </div>
          <div className={styles.columnFlex}>
            <div className={styles.formContainer}>
              <h1 className={styles.title}>New Donation</h1>
              <p className={styles.subtitle}>Bob Ross</p>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  name="amount"
                  placeholder="Amount to donate in SGD"
                  ref={register}
                />
                {errors.exampleRequired && <span>This field is required</span>}
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
          Past Donations
          <h1 className={styles.subtitle}></h1>
          <ul className={styles.listItem}>
            <li>
              $200 on 10/10/2020 1900 at Hacks Place 
           </li>
          </ul>
      </div>
    </div>
    </>
    )
}

export default main
