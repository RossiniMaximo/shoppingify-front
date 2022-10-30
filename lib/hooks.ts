import { fetchAPI } from "lib";
import useSWR from "swr";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  meatAndFish,
  pasta,
  vegetables,
  beverages,
  dairyProducts,
  fruits,
  isList,
  userId,
  listTitle,
  listId,
} from "./atoms";

export const useIsList = () => useRecoilState(isList);
export const useIsListValue = () => useRecoilValue(isList);
export const useMeatAndFish = () => useRecoilState(meatAndFish);
export const useMeatAndFishValue = () => useRecoilValue(meatAndFish);
export const useVegetables = () => useRecoilState(vegetables);
export const useVegetablesValue = () => useRecoilValue(vegetables);
export const useDairyProducts = () => useRecoilState(dairyProducts);
export const useDairyProductsValue = () => useRecoilValue(dairyProducts);
export const useBeverages = () => useRecoilState(beverages);
export const useBeveragesValue = () => useRecoilValue(beverages);
export const usePasta = () => useRecoilState(pasta);
export const usePastaValue = () => useRecoilValue(pasta);
export const useFruits = () => useRecoilState(fruits);
export const useFruitsValue = () => useRecoilValue(fruits);
export const useUserId = () => useRecoilState(userId);
export const useUserIdValue = () => useRecoilValue(userId);
export const useListTitle = () => useRecoilState(listTitle);
export const useListTitleValue = () => useRecoilValue(listTitle);
export const useListId = () => useRecoilState(listId);
export const useListIdValue = () => useRecoilValue(listId);

export function useItems() {
  const { data } = useSWR("/items", fetchAPI, {
    revalidateOnFocus: true,
  });

  return { data };
}
