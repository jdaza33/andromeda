import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/layouts/Home.vue'
import Login from '@/components/layouts/Login.vue'
import Dash from '@/components/layouts/Dash.vue'
import Auth from '../components/auth/index'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false });
NProgress.configure({ minimum: 0.3 });

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/dash',
      name: 'dash',
      component: Dash,
      meta: {
        requiredAuth: true
      },
      props:true
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

  if (to.meta.isAuth) {
    if (Auth.user.authenticated) {
      router.push('/dash')
    } else {
      next()
    }
  } else {
    next()
  }

})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})



export default router
