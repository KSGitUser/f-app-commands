import Vue from 'vue';
import Vuex from 'vuex';

import dialog from './dialog';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dialog,
    users
  }
});
