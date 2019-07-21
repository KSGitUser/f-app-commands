import Vue from 'vue';
import Vuex from 'vuex';

import dialog from './dialog';


Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
      dialog,
    },
})
