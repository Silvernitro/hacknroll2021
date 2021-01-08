import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavbarHome from "components/Navbar/NavbarHome";
import { ButtonPrimary } from "components/Button/ButtonPrimary";
import { ButtonOutline } from "components/Button/ButtonOutline";

import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <NavbarHome />
      <main className={styles.main}>
        <div className={styles.landingContainer}>
          <div className={styles.aboutContainer}>
            <p className={styles.title}>FoodCross</p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.{" "}
            </p>
            <p
              style={{ color: "#4D7A33", fontWeight: "bold", fontSize: "24px" }}
            >
              Get Started
            </p>
            <div className={styles.buttonsContainer}>
              <Link href={"/restaurant/login"} passHref>
                <ButtonPrimary>Restaurants</ButtonPrimary>
              </Link>
              <div style={{ marginLeft: "40px" }}>
                <Link href={"/customer/login"} passHref>
                  <ButtonOutline>Donors</ButtonOutline>
                </Link>
              </div>
            </div>
          </div>
          <Image
            src="/../public/landingPic.jpg"
            alt="LandingPicture"
            width={700}
            height={800}
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Footer</p>
      </footer>
    </div>
  );
}
