import { createStore } from 'vuex';
import sicks from './sicks';
import doctors from './doctors';
export default createStore({
  modules: {
    sicks,
    doctors,
  },
});
