import React, { useState, useEffect } from "react";
import styles from "../../styles/RestaurantMain.module.css";

import Link from "next/link";

import { gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import QRCode from "qrcode.react";

import { ButtonPrimary } from "components/Button/ButtonPrimary";
import MenuItem from "components/MenuItem.js/MenuItem.js";
import Navbar from "components/Navbar/NavbarRestaurant";
import Modal from "components/Modal/Modal";
import { ButtonOutline } from "components/Button/ButtonOutline";

const GET_SESSION = gql`
  query getSession {
    isLoggedIn @client
    id @client
  }
`

const GET_RESTAURANT = gql`
  query GetRestaurant($id: String) {
    restaurant(id: $id) {
      id
      name
      email
      phone
      menu {
        price
        name
      }
      claims {
        item {
          price
          name
        }
        date
      }
      donations {
        amount
        date
      }
      balance
    }
  }
`;

function main() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const [click, setClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let restaurantId = ""
  if (typeof window !== "undefined") {
    restaurantId = localStorage.getItem("userId");
  }
  const donationUrl = `http://localhost:3000/customer/donations/${restaurantId}`;

  const { loading, error, data } = useQuery(GET_RESTAURANT, {
    variables: { id: restaurantId },
  });

  if (loading) return null;
  if (error) return `Error ${error}`;

  return (
      <>
        <Navbar toggleQrModal={() => setIsModalOpen(!isModalOpen)} />
        <div className={styles.background}>
          {/* QR code modal */}
          <Modal handleClose={() => setIsModalOpen(false)} isActive={isModalOpen}>
            <div style={{paddingBottom: 20}}>
              {<QRCode value={donationUrl} size={256} />}
            </div>
          </Modal>

          <div className={styles.columnFlex}>
          <div className={styles.heading}>
            Balance
            <h1 className={styles.subtitle}>{`$${data.restaurant.balance}`}</h1>
          </div>
          <div className={styles.columnFlex}>
            <div className={styles.formContainer}>
              <h1 className={styles.title}>New Claim</h1>
              <p className={styles.subtitle}>{data.restaurant.name}</p>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                  <input
                    className={styles.input}
                    name="ic"
                    autocomplete="off"
                    placeholder="IC Number"
                    ref={register}
                  />
                </div>
                <div className={styles.menuWrapper}>
                  <MenuItem text="Chicken rice" />
                  <MenuItem text="Lor mee" />
                  <MenuItem text="Ham Jin Beng" />
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
            <li>Claimed 1 Chicken rice worth $5 at 10/10/2020 2000</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default main;
