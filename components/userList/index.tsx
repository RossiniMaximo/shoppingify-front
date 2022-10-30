import styles from "./userList.module.css";
import { getListItems } from "api";
import { useEffect, useState } from "react";
import { ListItemCard } from "ui/icons/cards/listItem";
import { useListTitleValue } from "lib/hooks";
import { ShoppingList } from "components/shoplist";

type itemType = {
  category: string;
  name: string;
  createdAt: string;
  description: string;
  id: number;
  img: string;
  listItem: object;
  updatedAt: string;
};

export function UserList(props) {
  const listTitle = useListTitleValue();
  const [vegetables, setVegetables] = useState([]);
  const [meat, setMeat] = useState([]);
  const [pasta, setPasta] = useState([]);
  const [fruit, setFruit] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [beverages, setBeverages] = useState([]);

  async function pullListItems() {
    const result = await getListItems(props.query);
    console.log("RESULT", result);

    setVegetables(result.vegetables);
    setMeat(result.meat);
    setPasta(result.pasta);
    setFruit(result.fruit);
    setDairy(result.dairy);
    setBeverages(result.beverages);
  }
  useEffect(() => {
    pullListItems();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.content_container}>
        <div>
          <h4 className={styles.list_title}>{listTitle}</h4>
        </div>
        {vegetables?.length > 0 ? (
          <div>
            <p className={styles.category}>Vegetables</p>
            <div className={styles.card_container}>
              {vegetables.map((item: itemType) => {
                return (
                  <ListItemCard
                    name={item.name}
                    description={item.description}
                    img={item.img}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {meat?.length > 0 ? (
          <div>
            <p className={styles.category}>Meat And Fish</p>
            <div className={styles.card_container}>
              {meat.map((item: itemType) => {
                return (
                  <div>
                    <ListItemCard
                      name={item.name}
                      description={item.description}
                      img={item.img}
                      key={item.id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {pasta?.length > 0 ? (
          <div>
            <p className={styles.category}>Pasta</p>
            <div className={styles.card_container}>
              {pasta.map((item: itemType) => {
                return (
                  <ListItemCard
                    name={item.name}
                    description={item.description}
                    img={item.img}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {fruit?.length > 0 ? (
          <div>
            <p className={styles.category}>Fruit</p>
            <div className={styles.card_container}>
              {fruit.map((item: itemType) => {
                return (
                  <ListItemCard
                    name={item.name}
                    description={item.description}
                    img={item.img}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {dairy?.length > 0 ? (
          <div>
            <p className={styles.category}>Dairy Products</p>
            <div className={styles.card_container}>
              {dairy.map((item: itemType) => {
                return (
                  <ListItemCard
                    name={item.name}
                    description={item.description}
                    img={item.img}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {beverages?.length > 0 ? (
          <div>
            <p className={styles.category}>Beverages</p>
            <div className={styles.card_container}>
              {beverages.map((item: itemType) => {
                return (
                  <ListItemCard
                    name={item.name}
                    description={item.description}
                    img={item.img}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.shopping_list_container}>
        <ShoppingList />
      </div>
    </div>
  );
}
