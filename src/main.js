import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css';


Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    created () {
        firebase.initializeApp({
            apiKey: 'AIzaSyBw--izaf_eLYb0rSrAkY4AReNFzTCyMD0',
            authDomain: 'gb-project-dev.firebaseapp.com',
            databaseURL: 'https://gb-project-dev.firebaseio.com',
            projectId: 'gb-project-dev',
            storageBucket: '',
            messagingSenderId: '848679475804',
            appId: '1:848679475804:web:dadc7d4a115af7da'
        })

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch('autoLoginUser', user)
            }
        })

    }
});
