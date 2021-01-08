import React from "react";
import styles from "../../styles/Donations.module.css";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { ButtonPrimary } from "components/Button/ButtonPrimary";
import Navbar from 'components/Navbar/NavbarCustomer';

function donations() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data,e) => {
    console.log(data);
    e.target.reset();
  }

  return (
      <>
        <Navbar /> 
        <div className={styles.background}>
        <div className={styles.formContainer}>
        <h1 className={styles.title}>Donate Now</h1>
        <p className={styles.subtitle}>Restaurant ABC</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="amount"
              placeholder="Amount to Donate in SGD"
              ref={register}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className={styles.buttonContainer}>
            <ButtonPrimary>Donate</ButtonPrimary>
          </div>
        </form>
        <div className={styles.signUpContainer}>
        </div>
      </div>
    </div>
    </>
    )
}

export default donations
