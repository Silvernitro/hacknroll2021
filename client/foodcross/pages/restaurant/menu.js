import React from "react";
import styles from "../../styles/Menu.module.css";
import { useForm } from "react-hook-form";
import { ButtonPrimary } from "components/Button/ButtonPrimary";
import Navbar from 'components/Navbar/NavbarDonations';

function donations() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);
  };

  return (
      <>
        <Navbar /> 
        <div className={styles.background}>
        <div className={styles.formContainer}>
        <h1 className={styles.title}>Add Items to your menu</h1>
        <p className={styles.subtitle}>Restaurant ABC</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="name"
              placeholder="Name of item"
              ref={register}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="price"
              placeholder="Price of item in SGD"
              ref={register({ required: true })}
            />
            {errors.name && <p>This field is required</p>}
          </div>
          <div className={styles.buttonContainer}>
            <ButtonPrimary>Submit</ButtonPrimary>
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