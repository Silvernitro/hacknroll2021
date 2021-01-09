import React, { useState, useEffect } from "react";
import styles from "../../styles/RestaurantMain.module.css";

import Link from "next/link";

import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import QRCode from "qrcode.react";

import { ButtonPrimary } from "components/Button/ButtonPrimary";
import MenuItem from "components/MenuItem.js/MenuItem.js";
import Navbar from "components/Navbar/NavbarRestaurant";
import Modal from "components/Modal/Modal";
import ItemList from "components/Itemlist/ItemList"
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
        id
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

const CREATE_CLAIM = gql`
  mutation createClaim($input: ClaimInput) {
    createClaim(claimInput: $input) {
      success
      claim {
        item {
          id
        }
      }
    }
  }
`

function main() {
  const { register, handleSubmit, errors, reset } = useForm();
  const [createClaim] = useMutation(CREATE_CLAIM);

  const [click, setClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  let restaurantId = ""
  if (typeof window !== "undefined") {
    restaurantId = localStorage.getItem("userId");
  }
  const donationUrl = `http://ec2-3-1-201-212.ap-southeast-1.compute.amazonaws.com:3000/customer/donations/${restaurantId}`;

  const { loading, error, data, refetch } = useQuery(GET_RESTAURANT, {
    variables: { id: restaurantId },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      restaurant_id: restaurantId,
      item_id: selectedMenuItem
    }

    createClaim({
      variables: {
        input: payload
      }
    }).then(res => {
      console.log(res);
      setIsClaimed(true);
      setSelectedMenuItem("");
      reset();
      refetch();
      setTimeout(() => setIsClaimed(false), 2000);
    }).catch(error => console.error(error))
  }

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
              <h1 className={styles.subtitle}>{`$${data?.restaurant?.balance ?? 0}`}</h1>
            </div>

            <div className={styles.columnFlex}>
              <div className={styles.formContainer}>
                <h1 className={styles.title}>New Claim</h1>
                <p className={styles.subtitle}>{data?.restaurant?.name ?? ""}</p>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.inputContainer}>
                    <input
                      className={styles.input}
                      name="ic"
                      autoComplete="off"
                      placeholder="IC Number"
                      ref={register}
                    />
                  </div>
                  <div className={styles.menuWrapper}>
                    {!!data.restaurant && data.restaurant.menu.map(item => {
                      return (
                      <MenuItem
                        key={item.name}
                        text={item.name}
                        isSelected={item.id === selectedMenuItem}
                        onClick={() => setSelectedMenuItem(item.id)}
                      />
                    )})}
                  </div>
                  <div className={styles.buttonContainer}>
                    <ButtonPrimary>Claim</ButtonPrimary>
                  </div>
                </form>
                <div style={{height: "30px"}}>
                  {isClaimed && <p style={{color: "red"}}>Claimed!</p>}
                </div>
                <div className={styles.signUpContainer}></div>
              </div>
            </div>
          </div>

          <div className={styles.transactions}>
            Past Transactions
            {!!data.restaurant && <ItemList donations={data.restaurant.donations} claims={data.restaurant.claims} /> }
          </div>
        </div>
    </>
  );
}

export default main;
