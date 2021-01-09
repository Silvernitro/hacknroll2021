import React from "react";
import styles from "../../styles/CustomerMain.module.css";

import { gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

import { ButtonPrimary } from "components/Button/ButtonPrimary";
import Navbar from "components/Navbar/NavbarCustomer";

const ID = gql`
  query Id {
    id @client
  }
`;

const GET_CUSTOMER = gql`
  query GetCustomer($id: String) {
    customer(id: $id) {
      name
      totalDonations
      donations {
        amount
        date
      }
    }
  }
`;

function main() {
  const { data } = useQuery(ID);
  const { loading, error, data: dataSecond } = useQuery(GET_CUSTOMER, {
    variables: { id: data.id },
  });

  const parseDate = (date) => {
    return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
  };

  console.log(dataSecond);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <div>
          <h1 style={{ paddingLeft: "50px", color: "white" }}>
            {dataSecond.customer.name}
          </h1>
          <div className={styles.columnFlex}>
            <div className={styles.heading}>
              Total Donations
              <h1 className={styles.subtitle}>
                ${dataSecond.customer.totalDonations}
              </h1>
            </div>
          </div>
        </div>

        <div className={styles.transactions}>
          Past Donations
          <h1 className={styles.subtitle}></h1>
          {dataSecond.customer.donations.map((donation) => (
            <div className={styles.finalContainer}>
              <p className={styles.a}>${donation.amount}</p>
              <p className={styles.a}>{parseDate(donation.date)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default main;
