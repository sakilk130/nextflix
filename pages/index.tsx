import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/banner";
import CardItems from "../components/card-items";
import Navbar from "../components/navbar";
import { CardSize } from "../enums";
import { IVideo } from "../interfaces";
import { getPopularVideos, getVideos } from "../lib/videos";
import styles from "../styles/Home.module.css";

interface IHome {
  disneyVideos: IVideo[];
  travelVideos: IVideo[];
  productivityVideos: IVideo[];
  popularVideos: IVideo[];
}

export const getServerSideProps = async () => {
  const disneyVideos: IVideo[] = await getVideos("disney trailer");
  const travelVideos: IVideo[] = await getVideos("travel videos");
  const productivityVideos: IVideo[] = await getVideos("productivity videos");
  const popularVideos: IVideo[] = await getPopularVideos();

  return {
    props: { disneyVideos, travelVideos, productivityVideos, popularVideos },
  };
};

const Home: NextPage<IHome> = ({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) => {
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
          imageUrl="/static/images/clifford.webp"
        />
        <CardItems
          sectionName="Disney"
          videos={disneyVideos}
          size={CardSize.LARGE}
        />
        <CardItems
          sectionName="Travel"
          videos={travelVideos}
          size={CardSize.SMALL}
        />
        <CardItems
          sectionName="Productivity"
          videos={productivityVideos}
          size={CardSize.MEDIUM}
        />
        <CardItems
          sectionName="Popular"
          videos={popularVideos}
          size={CardSize.SMALL}
        />
      </div>
    </div>
  );
};

export default Home;
