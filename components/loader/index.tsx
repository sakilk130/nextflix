import { NextPage } from "next";
import React from "react";
import styles from "./styles/loading.module.css";

const Loader: NextPage = () => {
  return <div className={styles.loader}>Loading...</div>;
};

export default Loader;
