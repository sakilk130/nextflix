import { FC } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import styles from "./styles/like-btn.module.css";

interface ILikeBtn {
  selected?: boolean;
}

const LikeBtn: FC<ILikeBtn> = ({ selected = false }) => {
  return selected ? (
    <AiFillLike className={styles.likeBtn} />
  ) : (
    <AiOutlineLike className={styles.likeBtn} />
  );
};

export default LikeBtn;
