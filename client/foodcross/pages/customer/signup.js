import React, { useState } from "react";
import styles from "../../styles/Signup.module.css";
import Link from "next/link";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";

import { useForm } from "react-hook-form";

import { ButtonPrimary } from "components/Button/ButtonPrimary";

const SIGNUP_CUSTOMER = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const Signup = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [formState, setFormState] = useState({});

  const onSubmit = (data) => {
    console.log(data);
    setFormState({ ...formState, ...setFormState });
  };

  return (
    <div className={styles.background}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Sign Up</h1>
        <p className={styles.subtitle}>@donor</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="email"
              placeholder="Email"
              ref={register({ required: true })}
            />
            {errors.email && <p>This field is required</p>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="name"
              placeholder="Name"
              ref={register({ required: true })}
            />
            {errors.name && <p>This field is required</p>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="number"
              placeholder="Phone Number"
              ref={register({ required: true })}
            />
            {errors.number && <p>This field is required</p>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="password"
              placeholder="Password"
              type="password"
              ref={register({ required: true })}
            />
            {errors.password && <p>This field is required</p>}
          </div>
          <p className={styles.smallTitle}>Card Details</p>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="name"
              placeholder="Card Holder Name"
              ref={register}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="cardNumber"
              autocomplete="nope"
              placeholder="Card Number"
              ref={register}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="expiry"
              autocomplete="nope"
              placeholder="Expiry Date"
              ref={register}
            />
          </div>
          <div className={styles.buttonContainer}>
            <ButtonPrimary>Sign Up</ButtonPrimary>
          </div>
        </form>
        <div className={styles.signUpContainer}>
          <p className={styles.signUp}>Already have an account?</p>
          <Link href={"/customer/login"} passHref>
            <button className={styles.signUpButton}>Sign in here!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
