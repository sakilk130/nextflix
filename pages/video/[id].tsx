import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Modal from "react-modal";
import Navbar from "../../components/navbar";
import styles from "./styles/video.module.css";

const Video = () => {
  const route = useRouter();
  const { id } = route.query;

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
          <div>
            <iframe
              className={styles.player}
              id="ytplayer"
              type="text/html"
              width="100%"
              height="360"
              src={`https://www.youtube.com/embed/${id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
              frameBorder="0"
            ></iframe>
          </div>
          <div className={styles.videoDescription}>
            <div className={styles.leftCol}>
              <h3 className={styles.releaseDate}>2021-06-29T12:59:02Z</h3>
              <h3 className={styles.movieName}>
                Clifford the Big Red Dog (2021) - Official Trailer - Paramount
                Pictures
              </h3>
              <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
                cupiditate? Laudantium illum exercitationem quibusdam eligendi
                nulla obcaecati eveniet ea minima maiores cupiditate aliquid
                vel, praesentium quaerat commodi veritatis? Alias deleniti
                reprehenderit esse delectus suscipit quo quibusdam ad placeat.
                Obcaecati porro accusamus officiis, esse reprehenderit nostrum
                minima ab a ullam. Perferendis tenetur, atque dignissimos
                obcaecati dolores nostrum quos id vitae beatae asperiores,
                expedita debitis ratione maiores. Saepe nihil facilis sunt
                explicabo optio accusantium fugiat eligendi consequatur,
                voluptatem dignissimos quos nostrum repellendus ducimus? Saepe
                dolores architecto soluta ab? Nulla, corrupti non. Eum
                consequuntur reiciendis pariatur. Suscipit itaque a et sunt
                tempore similique doloremque quam voluptates quibusdam, earum
                sit provident expedita debitis nulla qui perspiciatis
                asperiores, quaerat soluta laboriosam natus facere? Obcaecati,
                cumque pariatur harum fuga expedita odio autem nulla nihil
                nostrum vitae accusamus deserunt est nesciunt sit, labore
                deleniti id? Possimus, dolores nulla quos fugit repellat, sint
                nostrum, quaerat inventore eligendi numquam assumenda.
                Voluptatum maxime harum fugiat accusamus nobis doloribus unde
                deleniti explicabo sapiente at quibusdam veritatis magni
                repellat quam quis nam ullam laborum facilis est, exercitationem
                assumenda placeat vitae? Non quibusdam ullam dicta provident
                assumenda optio ad animi asperiores reiciendis corrupti,
                nesciunt quae eos fuga? Cum vel provident sit labore
                praesentium?
              </p>
            </div>
            <div className={styles.rightCol}>
              <p>
                <span className={styles.mututedText}>Cast:</span> Paramount
                Pictures
              </p>
              <p>
                <span className={styles.mututedText}>View Count:</span> 12872019
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
