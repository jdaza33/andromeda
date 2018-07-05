import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import { store } from './store/store'
import VueCookie from 'vue-cookie'
import { sync } from 'vuex-router-sync'

//Vuetify
import Vuetify from 'vuetify'

//CSS
import 'vuetify/dist/vuetify.min.css'

//Auth
import Auth from './components/auth/index'

//Config
Vue.use(Vuetify, {
  theme: {
    primary: "#455A64",
    secondary: "#304FFE",
    accent: "#0277BD",
    error: "#F44336",
    warning: "#FDD835",
    info: "#2196f3",
    success: "#00C853"
  }
})

Vue.use(VueCookie)

//Sync
sync(store, router)

//Mode
Vue.config.productionTip = false

Auth.checkAuthentication()

new Vue({
  router,
  store,
  render: h => h(App),
  template: '<App/>'
}).$mount('#app')
