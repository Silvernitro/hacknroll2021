import React from "react";
import styles from "../../../styles/Donations.module.css";
import { gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";

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

const DONATE = gql`
  mutation donate($input: DonationInput) {
    createDonation(donationInput: $input) {
      success
      donation {
        amount
        date
      }
      message
    }
  }
`

function donations(props) {
  const router = useRouter();
  const { rid } = router.query;
  const { loading, error, data } = useQuery(GET_RESTAURANTS, {
    variables: { id: rid },
  });
  const [createDonation] = useMutation(DONATE);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({amount}) => {
    const payload = {
      // TODO: GET ID FROM GRAPH QL CACHE
      donor_id: "",
      restaurant_id: rid,
      amount: parseInt(amount)
    }

    createDonation({
      variables: {
        input: payload
      }
    }).then(res => {
      console.log(res)
    })
  }

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