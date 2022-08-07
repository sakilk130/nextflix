import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./styles/navbar.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NextPage } from "next";
import magic from "../../lib/magic-link";
import { useRouter } from "next/router";
interface INavbar {
  signUp?: boolean;
}

const Navbar: NextPage<INavbar> = ({ signUp = false }) => {
  const route = useRouter();

  const [showSignOut, setShowSignOut] = useState(false);
  const [username, setUsername] = useState("");

  const logOutHandler = async () => {
    try {
      await magic.user.logout();
      route.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { email } = await magic.user.getMetadata();
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
