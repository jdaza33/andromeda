<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">{{global.title.details}} del Cliente</p>
    </header>

    <section class="modal-card-body">

        <div class="center">
            <figure class="image is-96x96">
                <img :src="data.photo == '' ? 'img/profile_default.svg' : api + '/uploads/profile/' + data.photo" class="photo">
            </figure>   
        </div>
        <p class="title is-4 has-text-centered">{{data.name}} {{data.lastname}}</p>

        
            <div class="control center space">
                <b-taglist attached>
                    <b-tag type="is-dark" size="is-small">NIT</b-tag>
                    <b-tag type="is-info" size="is-small"><strong>{{data.nit}}</strong></b-tag>
                </b-taglist>
            </div>

            <div class="control center space">
                <b-taglist attached>
                    <b-tag type="is-dark" size="is-small">Email</b-tag>
                    <b-tag type="is-success" size="is-small"> <strong>{{data.email}}</strong> </b-tag>
                </b-taglist>
            </div>

            <div class="control center space">
                <b-taglist attached>
                    <b-tag type="is-dark" size="is-small">Telf.</b-tag>
                    <b-tag type="is-warning" size="is-small"><strong>{{data.phone}}</strong></b-tag>
                </b-taglist>
            </div>

        

        <div class="content">

            <p class="title is-5 has-text-centered">Dirección: </p>

            <p class="has-text-centered">
                <strong>País: </strong>
                {{data.address.country}} |
                <strong> Estado: </strong> 
                {{data.address.state}}
            </p>

            <p class="has-text-centered">
                <strong>Localidad: </strong>
                {{data.address.location}} |
                <strong> Descripción: </strong> 
                {{data.address.description}}
            </p>

            <div >

            </div>

        </div>

    </section>

    <footer class="modal-card-foot foot center">
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
                isImg: false,
                api: process.env.VUE_APP_API_URL
                
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
    width: 500px;
    height: 530px;
}
.modal-card-foot{
    height: 50px;
}

.section{
    width: 36em;
}

.center{
    display: flex;
    justify-content: center;
    align-items: center;
}

.photo {
  width: 100%;
  border-radius: 50px;
  margin: auto;
  display: block;
}

.space{
    margin-bottom: 10px;
}

</style>


