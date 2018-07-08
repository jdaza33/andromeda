import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import VueCookie from 'vue-cookie'
import notify from 'vue-notification'
import logger from 'vuejs-logger'

//Aux
//import { store } from './store/store'
//import { sync } from 'vuex-router-sync'

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
Vue.use(notify)

const loggerOptions = {
  // optional : defaults to true if not specified
  isEnabled: true,
  // required ['debug', 'info', 'warn', 'error', 'fatal']
  logLevel: 'debug',
  // optional : defaults to false if not specified
  stringifyArguments: false,
  // optional : defaults to false if not specified
  showLogLevel: false,
  // optional : defaults to false if not specified
  showMethodName: false,
  // optional : defaults to '|' if not specified
  separator: '|',
  // optional : defaults to false if not specified
  showConsoleColors: false
}

Vue.use(logger, loggerOptions)

//Sync
//sync(store, router)

//Mode
Vue.config.productionTip = false

Auth.checkAuthentication()

new Vue({
  router,
  render: h => h(App),
  template: '<App/>'
}).$mount('#app')
