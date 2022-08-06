import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { CardSize, NoIMage } from "../../enums";
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
    setImage(NoIMage.IMAGE);
  };

  return (
    <div className={styles.container}>
      <motion.div className={className} whileHover={{ scale: 1.1 }}>
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
