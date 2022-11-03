import { getListItems, getUserLists } from "api";

const DEV_URL = "http://localhost:5500";
const PROD_URL = process.env.NEXT_PUBLIC_PRODUCTION_DATABASE || "";
export function getAuthToken() {
  return localStorage.getItem("auth_token");
}

export async function fetchAPI(input: RequestInfo, init: RequestInit | {}) {
  const token = getAuthToken();
  let newInit = init || ({} as any);
  newInit.headers ||= {};
  if (token) {
    newInit.headers.Authorization = "bearer" + " " + token;
  }
  if (newInit.body) {
    newInit.headers["Content-Type"] = "application/json";
    newInit.body = JSON.stringify(newInit.body);
  }
  const res = await fetch(PROD_URL + input, newInit);
  console.log("RES :", res);

  try {
    const data = await res.json();
    console.log("DATA:", data);

    return data;
  } catch (error) {
    console.log("ERROR :", error);

    return { error };
  }
}

export async function getListsStats() {
  const lists = await getUserLists();
  const result = Promise.allSettled(
    lists?.map(async (list, index) => {
      const date = list.createdAt.slice(0, 10);
      const items = await getListItems(list.id);
      const totalItems =
        items.meat.length +
        items.beverages.length +
        items.vegetables.length +
        items.fruit.length +
        items.dairy.length +
        items.pasta.length;
      const catStats = {
        beverages: items.beverages.length,
        meat: items.meat.length,
        vegetables: items.vegetables.length,
        fruit: items.fruit.length,
        dairy: items.dairy.length,
        pasta: items.pasta.length,
      };
      return {
        totalItems,
        date,
        catStats,
        items,
      };
    })
  );
  return result;
}

export function sortCategoriesStats(lists) {
  let meat = 0;
  let beverages = 0;
  let vegetables = 0;
  let dairy = 0;
  let pasta = 0;
  let fruit = 0;

  if (lists != null) {
    const result = lists?.map((list) => {
      const categories = list.categories;
      return categories;
    });
    result.map((cat) => {
      if (cat.beverages > 0) {
        return (beverages = beverages + cat.beverages);
      } else if (cat.meat > 0) {
        return (meat = meat + cat.meat);
      } else if (cat.vegetables > 0) {
        return (vegetables += cat.vegetables);
      } else if (cat.fruit > 0) {
        return (fruit += cat.fruit);
      } else if (cat.pasta > 0) {
        return (pasta += cat.pasta);
      } else if (cat.dairy > 0) {
        return (dairy += cat.dairy);
      }
    });
    return { meat, beverages, vegetables, dairy, pasta, fruit };
  }
}

export function sortByMostPopularItem(items) {
  let stats: {}[] = [];
  const itemsArr: string[] = [];
  const uniqueNames: {}[] = [];

  items?.map((i) => {
    if (i.meat.length > 0) {
      i.meat.map((item: any) => itemsArr.push(item.name));
    }
    if (i.vegetables.length > 0) {
      i.vegetables.map((item) => itemsArr.push(item.name));
    }
    if (i.pasta.length > 0) {
      i.pasta.map((item) => itemsArr.push(item.name));
    }
    if (i.fruit.length > 0) {
      i.fruit.map((item) => itemsArr.push(item.name));
    }
    if (i.dairy.length > 0) {
      i.dairy.map((item) => itemsArr.push(item.name));
    }
    if (i.beverages.length > 0) {
      i.beverages.map((item) => itemsArr.push(item.name));
    }
  });

  itemsArr.forEach(function callback(currentValue, index, array) {
    const res = array.filter((item) => {
      if (item == currentValue) {
        return item;
      }
    });
    stats.push({ name: array[index], quantity: res.length });
  });

  const unique = stats.filter((item: any) => {
    const isDuplicate = uniqueNames.includes(item.name);
    if (!isDuplicate) {
      uniqueNames.push(item.name);
      return true;
    }
    return false;
  });

  unique.sort((a: any, b: any) => b.quantity - a.quantity);
  if (unique.length > 6) {
    const popularItems = unique.slice(0, 6);
    return popularItems;
  } else {
    return unique;
  }
}

export function persistShoppingList(items, listId) {
  return localStorage.setItem(
    "shopping_list_items",
    JSON.stringify({ items, listId })
  );
}

export function getStoragedShoppingList() {
  const items = localStorage.getItem("shopping_list_items");
  if (items) {
    return JSON.parse(items);
  }
}
export function clearStoragedShoppingList() {
  return persistShoppingList({}, null);
}

export function setTokenInLocalStorage(token) {
  return localStorage.setItem("auth_token", token);
}

export function setUserIdStoraged(id) {
  return localStorage.setItem("user_id", id);
}
export function getUserIdStoraged() {
  return localStorage.getItem("user_id");
}
