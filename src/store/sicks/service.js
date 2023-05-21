export const fetchItems = (store) => {
  const { dispatch } = store;
  dispatch('sicks/fetchItems');
};
export const selectItems = (store) => {
  const { getters } = store;
  return getters['sicks/items'];
};
export const removeItem = (store, id) => {
  const { dispatch } = store;
  dispatch('sicks/removeItem', id);
};
export const addItem = (store, doctor) => {
  const { dispatch } = store;
  dispatch('sicks/addItem', doctor);
};
export const updateItem = (store, sick) => {
  const { dispatch } = store;
  dispatch('sicks/updateItem', sick);
};
export const selectItemById = (store, id) => {
  const { getters } = store;
  return getters['sicks/itemsByKey'][id] || {};
};
