import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/banner";
import CardItems from "../components/card-items";
import Navbar from "../components/navbar";
import { CardSize } from "../enums";
import { getVideos } from "../lib/videos";
import styles from "../styles/Home.module.css";
import { IVideo } from "../types";

interface IHome {
  disneyVideos: IVideo[];
}

export const getServerSideProps = async () => {
  const disneyVideos: IVideo[] = await getVideos();
  return { props: { disneyVideos } };
};

const Home: NextPage<IHome> = ({ disneyVideos }) => {
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
        <CardItems
          sectionName="Disney"
          videos={disneyVideos}
          size={CardSize.LARGE}
        />
      </div>
    </div>
  );
};

export default Home;
