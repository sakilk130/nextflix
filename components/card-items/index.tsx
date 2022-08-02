import { NextPage } from "next";
import { CardSize } from "../../enums";
import Card from "../card";
import styles from "./styles/card-items.module.css";

interface ICardItems {
  sectionName: string;
}

const CardItems: NextPage<ICardItems> = ({ sectionName }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.sectionName}>{sectionName}</h3>
      <div className={styles.cardItems}>
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
        <Card imgUrl="/static/images/clifford.webp" size={CardSize.LARGE} />
      </div>
    </div>
  );
};

export default CardItems;
