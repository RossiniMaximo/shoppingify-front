import { useRouter } from "next/router";
import { Layout } from "components/layout";
import { UserList } from "components/userList";
import styles from "./listId.module.css";

export default function List() {
  const router = useRouter();
  const listId = router.query.listId;
  // Invocar componente y pasarle el id de la list que recibimos en la query.
  return (
    <div className={styles.container}>
      <Layout />
      <UserList query={listId} />
    </div>
  );
}
