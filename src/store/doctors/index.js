import api from './api';
import axios from 'axios';

// initial state
const state = () => ({
  items: [],
});

//getters
const getters = {
  items: (state) => state.items,
  itemsByKey: (state) => {
    if (!Array.isArray(state.items) || state.items.length === 0) {
      return {};
    }

    return state.items.reduce((res, cur) => {
      res[cur['id']] = cur;
      return res;
    }, {});
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
  updateItem: (state, doctor) => {
    const index = state.items.findIndex((item) => item.id === doctor.id);
    state.items[index] = doctor;
  },
};
//actions
const actions = {
  fetchItems: async ({ commit }) => {
    const items = await api.doctors();
    commit('setItems', items);
  },
  removeItem: async ({ commit }, id) => {
    const idRemoveItem = await api.remove(id);
    commit('removeItem', idRemoveItem);
  },
  addItem: async ({ commit }, doctor) => {
    const response = await api.add(doctor);
    commit('setItem', doctor);
  },
  updateItem: async ({ commit }, doctor) => {
    const item = await api.update(doctor);
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
