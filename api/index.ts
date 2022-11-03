import { fetchAPI, getUserIdStoraged } from "lib";

export async function createList(title: string) {
  const userId = getUserIdStoraged();
  const data = await fetchAPI("/shopping-list", {
    method: "POST",
    body: { title, userId },
  });
  return data;
}

export async function addItemsToShoppingList(listId, items) {
  const userId = getUserIdStoraged();

  const data = await fetchAPI("/shopping-list/" + listId + "/items", {
    method: "POST",
    body: { items, userId },
  });
  return data;
}

export async function createItem(body) {
  const userId = getUserIdStoraged();

  const data = await fetchAPI("/items", {
    method: "POST",
    body: {
      item: {
        name: body.name,
        description: body.description,
        category: body.category,
        img: body.img,
      },
      userId,
    },
  });
  return data;
}

export async function getUserLists() {
  const userId = getUserIdStoraged();
  const data = await fetchAPI("/user/history", {
    method: "POST",
    body: { userId },
  });

  return data;
}

export async function getListItems(listId) {
  const userId = getUserIdStoraged();

  const data = await fetchAPI("/shopping-list/" + listId + "/item", {
    method: "POST",
    body: { userId },
  });
  return data;
}

export async function updateShoppingListStatus(listId, status) {
  const userId = getUserIdStoraged();

  const data = await fetchAPI("/shopping-list/" + listId, {
    method: "PUT",
    body: { status, userId },
  });

  return data;
}

export async function login(userData) {
  const { fullname, email, password } = userData;
  const data = await fetchAPI("/users", {
    method: "POST",
    body: { fullname, email, password },
  });
  return data;
}

export async function deleteShoppingList(listId) {
  const userId = getUserIdStoraged();

  const data = await fetchAPI("/shopping-list/" + listId, {
    method: "DELETE",
    body: {
      userId,
    },
  });
  return data;
}

export async function getItemsByName(itemName: string) {
  const userId = getUserIdStoraged();
  const result = await fetchAPI("/item", {
    method: "POST",
    body: {
      itemName,
      userId,
    },
  });
  return result;
}
