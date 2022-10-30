import { getItemsByName } from "api";
import { AiOutlineSearch } from "../../ui/icons";
import styles from "./input.module.css";

export function SearchForm(props) {
  async function handleSubmit(e) {
    e.preventDefault();
    const itemName = e.target.item.value;
    const result = await getItemsByName(itemName);
    props.searchResults(result);
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.btn_container}>
        <button className={styles.btn}>
          <AiOutlineSearch size="20" />
        </button>
      </div>
      <input
        type="text"
        className={styles.input}
        name="item"
        placeholder="search item"
      />
    </form>
  );
}
