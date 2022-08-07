import { NextPage } from "next";
import Link from "next/link";
import { CardSize } from "../../enums";
import { IVideo } from "../../interfaces";
import Card from "../card";
import styles from "./styles/card-items.module.css";

interface ICardItems {
  sectionName: string;
  videos: IVideo[];
  size?: CardSize;
}

const CardItems: NextPage<ICardItems> = ({
  sectionName,
  videos,
  size = CardSize.MEDIUM,
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.sectionName}>{sectionName}</h3>
      <div className={styles.cardItems}>
        {videos?.length > 0
          ? videos.map((video: IVideo) => (
              <Link href={`/video/${video.id}`} key={video.id}>
                <a>
                  <Card imgUrl={video.thumbnail} size={size} />
                </a>
              </Link>
            ))
          : "No videos found"}
      </div>
    </div>
  );
};

export default CardItems;
