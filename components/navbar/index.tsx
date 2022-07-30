import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./styles/navbar.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  const [showSignOut, setShowSignOut] = useState(false);
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
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/browse/my-list">My List</Link>
          </li>
        </ul>
      </div>
      <nav>
        <div className={styles.userNameWrapper}>
          <p>sakilk130@gmail.com</p>
          <RiArrowDropDownLine
            size="30px"
            className={styles.usernameArrow}
            onClick={() => setShowSignOut(!showSignOut)}
          />
        </div>
        {showSignOut && <div className={styles.signOut}>Sign Out</div>}
      </nav>
    </div>
  );
};

export default Navbar;
