import styles from "./styles/banner.module.css";
import { BsFillPlayFill } from "react-icons/bs";
import Link from "next/link";

export interface IBanner {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const Banner = ({ title, subtitle, imageUrl }: IBanner) => {
  return (
    <div className={styles.container}>
      <div className={styles.bannerWrapper}>
        <div className={styles.nSeriesWrapper}>
          <p className={styles.nSeries}>N</p>
          <p className={styles.nSeriesText}>S E R I E S</p>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <h3 className={styles.subTitle}>{subtitle}</h3>
        <div className={styles.playBtnWrapper}>
          <button className={styles.playBtn}>
            <BsFillPlayFill size={"30px"} />
            <Link href={`/video/4zH5iYM4wJo`}>
              <a>Play</a>
            </Link>
          </button>
        </div>
      </div>
      <div
        className={styles.bannerImage}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
    </div>
  );
};

export default Banner;
