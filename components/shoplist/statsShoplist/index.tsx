import { updateShoppingListStatus } from "api";
import { clearStoragedShoppingList, getStoragedShoppingList } from "lib";
import {
  useBeverages,
  useMeatAndFish,
  useVegetables,
  useDairyProducts,
  useFruits,
  usePasta,
  useListId,
  useUserIdValue,
} from "lib/hooks";
import { useState, useEffect } from "react";
import styles2 from "../statsShopList.module.css";
import styles from "../shoplist.module.css";
import { ItemManager } from "components/itemManager";
import { PopUp } from "components/popup";
import { Source } from "ui/icons/source";
type ShoppingListProps = {
  onAddItem?: (any) => any;
};
export function ShoppingListForStats(props: ShoppingListProps) {
  const [beverages, setBeverages] = useBeverages() as any;
  const [meatAndFish, setMeatAndFish] = useMeatAndFish() as any;
  const [vegetables, setVegetables] = useVegetables() as any;
  const [dairyProducts, setDairyProducts] = useDairyProducts() as any;
  const [fruits, setFruits] = useFruits() as any;
  const [pasta, setPasta] = usePasta() as any;
  const [listId, setListId] = useListId();
  const userId = useUserIdValue();
  const [isCanceled, setIsCanceled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const { items, listId } = getStoragedShoppingList();
    if (listId) {
      setListId(listId);
    }
    if (items.beverages) {
      setBeverages(items.beverages);
    }
    if (items.meatAndFish) {
      setMeatAndFish(items.meatAndFish);
    }
    if (items.vegetables) {
      setVegetables(items.vegetables);
    }
    if (items.fruits) {
      setFruits(items.fruits);
    }
    if (items.pasta) {
      setPasta(items.pasta);
    }
    if (items.dairyProducts) {
      setDairyProducts(items.dairyProducts);
    }
  }, []);

  async function handleCompleteList() {
    const res = await updateShoppingListStatus(listId, "completed");
    if (res) {
      setIsCompleted(true);
      setBeverages([]);
      setMeatAndFish([]);
      setVegetables([]);
      setDairyProducts([]);
      setFruits([]);
      setPasta([]);
      clearStoragedShoppingList();
      return true;
    }
  }

  async function handleCancelList() {
    const res = await updateShoppingListStatus(listId, "cancelled");
    if (res) {
      setIsCanceled(true);
      setBeverages([]);
      setMeatAndFish([]);
      setVegetables([]);
      setDairyProducts([]);
      setFruits([]);
      setPasta([]);
      clearStoragedShoppingList();
      return true;
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
                    key={Math.floor(Math.random() * 100)}
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
                    key={Math.floor(Math.random() * 100)}
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
                    key={Math.floor(Math.random() * 100)}
                  />
                );
              })}
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
                    key={Math.floor(Math.random() * 100)}
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
                    key={Math.floor(Math.random() * 100)}
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
                    key={Math.floor(Math.random() * 100)}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {isCanceled ? (
        <div className={styles2.pop_up}>
          <PopUp
            height="200px"
            width="400px"
            text={"Haz cancelado la lista satisfactoriamente."}
          />
        </div>
      ) : (
        ""
      )}

      {isCompleted ? (
        <div className={styles2.pop_up}>
          <PopUp
            height="200px"
            width="400px"
            text={"Haz completado la lista satisfactoriamente."}
          />
        </div>
      ) : (
        ""
      )}

      <div className={styles2.list_submit_container}>
        <div className={styles2.list_submit}>
          <form className={styles2.options}>
            <button
              type="button"
              onClick={handleCancelList}
              className={styles2.option1}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCompleteList}
              className={styles2.option2}
            >
              Complete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
