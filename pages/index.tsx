import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/banner";
import CardItems from "../components/card-items";
import Navbar from "../components/navbar";
import { CardSize } from "../enums";
import { IVideo } from "../interfaces";
import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
} from "../lib/videos";
import styles from "../styles/Home.module.css";
import decodeToken from "../utils/decodeToken";

interface IHome {
  disneyVideos: IVideo[];
  travelVideos: IVideo[];
  productivityVideos: IVideo[];
  popularVideos: IVideo[];
  watchVideos: any[];
}

export const getServerSideProps = async (context: any) => {
  const token = context.req.cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const decode = decodeToken(token);
  const user_id = decode?.issuer;

  if (!user_id) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const watchVideos = await getWatchItAgainVideos(token, user_id);
  const disneyVideos: IVideo[] = await getVideos("disney trailer");
  const travelVideos: IVideo[] = await getVideos("travel videos");
  const productivityVideos: IVideo[] = await getVideos("productivity videos");
  const popularVideos: IVideo[] = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
      watchVideos,
    },
  };
};

const Home: NextPage<IHome> = ({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
  watchVideos,
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
          sectionName="Watch it again"
          videos={watchVideos}
          size={CardSize.SMALL}
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
