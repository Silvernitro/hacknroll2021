import React from "react";
import styles from "../../styles/Signup.module.css";
import Link from "next/link";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { isLoggedInVar, idVar } from "../../cache";

import Router from "next/router";

import { useForm } from "react-hook-form";

import { ButtonPrimary } from "components/Button/ButtonPrimary";

const SIGNUP_RESTAURANT = gql`
  mutation CreateRestaurant($restaurantInput: RestaurantInput) {
    createRestaurant(restaurantInput: $restaurantInput) {
      success
      restaurant {
        id
      }
    }
  }
`;

const Signup = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [addRestaurant, { data }] = useMutation(SIGNUP_RESTAURANT);

  const onSubmit = (formData) => {
    addRestaurant({ variables: { restaurantInput: formData } }).then((res) => {
      console.log(res);
      localStorage.setItem("userId", res.data.createRestaurant.restaurant.id);
      isLoggedInVar(true);
      idVar(res.data.createRestaurant.restaurant.id);
      Router.push("/restaurant/main");
    });
  };

  return (
    <div className={styles.background}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Sign Up</h1>
        <p className={styles.subtitle}>@restaurant</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="email"
              placeholder="Email"
              ref={register}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="name"
              placeholder="Name"
              ref={register}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="phone"
              placeholder="Phone Number"
              ref={register}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="location"
              placeholder="Location"
              ref={register}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              name="password"
              placeholder="Password"
              type="password"
              ref={register({ required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className={styles.buttonContainer}>
            <ButtonPrimary>Sign Up</ButtonPrimary>
          </div>
        </form>
        <div className={styles.signUpContainer}>
          <p className={styles.signUp}>Already have an account?</p>
          <Link href={"/restaurant/login"} passHref>
            <button className={styles.signUpButton}>Sign in here!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
