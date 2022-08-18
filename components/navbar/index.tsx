import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import magic from "../../lib/magic-client";
import styles from "./styles/navbar.module.css";
interface INavbar {
  signUp?: boolean;
}

const Navbar: NextPage<INavbar> = ({ signUp = false }) => {
  const route = useRouter();

  const [showSignOut, setShowSignOut] = useState(false);
  const [username, setUsername] = useState("");
  const [didToken, setDidToken] = useState("");

  const logOutHandler = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      route.push("/login");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();
        if (didToken) {
          setDidToken(didToken);
        }
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/static/icons/logo.svg"
              alt="Nextflix"
              width="120px"
              height="50px"
            />
          </Link>
        </div>
        {!signUp && (
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/browse/my-list">My List</Link>
            </li>
          </ul>
        )}
      </div>
      {!signUp && (
        <nav>
          <div
            className={styles.userNameWrapper}
            onClick={() => setShowSignOut(!showSignOut)}
          >
            <p>{username}</p>
            <RiArrowDropDownLine size="30px" className={styles.usernameArrow} />
          </div>
          {showSignOut && (
            <div className={styles.signOut} onClick={logOutHandler}>
              Sign Out
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default Navbar;
