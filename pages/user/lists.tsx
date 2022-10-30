import { Layout } from "components/layout";
import { UserLists } from "components/userLists";
import styles from "./list.module.css";

export default function UserList() {
  return (
    <div className={styles.container}>
      <Layout />
      <UserLists />
    </div>
  );
}
