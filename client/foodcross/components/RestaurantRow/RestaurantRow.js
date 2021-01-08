import React from "react";
import style from "./RestaurantRow.module.css";

import Link from "next/link";

const RestaurantRow = (props) => {
  const { imageUrl, name, balance, id } = props.restaurant;

  return (
    <div className={style.rowContainer}>
      <Link href={`/customer/donations/${id}`}>
        <a>
          <div className={style.imageContainer}>
            <img
              className={style.images}
              alt={name}
              src="https://source.unsplash.com/1600x900/?food"
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
