import React from "react";
import style from "./RestaurantRow.module.css";

import Link from "next/link";

const RestaurantRow = (props) => {
  console.log(props.restaurant);
  const { profile_pic, name, balance, id } = props.restaurant;

  return (
    <div className={style.rowContainer}>
      <Link href={`/customer/donations/${id}`}>
        <a>
          <div className={style.imageContainer}>
            <img
              className={style.images}
              alt={name}
              src={profile_pic !== null ? profile_pic : ""}
            ></img>
          </div>
        </a>
      </Link>

      <div>
        <p style={{ fontWeight: "bold", fontSize: "32px" }}>{name}</p>
        <p style={{ fontSize: "18px", color: "#4D7A33" }}>Balance: {balance}</p>
      </div>
    </div>
  );
};

export default RestaurantRow;
