<template>
    <div>
      <div>
        <!--<router-link to="/login">Login</router-link>-->
        <a @click="go('login')" class="button is-vcentered is-primary is-outlined is-rounded">Login</a>
        <!--<v-btn color="secondary" @click="setLayout('dash')">Dash</v-btn>-->
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  methods: {
    /*setLayout(layout) {
      //this.$store.commit("SET_LAYOUT", layout)
      //this.$store.state.route.path(layout)
    }*/
    go(route){
      this.$router.push({name: route})
    }
  }
};
</script>
