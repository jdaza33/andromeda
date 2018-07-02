<template>
    <div>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-btn color="primary" @click="setLayout('login')">Login</v-btn>
            <v-btn color="secondary" @click="setLayout('dash')">Dash</v-btn>
          </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  }
};
</script>
