import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import VueCookie from 'vue-cookie'
import notify from 'vue-notification'
import logger from 'vuejs-logger'
import vueEventCalendar from 'vue-event-calendar'
import VueHtml2Canvas from 'vue-html2canvas'
import VueTheMask from 'vue-the-mask'


//Calendar
import 'vue-event-calendar/dist/style.css' 


//Buefy
import Buefy from 'buefy'

//CSS Buefy
import 'buefy/lib/buefy.css'

//Aux
//import { store } from './store/store'
//import { sync } from 'vuex-router-sync'

//Auth
import Auth from './components/auth/index'

//Config

Vue.use(VueCookie)
Vue.use(notify)
Vue.use(Buefy)
Vue.use(VueHtml2Canvas)
Vue.use(VueTheMask)

//Calendar
Vue.use(vueEventCalendar, { locale: 'en' }) 

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
  render: h => h(App)
}).$mount('#app')
