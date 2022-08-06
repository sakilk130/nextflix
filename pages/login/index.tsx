import { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import Navbar from "../../components/navbar";
import styles from "./styles/login.module.css";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onChangeEmail = (e: FormEvent<HTMLInputElement>) => {
    setError("");
    setEmail(e.currentTarget.value);
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setError("Please enter a valid email");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "") {
      setError("Email is required");
    }
    if (error === "") {
      console.log("Success");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign In | Nextflix</title>
      </Head>
      <Navbar signUp={true} />
      <form onSubmit={handleSubmit}>
        <div className={styles.loginContainer}>
          <h3 className={styles.loginTitle}>Sign In</h3>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="Email Address"
            name="email"
            onChange={onChangeEmail}
            value={email}
          />
          <span className={styles.emailError}>{error}</span>
          <button type="submit" className={styles.loginButton}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
