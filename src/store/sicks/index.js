import api from './api';
import axios from 'axios'

// initial state
// initial state
const state = () => ({
  items: []
});

//getters
const getters = {
  items: (state) => state.items,
  itemsByKey: (state) =>
      state.items.reduce((res, cur) => {
        res[cur['id']] = cur;
        return res;
      }, {}),
  itemById: (state) => (id) => {
    const item = state.items.find((item) => item.id === id);
    return item ? { ...item, doctorName: getters.doctorById(state)(item.id_doctor).name } : null;
  },
  doctorById: (state) => (id) => {
    return state.doctors.find((doctor) => doctor.id === id);
  },
};

//mutations
const mutations = {
  setItems: (state, items) => {
    state.items = items;
  },
  setItem: (state, item) => {
    if (state.items && Array.isArray(state.items)) {
      state.items.push(item);
    }
  },
  removeItem: (state, idRemove) => {
    state.items = state.items.filter(({ id }) => id !== idRemove);
  },
  updateItem: (state, updateItem) => {
    const index = state.items.findIndex((item) => +item.id === +updateItem.id);
    state.items[index] = updateItem;
  },
};

//actions
const actions = {
  fetchItems: async ({ commit }) => {
    const items = await api.sicks();
    commit('setItems', items);
  },
  removeItem: async ({ commit }, id) => {
    const idRemoveItem = await api.remove(id);
    commit('removeItem', idRemoveItem);
  },
  addItem: async ({ commit }, sick) => {
    const response = await api.add(sick);
    commit('setItem', sick);
  },
  updateItem: async ({ commit }, sick) => {
    const item = api.update(sick);
    commit('updateItem', item);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
