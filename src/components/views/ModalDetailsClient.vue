<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">{{global.title.details}} del Cliente</p>
    </header>

    <section class="modal-card-body">

        <figure class="image is-96x96">
            <img :src="data.photo == '' ? 'img/profile_default.svg' : 'img/profile/' + data.photo">
        </figure>
        <br>
        <b-field grouped group-multiline>
            <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">Nit</b-tag>
                    <b-tag type="is-info" size="is-medium">{{data.nit}}</b-tag>
                </b-taglist>
            </div>

            <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">Nombre</b-tag>
                    <b-tag type="is-primary" size="is-medium">{{data.name}} {{data.lastname}}</b-tag>
                </b-taglist>
            </div>
        </b-field>

        <b-field grouped group-multiline>
            <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">Email</b-tag>
                    <b-tag type="is-success" size="is-medium">{{data.email}}</b-tag>
                </b-taglist>
            </div>

            <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">Telf.</b-tag>
                    <b-tag type="is-warning" size="is-medium">{{data.phone}}</b-tag>
                </b-taglist>
            </div>
        </b-field>
        
        <br>

        <div class="content">
            
            <h3>Dirección</h3>
            <p><strong>País: </strong>{{data.address.country}}</p>
            <p><strong>Estado: </strong>{{data.address.state}}</p>
            <p><strong>Localidad: </strong>{{data.address.location}}</p>
            <p><strong>Descripción: </strong>{{data.address.description}}</p>
            
        </div>


        
        
        

        

    </section>

    <footer class="modal-card-foot foot">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">{{global.button.close}}</button>
    </footer>
    
    
</div>
</template>

<script>

import global from "@/config/global.js";
import axios from "@/config/axios.js";
//import notify from "@/config/notify.js";

    export default {
        data(){
            return {
                global: global.text,
                images_support: [],
                data: '',
                images: [],
                isImg: false
                
            }
        },
        props: ['idClient'],

        methods: {

            async loadDataClient(){

                await axios
                .get(`/user/${this.idClient}`, {
                    headers: { Authorization: "bearer " + this.$cookie.get("token") }
                })
                .then(async res => {
                    if(res.data.res){
                        let idInfoPersonal = res.data.user.id_infopersonal
                        
                        await axios
                        .get(`/infopersonal/${idInfoPersonal}`, {
                            headers: { Authorization: "bearer " + this.$cookie.get("token") }
                        })
                        .then(resp => {
                            this.data = resp.data.infoPersonal
                        })
                        .catch(err => {
                            alert(err)
                        })
                    }
                })
                .catch(err => {
                    alert(err)
                })
                
            }


        },

        created() {
            this.loadDataClient();
        },
        watch: {
            $route: "loadDataClient"
        }
    }
</script>

<style scoped>
.modal-card{
    width: 645px;
    height: 460px;
}
.modal-card-foot{
    height: 50px;
}

.section{
    width: 36em;
}

</style>


