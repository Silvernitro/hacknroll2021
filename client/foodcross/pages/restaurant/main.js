import React, { useState, useEffect } from 'react';
import styles from "../../styles/RestaurantMain.module.css";

import Link from "next/link";

import { gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import QRCode from "qrcode.react";

import { ButtonPrimary } from "components/Button/ButtonPrimary";
import MenuItem from 'components/MenuItem.js/MenuItem.js';
import Navbar from 'components/Navbar/NavbarRestaurant';
import Modal from 'components/Modal/Modal';
import { ButtonOutline } from 'components/Button/ButtonOutline';

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
      # description
      location
      menu
      claims
      donations
      # profile_pic
      balance
    }
  }
`;

function main() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const [click, setClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoadingSession, errorSession, session } = useQuery(GET_SESSION);
  const restaurantId = session?.id;
  const donationUrl = `http://localhost:3000/customer/donations/${restaurantId ?? ""}`;

  const { isLoadingData, errorData, data } = useQuery(GET_RESTAURANT, {
    variables: { id: restaurantId },
  });

  if (isLoadingData) return null;
  if (errorData) return `Error ${errorSession}`;

  return (
      <>
        <Navbar toggleQrModal={() => setIsModalOpen(!isModalOpen)} />
        <div className={styles.background}>
          {/* QR code modal */}
          <Modal handleClose={() => setIsModalOpen(false)} isActive={isModalOpen}>
            <div style={{paddingBottom: 20}}>
              {!isLoadingSession && !errorSession && <QRCode value={donationUrl} size={256} />}
            </div>
          </Modal>

          <div className={styles.columnFlex}>
          <div className={styles.heading}>
            Balance
            <h1 className={styles.subtitle}>{`$${data?.balance ?? 0}`}</h1>
          </div>
          <div className={styles.columnFlex}>
            <div className={styles.formContainer}>
              <h1 className={styles.title}>New Claim</h1>
              <p className={styles.subtitle}>{data?.name ?? "Your Restaurant"}</p>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
            <li>
              Claimed 1 Chicken rice worth $5 at 10/10/2020 2000
            </li>
          </ul>
      </div>
    </div>
    </>
    )
}

export default main
