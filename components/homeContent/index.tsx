import styles from "./homecontent.module.css";
import { useItems } from "lib/hooks";
import { ItemCards } from "components/itemsCards";
import { SearchForm } from "components/searchForm/searchForm";
import { ShoppingList } from "components/shoplist";
import { useState } from "react";
import { useIsListValue } from "lib/hooks";
import { AddItemForm } from "components/addItemForm";
import { itemType } from ".d";
import { v4 as uuidv4 } from "uuid";

export function HomeContent() {
  const [isAddItem, setIsAddItem] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [results, setResults] = useState([]);
  const { data } = useItems();
  const isList = useIsListValue();
  const style = isSearchResult ? { display: "none" } : {};

  return (
    <div className={styles.container}>
      <div className={styles.top_content}>
        <h1 className={styles.title}>
          <span className={styles.name}>Shoppingify</span> allows you take your
          shopping list wherever you go
        </h1>
        <div className={styles.search_bar}>
          <SearchForm
            searchResults={(results) => {
              setResults(results);
              setIsSearchResult(true);
            }}
          />
        </div>
      </div>
      {isSearchResult ? (
        <div className={styles.content}>
          {results?.map((item: itemType) => {
            return (
              <div>
                <ItemCards
                  name={item.name}
                  category={item.category}
                  key={uuidv4()}
                />
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <div style={style} className={styles.content}>
        {data?.beverages ? (
          <div>
            <p className={styles.items_category}>Beverages</p>
            <div className={styles.items_container}>
              {data?.beverages.map((b: itemType) => {
                return (
                  <ItemCards
                    name={b.name}
                    category={b.category}
                    key={uuidv4()}
                  />
                );
              })}
            </div>{" "}
          </div>
        ) : (
          ""
        )}
        {data?.dairyProducts ? (
          <div>
            <p className={styles.items_category}>Dairy Products</p>
            <div className={styles.items_container}>
              {data.dairyProducts.map((i: itemType) => {
                return (
                  <ItemCards
                    name={i.name}
                    category={i.category}
                    key={uuidv4()}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {data?.meatAndFish ? (
          <div>
            <p className={styles.items_category}>Meat & Fish</p>
            <div className={styles.items_container}>
              {data.meatAndFish.map((i: itemType) => {
                return (
                  <ItemCards
                    name={i.name}
                    category={i.category}
                    key={uuidv4()}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {data?.vegetables ? (
          <div>
            <p className={styles.items_category}>Vegetables</p>
            <div className={styles.items_container}>
              {data.vegetables.map((i: itemType) => {
                return (
                  <ItemCards
                    name={i.name}
                    category={i.category}
                    key={uuidv4()}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {data?.fruits ? (
          <div>
            <p className={styles.items_category}>Fruits</p>
            <div className={styles.items_container}>
              {data.fruits.map((i: itemType) => {
                return (
                  <ItemCards
                    name={i.name}
                    category={i.category}
                    key={uuidv4()}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {data?.pasta ? (
          <div>
            <p className={styles.items_category}>Pasta</p>
            <div className={styles.items_container}>
              {data.pasta.map((i: itemType) => {
                return (
                  <ItemCards
                    name={i.name}
                    category={i.category}
                    key={uuidv4()}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {isList ? (
        <div className={styles.low_res_list}>
          <ShoppingList />
        </div>
      ) : (
        ""
      )}

      <div className={styles.shoppinglist_container}>
        {isAddItem ? (
          <AddItemForm onCancel={(param) => setIsAddItem(param)} />
        ) : (
          <ShoppingList onAddItem={(param) => setIsAddItem(param)} />
        )}
      </div>
    </div>
  );
}
