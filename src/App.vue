<template>
  <v-app>
    <!--<component :is="layout"></component>-->
    <notifications group="notify" position="top center"/>
    <router-view></router-view>
  </v-app>
</template>

<script>
  //import Login from './components/layouts/Login'
  //import Dash from './components/layouts/Dash'
  //import Home from './components/layouts/Home'

  export default {
    /*computed: {
      layout () {
        return this.$store.getters.layout
      }
    },
    components: {
      'login': Login,
      'dash': Dash,
      'home': Home
    }*/
  }
</script>


