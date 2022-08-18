import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DislikeBtn from "../../components/dislike-btn";
import LikeBtn from "../../components/like-btn";
import Navbar from "../../components/navbar";
import { getVideoById } from "../../lib/videos";
import styles from "./styles/video.module.css";

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const video = await getVideoById(id);
  return {
    props: {
      video: video.length ? video[0] : {},
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: "4zH5iYM4wJo",
        },
      },
    ],
    fallback: "blocking",
  };
};

interface IVideo {
  video: {
    releaseDate: string;
    title: string;
    description: string;
    cast: string;
    viewCount: number;
  };
}
const Video: NextPage<IVideo> = ({ video }) => {
  const route = useRouter();
  const { id } = route.query;
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const likeAndDislike = async (like: boolean, dislike: boolean) => {
    const value = like ? 1 : dislike ? 2 : 0;

    return await fetch(`/api/video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_id: id,
        favourited: value,
      }),
    });
  };

  const likeHandler = async () => {
    const value = !like;
    setLike(value);
    setDislike(false);
    await likeAndDislike(value, false);
  };

  const dislikeHandler = async () => {
    const value = !dislike;
    setDislike(value);
    setLike(false);
    await likeAndDislike(false, value);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await fetch(`/api/video?video_id=${id}`);
      const data = await res.json();
      setLike(data?.data?.favourited === 1);
      setDislike(data?.data?.favourited === 2);
    };
    fetchVideo();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Video</title>
        <meta
          name="description"
          content="Watch your favorite movies and TV shows on Nextflix"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Modal
        isOpen={true}
        onRequestClose={() => route.back()}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "800px",
            left: "0",
            right: "0",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          },
          content: {
            backgroundColor: "rgba(0,0,0,0.5)",
            border: "none",
            boxShadow: "0 0 10px 0 #6969697e",
            padding: "0",
            overflow: "hidden",
          },
        }}
      >
        <div className={styles.modalContent}>
          <iframe
            className={styles.player}
            id="ytplayer"
            width="100%"
            height="360"
            src={`https://www.youtube.com/embed/${id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
            frameBorder="0"
          ></iframe>
          <div className={styles.likeDislike}>
            <button className={styles.btnWrapper} onClick={likeHandler}>
              <LikeBtn selected={like} />
            </button>
            <button className={styles.btnWrapper} onClick={dislikeHandler}>
              <DislikeBtn selected={dislike} />
            </button>
          </div>

          <div className={styles.videoDescription}>
            <div className={styles.leftCol}>
              <h3 className={styles.releaseDate}>{video.releaseDate}</h3>
              <h3 className={styles.movieName}>{video?.title}</h3>
              <p className={styles.description}>{video.description}</p>
            </div>
            <div className={styles.rightCol}>
              <p>
                <span className={styles.mututedText}>Cast:</span> {video.cast}
              </p>
              <p>
                <span className={styles.mututedText}>View Count:</span>{" "}
                {video.viewCount}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
