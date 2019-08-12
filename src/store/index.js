import Vue from 'vue';
import Vuex from 'vuex';

import dialog from './dialog';
import user from './user';
import common from './common';
import infoSnackbar from './infoSnackbar';
import boards from './boards';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        dialog,
        user,
        common,
        infoSnackbar,
        boards
    }
});
