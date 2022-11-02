import { useRouter } from "next/router";
import { Layout } from "components/layout";
import { UserList } from "components/userList";
import styles from "./listId.module.css";

export default function List() {
  const router = useRouter();
  const listId = router.query.listId as string;

  return (
    <div className={styles.container}>
      <Layout />
      {listId ? <UserList query={listId} /> : ""}
    </div>
  );
}
