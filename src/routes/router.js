import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../components/auth/index'

//Layouts
import Home from '@/components/layouts/Home.vue'
import Login from '@/components/layouts/Login.vue'
import Dash from '@/components/layouts/Dash.vue'
import RegisterRoot from '@/components/layouts/RegisterRoot.vue'

//Views
import Supporta from '@/components/views/SupportForAdmin'
import Supportc from '@/components/views/SupportForClient'
import Report from '@/components/views/ReportForAdmin'
import Users from '@/components/views/Users'
import Calendar from '@/components/views/Calendar'
import BillForAdmin from '@/components/views/BillForAdmin'
import BillForClient from '@/components/views/BillForClient'

//Templates
import ReportTemp from '@/components/templates/Report'

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
        isAuth: false
      }
    },
    {
      path: '/newroot',
      name: 'newroot',
      component: RegisterRoot,
      meta: {
        isAuth: false
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
      path: '/reportemp/:nro',
      name: 'reportemp',
      component: ReportTemp,
      meta: {
        isAuth: false,
        requiredRol: false,
        requiredAuth: false
      },
      props: true
    },
    {
      path: '/dash',
      name: 'dash',
      component: Dash,
      meta: {
        requiredAuth: true
      },
      props:true,
      children: [
        {
          path: 'supporta',
          name: 'supporta',
          component: Supporta,
          meta:{
            requiredRol: true,
            requiredAuth: true
          }
        },
        {
          path: 'supportc',
          name: 'supportc',
          component: Supportc,
          meta: {
            requiredRol: true,
            requiredAuth: true
          }
        },
        {
          path: 'users',
          name: 'users',
          component: Users,
          meta: {
            requiredRol: true,
            requiredAuth: true
          }
        },
        {
          path: 'report',
          name: 'report',
          component: Report,
          meta: {
            requiredRol: true,
            requiredAuth: true
          }
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: Calendar,
          meta: {
            requiredRol: true,
            requiredAuth: true
          }
        },
        {
          path: 'billadmin',
          name: 'billadmin',
          component: BillForAdmin,
          meta: {
            requiredRol: true,
            requiredAuth: true
          }
        },
        {
          path: 'billclient',
          name: 'billclient',
          component: BillForClient,
          meta: {
            requiredRol: true,
            requiredAuth: true
          }
        }
      ]
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
