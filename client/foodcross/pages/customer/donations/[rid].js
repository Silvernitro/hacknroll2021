import React, { useState } from "react";
import styles from "../../../styles/Donations.module.css";
import { gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";

import { ButtonPrimary } from "components/Button/ButtonPrimary";
import Navbar from "components/Navbar/NavbarDonations";

const GET_RESTAURANT = gql`
  query GetRestaurant($id: String) {
    restaurant(id: $id) {
      name
      location
    }
  }
`;

const GET_SESSION = gql`
  query getSession {
    isLoggedIn @client
    id @client
  }
`

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
  let user_id = ""
  if (typeof window !== "undefined") {
    user_id = localStorage.getItem("userId");
  }

  const { loading, error, data } = useQuery(GET_RESTAURANT, {
    variables: { id: rid },
  });

  const [createDonation] = useMutation(DONATE);
  const { register, handleSubmit, errors } = useForm();
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = ({amount}) => {
    const payload = {
      donor_id: user_id,
      restaurant_id: rid,
      amount: parseInt(amount)
    }

    createDonation({
      variables: {
        input: payload
      }
    }).then(res => {
      setSuccess(true)
      setSuccessMessage(`You've donated $${res.data.createDonation.donation.amount}.`);
      console.log(res)
    })
  }

  if (loading || !user_id) return null;
  if (error || !user_id) return `Error! ${error}`;

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.formContainer}>

          {/* show thank you message after successful donation */}
          {success && (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <h1 className={styles.title}>Thank You!</h1>
              <p className={styles.subtitle}>{successMessage}</p>
            </div>
          )}

          {/* else show donation form */}
          {!success && (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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
            </div>
          )}

          <div className={styles.signUpContainer}></div>
        </div>
      </div>
    </>
  );
}

export default donations;
