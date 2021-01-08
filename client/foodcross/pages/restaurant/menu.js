import React from "react";
import styles from "../../styles/Menu.module.css";
import { useForm } from "react-hook-form";
import { ButtonPrimary } from "components/Button/ButtonPrimary";
import { useMutation } from "@apollo/react-hooks";
import Navbar from "components/Navbar/NavbarDonations";

import { gql, useQuery } from "@apollo/client";

const ID = gql`
  query Id {
    id @client
  }
`;

const GET_RESTAURANTS = gql`
  query GetRestaurant($id: String) {
    restaurant(id: $id) {
      name
      location
    }
  }
`;

const ADD_MENU_ITEM = gql`
  mutation AddMenuItem($menuInput: MenuInput) {
    addMenuItem(menuInput: $menuInput) {
      menu {
        restaurant_id
        items {
          price
          name
        }
      }
    }
  }
`;

function donations() {
  const { data } = useQuery(ID);

  const { loading, error, data: dataSecond } = useQuery(GET_RESTAURANTS, {
    variables: { id: data.id },
  });

  const [addMenuItem] = useMutation(ADD_MENU_ITEM);

  const { register, handleSubmit, errors, reset } = useForm();

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const onSubmit = (formData) => {
    const formState = {};
    formState.restaurant_id = data.id;
    formData.price = parseFloat(formData.price);
    formState.items = [formData];
    console.log(formState);
    reset();
    addMenuItem({ variables: { menuInput: formState } }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Add Items to your menu</h1>
          <p className={styles.subtitle}>{dataSecond.restaurant.name}</p>
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
          <div className={styles.signUpContainer}></div>
        </div>
      </div>
    </>
  );
}

export default donations;
