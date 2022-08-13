import { FC } from "react";
import { AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import styles from "./styles/dislike-btn.module.css";

interface IDislikeBtn {
  selected?: boolean;
}

const DislikeBtn: FC<IDislikeBtn> = ({ selected = false }) => {
  return selected ? (
    <AiFillDislike className={styles.dislikeBtn} />
  ) : (
    <AiOutlineDislike className={styles.dislikeBtn} />
  );
};

export default DislikeBtn;
