import { atom } from "recoil";

export const meatAndFish = atom({
  key: "meatAndFish",
  default: [],
});
export const vegetables = atom({
  key: "vegetables",
  default: [],
});
export const beverages = atom({
  key: "beverages",
  default: [],
});
export const dairyProducts = atom({
  key: "dairyProducts",
  default: [],
});
export const pasta = atom({
  key: "pasta",
  default: [],
});
export const fruits = atom({
  key: "fruits",
  default: [],
});
export const isList = atom({
  key: "isList",
  default: false,
});

export const userId = atom({
  key: "user",
  default: null,
});

export const listTitle = atom({
  key: "listTitle",
  default: "",
});

export const listId = atom({
  key: "listId",
  default: "",
});
