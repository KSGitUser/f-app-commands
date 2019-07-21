import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Board from '@/components/Board'
import User from '@/components/User'
import Page404 from '@/components/Page/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
    },
    {
      path: '/board',
      name: 'board',
      component: Board,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '*',
      component: Page404,
    },
  ],
  mode: 'history',
})
