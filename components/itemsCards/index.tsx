import styles from "./itemCards.module.css";
import {
  useDairyProducts,
  useMeatAndFish,
  useVegetables,
  usePasta,
  useBeverages,
  useFruits,
} from "lib/hooks";
import { ItemCardsProps } from "../../.d";

// Manage UI shopping list add item to list animation.

export function ItemCards(props: ItemCardsProps) {
  const [vegetables, setVegetables] = useVegetables() as any;
  const [meatAndFish, setMeatAndFish] = useMeatAndFish() as any;
  const [dairyProducts, setDairyProducts] = useDairyProducts() as any;
  const [pasta, setPasta] = usePasta() as any;
  const [beverages, setBeverages] = useBeverages() as any;
  const [fruits, setFruits] = useFruits() as any;

  function addItemHandler() {
    if (props.category == "Vegetables") {
      setVegetables((currentAtom) => [...currentAtom, props.name]);
    } else if (props.category == "Meat & Fish") {
      setMeatAndFish((currentAtom) => [...currentAtom, props.name]);
    } else if (props.category == "Beverages") {
      setBeverages((currentAtom) => [...currentAtom, props.name]);
    } else if (props.category == "Dairy products") {
      setDairyProducts((currentAtom) => [...currentAtom, props.name]);
    } else if (props.category == "Pasta") {
      setPasta((currentAtom) => [...currentAtom, props.name]);
    } else if (props.category == "Fruits") {
      setFruits((currentAtom) => [...currentAtom, props.name]);
    }
  }

  return (
    <div className={styles.container} onClick={() => addItemHandler()}>
      <ul className={styles.list}>
        <li className={styles.item}>{props.name}</li>
        <span className={styles.add}>+</span>
      </ul>
    </div>
  );
}
