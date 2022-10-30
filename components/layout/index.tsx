import { useIsList } from "lib/hooks";
import {
  AiFillShop,
  IoRefreshSharp,
  AiOutlineUnorderedList,
  ImStatsBars,
  RiShoppingCartLine,
} from "ui/icons";
import styles from "./layout.module.css";
import { useRouter } from "next/router";

export function Layout() {
  const [isList, setIsList] = useIsList();
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div>
        <AiFillShop size={40} color="black" />
      </div>
      <div className={styles.mid_container}>
        <AiOutlineUnorderedList
          size={30}
          onClick={() => router.push("/home")}
        />
        <IoRefreshSharp
          size={30}
          color="black"
          onClick={() => router.push("/user/lists")}
        />
        <ImStatsBars size={30} onClick={() => router.push("/user/stats")} />
        <div className={styles.icon} onClick={() => setIsList(!isList)}>
          <RiShoppingCartLine size={30} color="black" />
        </div>
      </div>
    </div>
  );
}
