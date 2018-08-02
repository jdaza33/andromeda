<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">NIT: {{infoPersonal.nit}}</p>
    </header>

    <section class="modal-card-body">
        
        <b-tabs position="is-centered" class="block">
            
            <b-tab-item label="Datos Personales">

                <div class="columns">
                    <div class="column is-6">

                        <b-field>
                            <b-input :placeholder="global.input.name"
                                type="text"
                                icon-pack="fas"
                                icon="user-circle"
                                maxlength="20"
                                v-model="infoPersonal.name"
                                rounded>
                            </b-input>
                        </b-field>

                        <b-field>
                            <b-input placeholder="Apellido"
                                type="text"
                                icon-pack="fas"
                                icon="user-circle"
                                maxlength="20"
                                v-model="infoPersonal.lastname"
                                rounded>
                            </b-input>
                        </b-field>

                        <!--<b-field>
                            <b-input :placeholder="global.input.nit"
                                type="text"
                                icon-pack="fas"
                                icon="address-card"
                                maxlength="20"
                                v-model="infoPersonal.nit"
                                rounded
                                disabled>
                            </b-input>
                        </b-field>-->

                        <b-field>
                            <b-input :placeholder="global.input.email"
                                type="text"
                                icon-pack="fas"
                                icon="at"
                                maxlength="20"
                                v-model="infoPersonal.email"
                                rounded>
                            </b-input>
                        </b-field>

                        <b-field>
                            <b-input :placeholder="global.input.phone"
                                type="text"
                                icon-pack="fas"
                                icon="phone"
                                maxlength="20"
                                v-model="infoPersonal.phone"
                                rounded>
                            </b-input>
                        </b-field>

                    </div>

                    <div class="column is-6">
                        <div v-if="isProfile">
                            <figure class="image is-96x96">
                                <img :src="api + '/uploads/profile/' + infoPersonal.photo">
                            </figure>
                        </div>
                        <div v-else>
                            <figure class="image is-96x96">
                                <img src="img/profile_default.svg">
                            </figure>
                        </div>
                        <br>
                        <div class="file has-name is-small has-name is-boxed">
                            <label class="file-label">
                                <input class="file-input" type="file" name="profile" id="profile" ref="profile" v-on:change="handleFileUpload()">
                                <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose a file…
                                </span>
                                </span>
                                <span class="file-name">
                                {{profile.name}}
                                </span>
                            </label>
                        </div>
                    </div>

                </div>
                
            </b-tab-item>
            
            
            <b-tab-item label="Dirección">

                <b-field>
                    <b-input placeholder="País"
                        type="text"
                        icon-pack="fas"
                        icon="globe"
                        maxlength="20"
                        v-model="infoPersonal.address.country"
                        rounded>
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Estado"
                        type="text"
                        icon-pack="fas"
                        icon="location-arrow"
                        maxlength="20"
                        v-model="infoPersonal.address.state"
                        rounded>
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Localidad"
                        type="text"
                        icon-pack="fas"
                        icon="map-marker-alt"
                        maxlength="20"
                        v-model="infoPersonal.address.location"
                        rounded>
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Descripción"
                        type="text"
                        icon-pack="fas"
                        icon="compass"
                        maxlength="20"
                        v-model="infoPersonal.address.description"
                        rounded>
                    </b-input>
                </b-field>

            </b-tab-item>


            <b-tab-item label="Autenticación">

                <b-field>
                    <b-input placeholder="Username"
                        type="text"
                        icon-pack="fas"
                        icon="user-astronaut"
                        maxlength="20"
                        v-model="infoUser.username"
                        rounded>
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Referencia"
                        type="text"
                        icon-pack="fas"
                        icon="sync-alt"
                        maxlength="20"
                        v-model="infoUser.ref"
                        rounded
                        disabled>
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Role"
                        type="text"
                        icon-pack="fas"
                        icon="hand-paper"
                        maxlength="50"
                        v-model="infoUser.rol"
                        rounded
                        disabled>
                    </b-input>
                </b-field>

                <b-field>
                    <b-input placeholder="Contraseña"
                        type="password"
                        icon-pack="fas"
                        icon="key"
                        password-reveal
                        v-model="infoUser.password"
                        rounded
                        disabled>
                    </b-input>
                </b-field>

            </b-tab-item>
        </b-tabs>

    </section>

    <footer class="modal-card-foot foot">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary is-rounded" @click="saveData()">Guardar</button>
    </footer>
    
    
</div>
</template>

<script>

//TODO
/*
    Aun no guarda nada jajaja, pura vista
*/

import global from "@/config/global.js";
import axios from "@/config/axios.js";
import notify from "@/config/notify.js";
import FormData from "form-data";


    export default {
        data(){
            return {
                infoPersonal: '',
                infoUser: '',
                global: global.text,
                isProfile: false,
                profile: '',
                api: process.env.VUE_APP_API_URL
            }
        },
        props: ['userData', 'userInfoData'],

        methods: {
            loadData(){
                this.infoPersonal = this.userInfoData
                this.infoUser = this.userData
                if(this.userInfoData.photo != ''){
                    this.isProfile = true;
                }
                //this.infoUser.password = this.tempPassword
                //this.infoUser.password = ''
            },

            handleFileUpload(){
                this.profile = this.$refs.profile.files[0];
                //this.profile = Object.values(this.profile);
            },

            async uploadProfile() {
        
                let data = new FormData();
                data.append("profile", this.profile);

                let aux = '';

                await axios
                .post("/upprofile", data, {
                    headers: {
                    "Content-Type": "multipart/form-data"
                    }
                })
                .then(res => {
                    if (res.data.res) {
                        aux = res.data.profile.filename;
                    }
                })
                .catch(err => {
                    notify(this, "E009");
                    this.$log.debug(err);
                });
                return aux;
            },

            async saveData(){
                
                if(this.profile != ''){
                    let tempProfile = await this.uploadProfile();
                    this.infoPersonal.photo = tempProfile;
                }
                
                /*if(this.infoPersonal.password == ''){
                    this.infoPersonal.password = this.tempPassword
                }*/

                let operation = false;

                await axios
                .put(`/infopersonal/${this.infoPersonal._id}`, this.infoPersonal, {
                    headers: { Authorization: "bearer " + this.$cookie.get("token") }
                })
                .then(res => {
                    if(res.data.res){
                        operation = true;
                    }else{
                        operation = false;
                    }
                })
                .catch(err => {
                    alert(err)
                });

                await axios
                .put(`/user/${this.infoUser._id}`, this.infoUser, {
                    headers: { Authorization: "bearer " + this.$cookie.get("token") }
                })
                .then(res => {
                    if(res.data.res){
                        if(operation){
                            notify(this, 'S003')
                            this.$parent.close();
                            location.reload();
                        }
                    }else{
                        notify(this, 'E008')
                    }
                })
                .catch(err => {
                    alert(err)
                });


            }



        },

        created() {
            this.loadData();
        },
        watch: {
            $route: "loadData"
        }
    }
</script>

<style scoped> 
.modal-card{
    width: 500px;
    height: 500px;
}
.modal-card-foot{
    height: 50px;
}

</style>


