import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import { store } from './store/store'

//Vuetify
import Vuetify from 'vuetify'

//CSS
import 'vuetify/dist/vuetify.min.css'

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

//Mode
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  template: '<App/>'
}).$mount('#app')
