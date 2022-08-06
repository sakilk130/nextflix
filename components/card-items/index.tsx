import { NextPage } from "next";
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
        {videos?.length &&
          videos.map((video: IVideo) => (
            <Card key={video.id} imgUrl={video.thumbnail} size={size} />
          ))}
      </div>
    </div>
  );
};

export default CardItems;
