import React from 'react'
import Navbar from 'components/Navbar/NavbarCustomer'
import style from '../styles/About.module.css'
import Image from "next/image";

function about() {
  return (
    <>
    <Navbar />
    <div className={style.landingContainer}>
    <Image
        src="/../public/about.jpg"
        alt="LandingPicture"
        width={700}
        height={800}
    />
      <div className={style.aboutContainer}>
        We are a group of students from NUS  all sharing the love for programming and food,
        and though of sharing our passion for food with the underprivileged.

        <p className={style.subtitle}>
          As such, FoodCross was developed as our way of allowing others to give it forward, sharing
          what they love with people that need it the most!
        </p>
      </div>
    </div>
    </>
  )
}

export default about
