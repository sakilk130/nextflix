import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import magic from "../../lib/magic-client";
import styles from "./styles/login.module.css";

const Login: NextPage = () => {
  const route = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(false);
    };
    route.events.on("routeChangeComplete", handleRouteChange);
    route.events.on("routeChangeError", handleRouteChange);
    return () => {
      route.events.off("routeChangeComplete", handleRouteChange);
      route.events.off("routeChangeError", handleRouteChange);
    };
  }, [route]);

  const onChangeEmail = (e: FormEvent<HTMLInputElement>) => {
    setError("");
    setEmail(e.currentTarget.value);
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setError("Please enter a valid email");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "") {
      setError("Email is required");
    }
    if (error === "") {
      try {
        setLoading(true);
        const didToken: any = await magic.auth.loginWithMagicLink({ email });
        if (didToken) {
          const res = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${didToken}`,
            },
          });
          const date = await res.json();
          if (date.success) {
            route.push("/");
          } else {
            setError("Something went wrong");
          }
        } else {
          setError("Something went wrong");
        }
      } catch (err: any) {
        console.log("login error", err);
        setError(err.message);
      }
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
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
