import { useState } from "react";
import styles from "./itemManager.module.css";
import { MdDeleteOutline, AiOutlinePlus, AiOutlineMinus } from "ui/icons";

export function ItemManager(item) {
  const [pieces, setPieces] = useState(0);
  const [isOptions, setIsOptions] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  if (item != undefined) {
    return (
      <div className={styles.item_container}>
        <p className={styles.name} onClick={() => setIsOptions(false)}>
          {item.name}
        </p>
        <div className={styles.pieces} onClick={() => setIsOptions(true)}>
          {isOptions ? (
            <div className={styles.options}>
              <div className={styles.delete_cont}>
                <MdDeleteOutline
                  size="20"
                  color="#FAFAFA"
                  onClick={() => {
                    setIsRemove(true);
                    item.removed(true);
                  }}
                />
              </div>
              <div
                onClick={() => setPieces((currentState) => currentState - 1)}
              >
                <AiOutlineMinus size="20" color="var(--dark-orange)" />
              </div>
              <div>{pieces}</div>
              <div
                onClick={() => {
                  setPieces((currentState) => currentState + 1);
                }}
              >
                <AiOutlinePlus size="20" color="var(--dark-orange)" />
              </div>
            </div>
          ) : (
            <div>
              <p style={{ padding: "5px" }}>{pieces} pcs/kg</p>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
