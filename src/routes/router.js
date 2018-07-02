import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/layouts/Home.vue'
/*import Login from '@/components/layouts/Login.vue'
import Dash from '@/components/layouts/Dash.vue'*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
