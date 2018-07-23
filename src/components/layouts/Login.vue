<template>
  <div class="columns" >

    <div class="column is-one-third" v-if="show==1">

      <section class="section">
        <div class="has-text-centered">
            <img class="login-logo" src="img/logo.svg">
        </div>

        <b-field>
          <b-input :placeholder="global.input.username"
                type="text"
                icon-pack="fas"
                icon="user"
                maxlength="12"
                min="5"
                v-model="login.username"
                @keyup.enter.native="loginUser()"
                rounded>
            </b-input>
        </b-field>

        <b-field>
          <b-input :placeholder="global.input.password"
                type="password"
                icon-pack="fas"
                icon="key"
                password-reveal
                v-model="login.password"
                @keyup.enter.native="loginUser()"
                rounded>
            </b-input>
        </b-field>

        <div class="has-text-centered">
          <a @click="loginUser()" class="button is-vcentered is-primary is-outlined is-rounded">{{global.title.login}}</a>
        </div>
        <div class="has-text-centered">
          <a @click="changeShow(2)">{{global.title.register}}</a>
        </div>
      </section>
    </div>

    <div class="column is-one-third" v-if="show==2">
      <section class="section">
        <div class="has-text-centered">
            <img class="login-logo" src="img/logo.svg">
        </div>

        <b-field>
          <b-input :placeholder="global.input.name"
                type="text"
                icon-pack="fas"
                icon="user-circle"
                maxlength="20"
                v-model="register.name"
                @keyup.enter.native="newUser()"
                rounded>
            </b-input>
        </b-field>

        <b-field>
          <b-input :placeholder="global.input.nit"
                type="text"
                icon-pack="fas"
                icon="address-card"
                maxlength="20"
                v-model="register.nit"
                @keyup.enter.native="newUser()"
                rounded>
            </b-input>
        </b-field>
        
        <b-field>
          <b-input :placeholder="global.input.email"
                type="email"
                icon-pack="fas"
                icon="at"
                maxlength="50"
                v-model="register.email"
                @keyup.enter.native="newUser()"
                rounded>
            </b-input>
        </b-field>

        <b-field>
          <b-input :placeholder="global.input.username"
                type="text"
                icon-pack="fas"
                icon="user"
                maxlength="12"
                v-model="register.username"
                @keyup.enter.native="newUser()"
                rounded>
            </b-input>
        </b-field>

        <b-field>
          <b-input :placeholder="global.input.password"
                type="password"
                icon-pack="fas"
                icon="key"
                password-reveal
                v-model="register.password"
                @keyup.enter.native="newUser()"
                rounded>
            </b-input>
        </b-field>

        <div class="has-text-centered">
          <a @click="newUser()" class="button is-vcentered is-primary is-outlined is-rounded">{{global.button.save}}</a>
        </div>
        <div class="has-text-centered">
          <a @click="changeShow(1)">{{global.title.login}}</a>
        </div>
      </section>
    </div>

    <div id="particles-js" class="interactive-bg column">
    </div>
  </div>
</template>

<script>
import axios from "../../config/axios.js";
import global from "../../config/global.js";
import notify from "../../config/notify.js";
import auth from "../auth/index.js";

export default {
  name: "login",
  data() {
    return {
      show: 1,
      login: { username: "", password: "" },
      register: { name: "", nit: "", email: "", username: "", password: "" },
      global: global.text
    };
  },
  methods: {
    changeShow(number) {
      this.show = number;
    },

    newUser() {
      if (this.validateInput(this.register)) {
        axios
          .post(`/others/newuser`, this.register)
          .then(res => {
            this.$log.debug(res.data);
            if (res.data.res) {
              notify(this, res.data.cod);
              this.show = 1;
              this.clearRegister();
            } else {
              notify(this, res.data.err);
            }
          })
          .catch(err => {
            alert(err);
          });
      }
    },

    loginUser() {
      if (this.validateInput(this.login)) {
        auth.authenticate(this, this.login, "dash");
      }
    },

    clearRegister() {
      this.register.name = "";
      this.register.email = "";
      this.register.nit = "";
      this.register.username = "";
      this.register.password = "";
    },

    go(route) {
      this.$router.push({ name: route });
    },

    validateInput(array) {
        let aux = true;

        for (let i in array) {
            if (array[i] == "") {
            aux = false;
            notify(this, "E007");
            return aux;
            } 
        }

        return aux;
    }


  }
};
</script>

<style scoped>
.login-logo {
  margin: 0 auto;
  margin-bottom: 50px;
  max-height: 150px;

}

.interactive-bg {
  height: 100vh;
  background-color: #00d1b2;
  -webkit-box-shadow: inset 24px 4px 64px -24px rgba(71,71,71,1);
  -moz-box-shadow: inset 24px 4px 64px -24px rgba(71,71,71,1);
  box-shadow: inset 24px 4px 64px -24px rgba(71,71,71,1);
  padding: 0px;
}
@media (max-width: 769px) {
  .interactive-bg{
    display: none
  }
}

.button {
  margin-top: 20px;
  margin-bottom: 20px;
  min-width: 150px;
}



</style>




