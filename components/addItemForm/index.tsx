import { createItem } from "api";
import styles from "./addItem.module.css";
import { useUserIdValue } from "../../lib/hooks";
import { UploadImage } from "components/uploadImage";
import { useState } from "react";
import { useItems } from "lib/hooks";

type ItemProps = {
  onCancel: (any) => any;
};

export function AddItemForm(props: ItemProps) {
  const [imgURL, setImgURL] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.item_name.value;
    const description = target.item_description.value;
    const category = target.category.value;
    const item = { name, description, category, img: imgURL };
    const res = await createItem(item);
    hideList();
    return res;
  }
  function hideList() {
    props.onCancel(false);
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h4 className={styles.title}>Add a new item</h4>
      <div className={styles.fields_container}>
        <label className={styles.label}>
          <p className={styles.field_title}>Name</p>
          <input
            placeholder="Enter a name"
            className={styles.input}
            type="text"
            name="item_name"
          />
        </label>
        <label className={styles.label}>
          <p className={styles.field_title}>Description</p>
          <textarea
            placeholder="Enter an item description"
            className={styles.text_area}
            name="item_description"
          ></textarea>
        </label>
        <div className={styles.label}>
          <UploadImage imgURL={(url) => setImgURL(url)} />
        </div>
        <label className={styles.label}>
          <p className={styles.field_title}>Category</p>
          <select
            className={styles.select}
            name="category"
            id="ad"
            placeholder="Enter a category"
          >
            <option className={styles.option} value="Meat & Fish">
              Meat & Fish
            </option>
            <option className={styles.option} value="Vegetables">
              Vegetables
            </option>
            <option className={styles.option} value="Fruit">
              Fruits
            </option>
            <option className={styles.option} value="Beverages">
              Beverages
            </option>
            <option className={styles.option} value="Dairy products">
              Dairy Products
            </option>
            <option className={styles.option} value="Pasta">
              Pasta
            </option>
          </select>
        </label>
      </div>
      <div className={styles.btns_container}>
        <div className={styles.cancel_btn} onClick={hideList}>
          Cancel
        </div>
        <button className={styles.save_btn}>Save</button>
      </div>
    </form>
  );
}
