import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { CardSize } from "../../enums";
import styles from "./styles/card.module.css";
import { motion } from "framer-motion";

interface ICard {
  imgUrl: string;
  size: CardSize;
}
const Card: NextPage<ICard> = ({ imgUrl, size = CardSize.MEDIUM }) => {
  const [image, setImage] = useState<string>(imgUrl);
  const className = `${styles.card} ${styles[size]}`;

  const imageErrorHandler = () => {
    setImage(
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
    );
  };

  return (
    <div className={styles.container}>
      <motion.div className={className} whileHover={{ scale: 1.2 }}>
        <Image
          src={image}
          layout="fill"
          alt="Card"
          className={styles.image}
          onError={imageErrorHandler}
        />
      </motion.div>
    </div>
  );
};

export default Card;
