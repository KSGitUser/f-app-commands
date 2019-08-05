import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  created () {
    if (localStorage.getItem('user')) {
      this.$store.dispatch('autoLoginUser', localStorage.getItem('user'))
    }
  },
  router,
  components: {App},
  template: '<App/>',

})
