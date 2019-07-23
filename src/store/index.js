import Vue from 'vue';
import Vuex from 'vuex';

import dialog from './dialog';
import user from './user';
import common from './common';


Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        dialog, user, common
    },
})
