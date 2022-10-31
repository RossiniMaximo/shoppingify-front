import { AiTwotoneCalendar, BiTrash } from "ui/icons";
import styles from "./listCard.module.css";
import { useRouter } from "next/router";
import { useListTitle } from "lib/hooks";
import { ListCardProps } from ".d";

export function ListCard(props: ListCardProps) {
  const router = useRouter();
  const [listTitle, setListTitle] = useListTitle();

  return (
    <div
      className={styles.container}
      onClick={() => {
        setListTitle(props.title);
      }}
    >
      <p className={styles.month}>{props.date}</p>
      <div className={styles.list}>
        <p
          onClick={() => router.push("/user/lists/" + props.listId)}
          className={styles.title}
        >
          {props.title}
        </p>
        <div className={styles.data_container}>
          <div className={styles.data}>
            <div
              className={styles.delete_icon}
              onClick={() => props.removeItem(true)}
            >
              <BiTrash />
            </div>
            <div className={styles.calendar_container}>
              <AiTwotoneCalendar />
              <p className={styles.date}>{props.date}</p>
            </div>
            {props.completed === "completed" ? (
              <p className={styles.completed}>completed</p>
            ) : (
              ""
            )}
            {props.completed !== "completed" &&
            props.completed !== "cancelled" ? (
              <p className={styles.uncompleted}>uncompleted</p>
            ) : (
              ""
            )}
            {props.completed === "cancelled" ? (
              <p className={styles.uncompleted}>cancelled</p>
            ) : (
              ""
            )}
            <div className={styles.arrow}>{">"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
