import { ListCard } from "components/listsCard";
import { ShoppingList } from "components/shoplist";
import styles from "./userList.module.css";
import { deleteShoppingList, getUserLists } from "api";
import { useEffect, useState } from "react";

export function UserLists() {
  const [myLists, setMyLists] = useState([{}]);
  async function pullLists() {
    const data = await getUserLists();
    setMyLists(data);
  }

  async function deleteShoppingListFromState(listId, list) {
    const result = await deleteShoppingList(listId);
    const newShoppingLists: {}[] = [...myLists];
    const index = newShoppingLists.indexOf(list);
    newShoppingLists.splice(index, 1);
    setMyLists(newShoppingLists);
  }

  useEffect(() => {
    pullLists();
  }, []);
  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <h4 className={styles.title}>Shopping History</h4>
        {myLists?.map((l: any) => {
          const date = l?.createdAt?.slice(0, 10);
          return (
            <ListCard
              date={date}
              title={l.title}
              completed={l.completed}
              listId={l.id}
              removeItem={() => {
                deleteShoppingListFromState(l.id, l);
              }}
              key={l.id}
            />
          );
        })}
      </div>
      <div className={styles.list_container}>
        <ShoppingList />
      </div>
    </div>
  );
}
