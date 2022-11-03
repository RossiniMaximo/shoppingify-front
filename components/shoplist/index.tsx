import styles from "./shoplist.module.css";

import {
  useBeverages,
  useVegetables,
  useMeatAndFish,
  useDairyProducts,
  useFruits,
  usePasta,
  useUserIdValue,
  useListId,
  useListTitle,
} from "lib/hooks";
import { ItemManager } from "components/itemManager";
import {
  addItemsToShoppingList,
  createList,
  updateShoppingListStatus,
} from "api";
import { Source } from "ui/icons/source";
import { useEffect, useState } from "react";
import { Spinner } from "components/spinner";
import { PopUp } from "components/popup";
import { getStoragedShoppingList, persistShoppingList } from "lib";

type ShoppingListProps = {
  onAddItem?: (any) => any;
};

export function ShoppingList(props: ShoppingListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [beverages, setBeverages] = useBeverages() as any;
  const [meatAndFish, setMeatAndFish] = useMeatAndFish() as any;
  const [vegetables, setVegetables] = useVegetables() as any;
  const [dairyProducts, setDairyProducts] = useDairyProducts() as any;
  const [fruits, setFruits] = useFruits() as any;
  const [pasta, setPasta] = usePasta() as any;
  const [listId, setListId] = useListId();
  const [listTitle, setListTitle] = useListTitle();
  const userId = useUserIdValue();

  useEffect(() => {
    const storage = getStoragedShoppingList();

    if (storage?.items.beverages) {
      setBeverages(storage.items.beverages);
    }
    if (storage?.items.meatAndFish) {
      setMeatAndFish(storage.items.meatAndFish);
    }
    if (storage?.items.vegetables) {
      setVegetables(storage.items.vegetables);
    }
    if (storage?.items.fruits) {
      setFruits(storage.items.fruits);
    }
    if (storage?.items.pasta) {
      setPasta(storage.items.pasta);
    }
    if (storage?.items.dairyProducts) {
      setDairyProducts(storage.items.dairyProducts);
    }
  }, []);

  async function handleCreateList(e) {
    e.preventDefault();

    const listName = e.target.title.value;

    setListTitle(listName);

    const listItems = [
      ...beverages,
      ...meatAndFish,
      ...vegetables,
      ...dairyProducts,
      ...fruits,
      ...pasta,
    ];

    const storageItems = {
      beverages: [...beverages],
      meatAndFish: [...meatAndFish],
      vegetables: [...vegetables],
      pasta: [...pasta],
      dairyProducts: [...dairyProducts],
      fruits: [...fruits],
    };

    const data = await createList(listName);

    setIsLoading(true);

    if (data) {
      persistShoppingList(storageItems, data.id);
      setIsLoading(false);
      const listId = data.id;
      setListId(listId);
      const res = await addItemsToShoppingList(listId, listItems);
      setIsPopUp(true);
      return res;
    }
  }

  function removeIt(items, item, category) {
    let newItems = [...items];
    const index = newItems.indexOf(item);
    newItems.splice(index, 1);

    if (category == "Meat & Fish") {
      setMeatAndFish(() => newItems);
    } else if (category == "Vegetables") {
      setVegetables(() => newItems);
    } else if (category == "Beverages") {
      setBeverages(() => newItems);
    } else if (category == "Pasta") {
      setPasta(() => newItems);
    } else if (category == "Dairy Products") {
      setDairyProducts(() => newItems);
    } else if (category == "Fruits") {
      setFruits(() => newItems);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        <div className={styles.add_container}>
          <div className={styles.img_container}>
            <Source />
          </div>
          <div className={styles.text_container}>
            <p className={styles.text}>Didn&apos;t find what you need?</p>
            <div className={styles.btn_container}>
              <button
                onClick={() => (props.onAddItem ? props.onAddItem(true) : "")}
                className={styles.btn}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>

        <div className={styles.categories_manager}>
          {beverages.length > 0 ? (
            <div>
              <p className={styles.category}>Beverages</p>
              {beverages.map((itemName) => {
                return (
                  <ItemManager
                    name={itemName}
                    key={Math.random() * 100}
                    removed={(res) => {
                      removeIt(beverages, itemName, "Beverages");
                    }}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
          {meatAndFish.length > 0 ? (
            <div>
              <p className={styles.category}>MeatAndFish</p>
              {meatAndFish.map((itemName) => {
                return (
                  <ItemManager
                    name={itemName}
                    key={Math.random() * 100}
                    removed={(res) => {
                      removeIt(meatAndFish, itemName, "Meat & Fish");
                    }}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
          {vegetables.length > 0 ? (
            <div>
              <p className={styles.category}>Vegetables</p>
              {vegetables.map((itemName) => {
                return (
                  <ItemManager
                    name={itemName}
                    key={Math.random() * 100}
                    removed={(res) => {
                      removeIt(vegetables, itemName, "Vegetables");
                    }}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
          {isPopUp ? (
            <div className={styles.pop_up_container}>
              <PopUp
                height="200px"
                width="400px"
                text={"You have succesfully created" + " " + listTitle}
              />
            </div>
          ) : (
            ""
          )}
          {pasta.length > 0 ? (
            <div>
              <p className={styles.category}>Pasta</p>
              {pasta.map((itemName) => {
                return (
                  <ItemManager
                    name={itemName}
                    key={Math.random() * 100}
                    removed={(res) => {
                      removeIt(pasta, itemName, "Pasta");
                    }}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
          {dairyProducts.length > 0 ? (
            <div>
              <p className={styles.category}>Dairy Products</p>
              {dairyProducts.map((itemName) => {
                return (
                  <ItemManager
                    name={itemName}
                    key={Math.random() * 100}
                    removed={(res) => {
                      removeIt(dairyProducts, itemName, "Dairy Products");
                    }}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
          {fruits.length > 0 ? (
            <div>
              <p className={styles.category}>Fruits</p>
              {fruits.map((itemName) => {
                return (
                  <ItemManager
                    name={itemName}
                    key={Math.random() * 100}
                    removed={(res) => {
                      removeIt(fruits, itemName, "Fruits");
                    }}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.bottom_container}>
        <form className={styles.form} onSubmit={handleCreateList}>
          <input
            type="text"
            placeholder="Enter a name"
            className={styles.input}
            name="title"
          />
          <div className={styles.form_btn_container}>
            {isLoading ? (
              <Spinner />
            ) : (
              <button className={styles.form_btn}>Save</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
