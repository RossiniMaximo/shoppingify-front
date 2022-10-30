import styles from "./popup.module.css";
import { useState } from "react";

type PopUpProps = {
  height: string;
  text: string;
  width: string;
};

export function PopUp(props: PopUpProps) {
  const [isActive, setIsActive] = useState(true);
  const style = isActive
    ? { display: "flex", height: props.height, width: props.width }
    : { display: "none" };

  return (
    <div className={styles.container} style={style}>
      <p className={styles.text}>{props.text}</p>
      <div className={styles.btn_container}>
        <button className={styles.btn} onClick={() => setIsActive(false)}>
          Ok
        </button>
      </div>
    </div>
  );
}
