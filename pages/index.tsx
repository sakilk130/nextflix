import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/banner";
import Card from "../components/card";
import CardItems from "../components/card-items";
import Navbar from "../components/navbar";
import { CardSize } from "../enums";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta
          name="description"
          content="Watch your favorite movies and TV shows on Nextflix"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar />
        <Banner
          title="Clifford the red dog"
          subtitle="Watch your favorite movies and TV shows on Nextflix."
          imageUrl="./static/images/clifford.webp"
        />
        <CardItems sectionName="Disney" />
        <CardItems sectionName="Disney" />
      </div>
    </div>
  );
};

export default Home;
