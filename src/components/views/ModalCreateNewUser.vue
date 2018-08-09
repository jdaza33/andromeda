<template>
<div class="modal-card container">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">{{global.title.newuser}}</p>
    </header>

    <section class="modal-card-body">
        <p class="title is-6">{{global.input.name + ": "}}</p>
        <b-field>
          <b-input :placeholder="global.input.name"
                type="text"
                icon-pack="fas"
                icon="user-circle"
                maxlength="20"
                v-model="register.name"
                rounded>
            </b-input>
        </b-field>
        <p class="title is-6">{{global.input.nit + ": "}}</p>
        <b-field>
          <b-input :placeholder="global.input.nit"
                type="text"
                icon-pack="fas"
                icon="address-card"
                maxlength="20"
                v-model="register.nit"
                rounded>
            </b-input>
        </b-field>
        <p class="title is-6">{{global.input.email + ": "}}</p>
        <b-field>
          <b-input :placeholder="global.input.email"
                type="email"
                icon-pack="fas"
                icon="at"
                maxlength="50"
                v-model="register.email"
                rounded>
            </b-input>
        </b-field>
        <p class="title is-6">{{global.input.username + ": "}}</p>
        <b-field>
          <b-input :placeholder="global.input.username"
                type="text"
                icon-pack="fas"
                icon="user"
                maxlength="12"
                v-model="register.username"
                rounded>
            </b-input>
        </b-field>
        <p class="title is-6">{{global.input.password + ": "}}</p>
        <b-field>
          <b-input :placeholder="global.input.password"
                type="password"
                icon-pack="fas"
                icon="key"
                password-reveal
                v-model="register.password"
                rounded>
            </b-input>
        </b-field>

    </section>

    <footer class="modal-card-foot foot center">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">{{global.button.close}}</button>
        <button class="button is-primary is-rounded" @click.prevent="newUser()">{{global.button.save}}</button>
    </footer>
    
    
</div>
</template>

<script>
import global from "@/config/global.js";
import axios from "@/config/axios.js";
import notify from "@/config/notify.js";

//TODO
/*
    Arreglar que se pueda guardar por roles 
*/

export default {
  data() {
    return {
      global: global.text,
      register: { name: "", nit: "", email: "", username: "", password: "", 
      type_user: this.$cookie.get('type_user'), 
      ref: this.$cookie.get('ref') }
    };
  },

  methods: {

    async newUser() {
        this.$log.debug(this.validateInput(this.register))
        if (this.validateInput(this.register)) {
            await axios
            .post('/others/newuserforauth',this.register,
            { 
                headers: 
                { 
                    Authorization: "bearer " + this.$cookie.get("token") 
                    }
                }
            )
            .then(res => {
                this.$log.debug(res.data);
                if (res.data.res) {
                notify(this, 'S001');
                this.$emit('hijo:change') //Envio el mensaje al componente padre para que actualice la tabla
                this.$parent.close() //Cierro el modal
                } else {
                notify(this, res.data.err);
                }
            })
            .catch(err => {
                alert(err);
            })
        }
      
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
.modal-card {
  width: 450px;
  height: 560px;
}
.modal-card-foot {
  height: 50px;
}

.section {
  width: 36em;
}

.container{
    margin: 50px;
}
.center{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>


