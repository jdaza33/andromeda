<template>
    <div>
        <section class="hero is-primary is-fullheight">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-4 is-offset-4">
                        <h3 class="title is-2 has-text-white">Root</h3>
                        <div class="box">
                            <b-field>
                            <b-input :placeholder="global.input.name"
                                    type="text"
                                    icon-pack="fas"
                                    icon="user-circle"
                                    maxlength="20"
                                    v-model="register.name"
                                    @keyup.enter.native="newRoot()"
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
                                    @keyup.enter.native="newRoot()"
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
                                    @keyup.enter.native="newRoot()"
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
                                    @keyup.enter.native="newRoot()"
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
                                    @keyup.enter.native="newRoot()"
                                    rounded>
                                </b-input>
                            </b-field>


                            <div class="has-text-centered">
                                <a @click="newRoot()" class="button is-vcentered is-primary is-outlined is-rounded">{{global.button.save}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from "../../config/axios.js";
import global from "../../config/global.js";
import notify from "../../config/notify.js";
    export default {
        data(){
            return{
                register: { name: "", nit: "", email: "", username: "", password: "" , type_user: "0"},
                global: global.text
            }
        },

        methods:{
            newRoot(){
                if (this.validateInput(this.register)) {
                    axios
                    .post(`/others/newroot`, this.register)
                    .then(res => {
                        this.$log.debug(res.data);
                        if (res.data.res) {
                        notify(this, res.data.cod);
                        //this.clearRegister();
                        } else {
                        notify(this, res.data.err);
                        }
                    })
                    .catch(err => {
                        this.$log.debug("hola megan");
                        alert(err);
                    });
                }
            },
            validateInput(array) {
                let aux = false;

                for (let i in array) {
                    if (array[i] == "") {
                    aux = false;
                    } else {
                    aux = true;
                    }
                }

                if (!aux) {
                    notify(this, "E007");
                }

                return aux;
            }
        }
    }
</script>


