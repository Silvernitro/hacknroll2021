import React from "react";
import styles from "../../styles/Login.module.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { isLoggedInVar, idVar } from "../../cache";

import Router from "next/router";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { ButtonPrimary } from "components/Button/ButtonPrimary";

const LOGIN_RESTAURANT = gql`
  mutation LoginRestaurant($userInput: UserInput) {
    login(userInput: $userInput) {
      id
      token
    }
  }
`;

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const [loginRestaurant] = useMutation(LOGIN_RESTAURANT);

  const onSubmit = (data) => {
    data.role = "RESTAURANT";

    loginRestaurant({ variables: { userInput: data } }).then((res) => {
      localStorage.setItem("token", res.data.login.token);
      localStorage.setItem("userId", res.data.login.id);
      isLoggedInVar(true);
      idVar(res.data.login.id);
      Router.push("/restaurant/main");
    });
  };

  return (
    <div className={styles.background}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>FoodCross</h1>
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
              name="password"
              placeholder="Password"
              type="password"
              ref={register({ required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className={styles.buttonContainer}>
            <ButtonPrimary>Login</ButtonPrimary>
          </div>
        </form>
        <div className={styles.signUpContainer}>
          <p className={styles.signUp}>Don't have an account?</p>
          <Link href={"/restaurant/signup"} passHref>
            <button className={styles.signUpButton}>Sign up here!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
