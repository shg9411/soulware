import Vue from 'vue'
import Router from 'vue-router'
import board from '@/components/board'
import login from '@/components/login'
import detail from '@/components/detail'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'home',
      component: home

    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/board',
      name: 'board',
      component: board
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail,
      props: true
    }
  ]
})
