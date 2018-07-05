<template>
   <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>

            <v-card class="elevation-12" v-if="show==1">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{global.title.login}}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="fas fa-user" v-model="login.username" name="username" :label="global.input.username" type="text"></v-text-field>
                  <v-text-field prepend-icon="fas fa-lock" v-model="login.password" name="password" :label="global.input.password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <a @click="changeShow(2)">{{global.title.register}}</a> | 
                <a @click="changeShow(3)">{{global.title.restoreKey}}</a>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="loginUser()">{{global.button.enter}}</v-btn>
              </v-card-actions>
            </v-card>

            <v-card class="elevation-12" v-if="show==2">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{global.title.register}}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="fas fa-user" v-model="register.name" name="name" :label="global.input.name" type="text"></v-text-field>
                  <v-text-field prepend-icon="fas fa-card" v-model="register.nit" name="nit" :label="global.input.nit" type="text"></v-text-field>
                  <v-text-field prepend-icon="fas fa-email" v-model="register.email" name="email" :label="global.input.email" type="email"></v-text-field>
                  <v-text-field prepend-icon="fas fa-user" v-model="register.username" name="username" :label="global.input.username" type="text"></v-text-field>
                  <v-text-field prepend-icon="fas fa-lock" v-model="register.password" name="password" :label="global.input.password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <a @click="changeShow(1)">{{global.title.login}}</a> | 
                <a @click="changeShow(3)">{{global.title.restoreKey}}</a>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="newUser()">{{global.button.save}}</v-btn>
              </v-card-actions>
            </v-card>

            <v-card class="elevation-12" v-if="show==3">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{global.title.restoreKey}}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="fas fa-email" v-model="email" name="email" :label="global.input.email" type="email"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <a @click="changeShow(1)">{{global.title.login}}</a> | 
                <a @click="changeShow(2)">{{global.title.register}}</a>
                <v-spacer></v-spacer>
                <v-btn color="primary">{{global.button.restore}}</v-btn>
              </v-card-actions>
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import global from "../../config/global.js";
import auth from "../auth/index.js";

export default {
  name: "login",
  data() {
    return {
      validLogin: false,
      show: 1,
      email: "",
      login: { username: "", password: "" },
      register: { name: "", nit: "", email: "", username: "", password: "" },
      global: global.text_es
    };
  },
  methods: {
    changeShow(number) {
      this.show = number;
    },

    newUser() {
      axios
        .post(`${global.path.api}/others/newuser`, this.register)
        .then(res => {
          if (res.data.res) {
            alert("REGISTRO EXITOSO");
            this.show = 1;
            this.clearRegister();
          } else {
            if (res.data.err == 1) {
              alert("NIT REGISTRADO");
            }
            if (res.data.err == 2) {
              alert("EMAIL REGISTRADO");
            }
            if (res.data.err == 3) {
              alert("USERNAME REGISTRADO");
            }
          }
        })
        .catch(err => {
          alert(err);
        });
    },

    loginUser() {
      auth.authenticate(this, this.login, "dash");
    },

    clearRegister() {
      this.register.name = "";
      this.register.email = "";
      this.register.nit = "";
      this.register.username = "";
      this.register.password = "";
    }
  }
};
</script>



