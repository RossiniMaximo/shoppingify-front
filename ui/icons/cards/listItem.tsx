import styles from "./listItem.module.css";
import { useState } from "react";
import Image from "next/image";

type ListItemCardType = {
  name: string;
  img?: string;
  description: string;
  key: number;
};

export function ListItemCard(props: ListItemCardType) {
  const [isActive, setIsActive] = useState(false);
  const style = isActive ? { display: "block" } : {};
  return (
    <div>
      <div onClick={() => setIsActive(!isActive)}>
        <div className={styles.container}>
          <ul className={styles.list}>
            <li className={styles.item}>{props.name}</li>
          </ul>
        </div>
      </div>
      {isActive ? (
        <div className={styles.item_info__container}>
          <p className={styles.item_description}>{props.description}</p>
          {props.img ? (
            <div className={styles.item_img_container}>
              <Image src={props.img} layout="fill" />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
