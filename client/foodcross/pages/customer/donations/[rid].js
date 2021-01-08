import React from "react";
import styles from "../../../styles/Donations.module.css";
import { gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { ButtonPrimary } from "components/Button/ButtonPrimary";
import Navbar from "components/Navbar/NavbarDonations";

const GET_RESTAURANTS = gql`
  query GetRestaurant($id: String) {
    restaurant(id: $id) {
      name
      location
    }
  }
`;

function donations(props) {
  const router = useRouter();
  const { rid } = router.query;
  const { loading, error, data } = useQuery(GET_RESTAURANTS, {
    variables: { id: rid },
  });
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => console.log(data);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Donate Now</h1>
          <p className={styles.subtitle}>{data.restaurant.name}</p>
          <p className={styles.subtitle}>{data.restaurant.location}</p>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                name="amount"
                placeholder="Amount to Donate"
                ref={register}
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </div>
            <div className={styles.buttonContainer}>
              <ButtonPrimary>Donate</ButtonPrimary>
            </div>
          </form>
          <div className={styles.signUpContainer}></div>
        </div>
      </div>
    </>
  );
}

export default donations;
