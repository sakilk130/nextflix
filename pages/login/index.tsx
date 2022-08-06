import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../../components/navbar";
import styles from "./styles/login.module.css";

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign In | Nextflix</title>
      </Head>
      <Navbar signUp={true} />
      <div className={styles.loginContainer}>
        <h3 className={styles.loginTitle}>Sign In</h3>
        <input
          className={styles.emailInput}
          type="text"
          placeholder="Email Address"
        />
        <button className={styles.loginButton}>Sign In</button>
      </div>
    </div>
  );
};

export default Login;
