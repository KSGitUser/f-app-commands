import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify, {
  lang: {
    locales: {ru},
    current: 'ru'
  }
})

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
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'ru'
    }
  }
})
