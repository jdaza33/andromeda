<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app width="200">

      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>José Bolívar</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-tile v-for="item in items" :key="item" ripple>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>

    </v-navigation-drawer>

    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-icon>fas fa-bars</v-icon></v-toolbar-side-icon>
      <v-toolbar-title>Andromeda</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        
      </v-container>
    </v-content>

    <v-footer app>
      <span class="black--text">Andromeda - 2018 &copy;</span>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "fas fa-home" },
        { title: "Contact", icon: "fas fa-phone" }
      ],
      right: null
    };
  }
};
</script>

<style scoped>
</style>
