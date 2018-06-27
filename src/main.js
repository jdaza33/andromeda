import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'

//Vuesax
import Vuesax from 'vuesax'

//CSS
import 'vuesax/dist/vuesax.css'

//Config
Vue.use(Vuesax)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
