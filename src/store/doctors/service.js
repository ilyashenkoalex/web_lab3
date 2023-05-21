export const fetchItems = (store) => {
  const { dispatch } = store;
  dispatch('doctors/fetchItems');
};

export const selectItems = (store) => {
  const { getters } = store;
  return getters['doctors/items'];
};

export const removeItem = (store, id) => {
  const { dispatch } = store;
  dispatch('doctors/removeItem', id);
};

export const addItem = (store, doctor) => {
  const { dispatch } = store;
  dispatch('doctors/addItem', doctor);
};

export const updateItem = (store, doctor) => {
  const { dispatch } = store;
  dispatch('doctors/updateItem', doctor);
};

export const selectItemById = (store, id) => {
  const { getters } = store;
  return getters['doctors/itemsByKey'][id] || {};
};
