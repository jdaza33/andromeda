<template>
    <div>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <!--<router-link to="/login">Login</router-link>-->
          <v-btn color="primary" @click="go('login')">Login</v-btn>
          <!--<v-btn color="secondary" @click="setLayout('dash')">Dash</v-btn>-->
        </v-layout>
      </v-container>
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
