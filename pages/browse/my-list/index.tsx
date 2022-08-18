import { NextPage } from "next";
import Head from "next/head";
import CardItems from "../../../components/card-items";
import Navbar from "../../../components/navbar";
import { CardSize } from "../../../enums";
import { getMyLists } from "../../../lib/videos";
import decodeToken from "../../../utils/decodeToken";
import styles from "./styles/my-list.module.css";

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
  const mylists = await getMyLists(token, user_id);

  return {
    props: {
      mylists,
    },
  };
};

interface IMyList {
  mylists: any[];
}

const MyList: NextPage<IMyList> = ({ mylists }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My List</title>
        <meta
          name="description"
          content="Watch your favorite movies and TV shows on Nextflix"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <div className={styles.myListWrapper}>
        <CardItems
          sectionName="My List"
          videos={mylists}
          size={CardSize.SMALL}
          wrap={true}
        />
      </div>
    </div>
  );
};

export default MyList;
