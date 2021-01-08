import styles from "../styles/Home.module.css";

import HomeNav from "components/HomeNav/HomeNav";

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeNav />
      <main className={styles.main}>
        <h1>Home</h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
