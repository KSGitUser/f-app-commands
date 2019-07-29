import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import Page404 from '../components/Page/404'
import store from '../store'

const Board = resolve => {
  require.ensure(['../components/Board'], () => {
    resolve(
      require('../components/Board')
    )
  })
}

const User = resolve => {
  require.ensure(['../components/User'], () => {
    resolve(
      require('../components/User')
    )
  })
}

Vue.use(Router)

const ifAuth = (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/')
  }
}

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/board',
      name: 'board',
      component: Board,
      beforeEnter: ifAuth
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      beforeEnter: ifAuth
    },
    {
      path: '*',
      component: Page404
    }
  ],
  mode: 'history'
})
