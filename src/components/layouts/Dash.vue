<template>
  <v-app id="inspire">
    <i  v-show="loading" class="fas fa-spinner fa-spin"></i>
    <v-navigation-drawer v-model="drawer" fixed app width="200" class="blue lighten-3" dark>

      <v-toolbar flat class="transparent" >
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{this.userData.username}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-tile v-for="(item, itemIndex) in items" :key="itemIndex" @click="proa()" ripple>
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

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <v-btn slot="activator" icon>
          <v-icon>fas fa-chevron-circle-down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(menu, menuIndex) in menus" :key="menuIndex" @click="logout()">
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer dark height="auto">
    <v-card class="flex" flat tile>

      <v-card-actions class="grey darken-3 justify-center">
        &copy;2018 — <strong>Andromeda</strong>
      </v-card-actions>
    </v-card>
  </v-footer>

  </v-app>
</template>

<script>
import axios from "../../config/axios.js"
//import global from '../../config/global.js'

export default {
  data() {
    return {
      drawer: true,
      loading: false,
      
      userData: '',
      userInfoData: '',

      items: [
        { title: "Home", icon: "fas fa-home" },
        { title: "Contact", icon: "fas fa-phone" }
      ],
      right: null,
      menus: [
        {title: 'Cerrar Sesión'}
      ]

    }
  },
  methods: {

    logout(){
      axios.get(`/logout`)
      .then(res => {
        if(res.data.res){
          //this.$store.commit('SET_LAYOUT', 'login')
          //this.$router.push({name: 'login'})
          this.$cookie.delete('token');
          this.$cookie.delete('userId');
          location.reload()
        }
      })
      .catch(err => {
        alert(err)
      })
    },

    go(route) {
      this.$router.push({name: route})
    },

    async loadDataUser(){

      //Datos del Usuario
      await axios.get(`/user/${this.$cookie.get('userId')}`, {
        headers: { Authorization: "bearer " + this.$cookie.get('token') }
      })
      .then(res => {
        this.userData = res.data.user
      })
      .catch(err => {
        alert(err)
      })

      //Datos personales del usuario
      await axios.get(`/infopersonal/${this.userData.id_infopersonal}`, {
        headers: { Authorization: "bearer " + this.$cookie.get('token') }
      })
      .then(res => {
        this.userInfoData = res.data.infoPersonal
      })
      .catch(err => {
        alert(err)
      })

    }

  },

  created () {
    this.loadDataUser()
  },
  watch: {
    '$route': 'loadDataUser'
  },
};
</script>

<style scoped>
</style>
