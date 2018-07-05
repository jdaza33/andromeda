import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/layouts/Home.vue'
import Login from '@/components/layouts/Login.vue'
import Dash from '@/components/layouts/Dash.vue'
import Auth from '../components/auth/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/dash',
      name: 'dash',
      component: Dash,
      meta: {
        requiredAuth: true
      }
    }
  ]

})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (Auth.user.authenticated) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
