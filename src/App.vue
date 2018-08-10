<template>
  <div>
    <!--<component :is="layout"></component>-->
    <router-view></router-view>
  </div>
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

<style lang="scss">
  // Import Bulma's core
  
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #4f93ed;
  $primary-invert: findColorInvert($primary);
  $twitter: rgb(22, 179, 100);
  $twitter-invert: findColorInvert($twitter);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
      "white": ($white, $black),
      "black": ($black, $white),
      "light": ($light, $light-invert),
      "dark": ($dark, $dark-invert),
      "primary": ($primary, $primary-invert),
      "info": ($info, $info-invert),
      "success": ($success, $success-invert),
      "warning": ($warning, $warning-invert),
      "danger": ($danger, $danger-invert),
      "twitter": ($twitter, $twitter-invert)
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>

<style> 
.loading-overlay .loading-background {
      background: #4f93ed;
  }

.loading-overlay.is-full-page .loading-icon:after {
    top: calc(50% - 2.5em);
    left: calc(50% - 2.5em);
    width: 5em;
    height: 5em;
}
</style>




