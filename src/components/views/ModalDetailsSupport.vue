<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">{{global.title.details}}</p>
    </header>

    <section class="modal-card-body">

        <b-field grouped group-multiline>
            <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">Nro.</b-tag>
                    <b-tag type="is-info" size="is-medium">{{data.nro}}</b-tag>
                </b-taglist>
            </div>

            <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">{{global.title.date}}</b-tag>
                    <b-tag type="is-primary" size="is-medium">{{ convertDate(data.createdAt.substring(0,10)) }}</b-tag>
                </b-taglist>
            </div>

            <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark" size="is-medium">{{global.title.status}}</b-tag>
                    <b-tag :type="
                                data.status == 'P' ? 'is-warning' : 
                                data.status == 'A' ? 'is-info' : 
                                data.status == 'R' ? 'is-danger' : 
                                data.status == 'F' ? 'is-success' : 'is-dark' " 
                            size="is-medium">
                        {{
                            data.status == 'P' ? 'Pendiente' : 
                            data.status == 'A' ? 'Apobado' : 
                            data.status == 'R' ? 'Rechazado por Técnico' : 
                            data.status == 'F' ? 'Finalizado' : 'Rechazado por Cliente'
                        }}
                    </b-tag>
                </b-taglist>
            </div>
        </b-field>
        
        <br>

        <div class="content">
            
            <h3>{{data.issue}}</h3>
            <hr>
            <p>{{data.description}}</p>
            <hr>
            <div v-show="isImg">
                <figure class="image is-4by3" v-for="(item, index) in images" :key="index">
                    <img :src="api + '/uploads/support/' + item">
                </figure>
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
//import axios from "@/config/axios.js";
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
        props: ['dataSupport', 'nroSupport'],

        methods: {

            loadDataSupport(){
                for (let i in this.dataSupport){
                    if(this.dataSupport[i].nro == this.nroSupport){
                        this.data = this.dataSupport[i]
                    }
                }

                if(this.data.images != ''){
                    let aux = this.data.images.split('');
                    let temp = false;
                    for (let i in aux){
                        if(aux[i] == '|'){
                            temp = true;
                        }
                    }
                    if(temp==false){
                        this.images.push(this.data.images);
                    }else{
                        this.images = this.data.images.split('|');
                    }
                    this.isImg = true;
                }
                
            },

            convertDate(date){
                let temp = date.split('-')
                return `${temp[2]}-${temp[1]}-${temp[0]}`
            }


        },

        created() {
            this.loadDataSupport();
        },
        watch: {
            $route: "loadDataSupport"
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

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>


