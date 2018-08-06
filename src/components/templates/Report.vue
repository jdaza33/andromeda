<template>
    <div>
        <div class="master" ref="pdf">
            <div class="carta">

                <p class="title is-3 center">Reporte de Soporte</p>
                
                <br>
                <div class="columns">
                    <div class="column is-6">
                        <strong class="title is-5 max">Cliente: </strong>
                        <p class="max">{{client.name + ' ' + client.lastname}}</p>
                    </div>

                    <div class="column is-6 end">
                        <strong class="title is-5 max">Fecha: </strong>
                        <p class="max">{{date()}}</p>
                    </div>
                </div>

                <br>
                <p class="title is-4 center">Detalles</p>

                <b-table
                    :data="isEmpty ? [] : data"
                    :bordered="isBordered"
                    :striped="isStriped"
                    :narrowed="isNarrowed"
                    :hoverable="isHoverable"
                    :loading="isLoading"
                    :focusable="isFocusable"
                    :mobile-cards="hasMobileCards">

                    <template slot-scope="props">
                        <b-table-column field="title" label="Titulo" centered>
                            {{ props.row.title }}
                        </b-table-column>

                        <b-table-column field="details" label="Detalles" centered>
                            {{ props.row.details }}
                        </b-table-column>

                        <b-table-column field="description" label="Descripción" centered>
                            {{ props.row.description }}
                        </b-table-column>

                        <b-table-column field="date" label="Fecha" centered>
                            <span class="tag is-dark">
                                {{props.row.date.substring(0,10)}}
                            </span>
                        </b-table-column>

                        <b-table-column field="hours_service" label="Hrs/Serv" centered>
                            {{ props.row.hours_service }}
                        </b-table-column>
                    </template>

                    <template slot="empty">
                        <section class="section">
                            <div class="content has-text-grey has-text-centered">
                                <p>
                                    <b-icon
                                        icon="emoticon-sad"
                                        size="is-large">
                                    </b-icon>
                                </p>
                                <p>Nothing here.</p>
                            </div>
                        </section>
                    </template>
                </b-table>
                

                <br>
                <br>

                <div class="columns">
                    <div class="column is-6">
                        <p> 
                            <strong class="title is-6">Cantidad de Horas Técnicas: {{hrs}}</strong> 
                        </p>
                    </div>

                    <div class="column is-6 end">
                        <p> 
                            <strong class="title is-6">Servicios Realizados: {{serv}}</strong> 
                        </p>
                    </div>
                </div>

            </div>
        </div>

        <!--<a class="button is-warning is-small" @click="showPdf()">
            <span class="icon is-small">
            <i class="fas fa-file-pdf"></i>
            </span>
        </a>-->
        <b-loading :is-full-page="isFullPage" :active.sync="isLoadingPage" :can-cancel="false"></b-loading>
    </div>
</template>

<script>

import jsPDF from 'jspdf';
import axios from "@/config/axios.js";
import { setTimeout } from 'timers';

export default {
    data() {
        return {
            data: [],
            
            isEmpty: false,
            isBordered: true,
            isStriped: true,
            isNarrowed: false,
            isHoverable: true,
            isFocusable: false,
            isLoading: false,
            hasMobileCards: true,

            output: '',

            isLoadingPage: true,

            hrs: '',
            serv: '',
            client: '',

            ready: false
        }

    },

    props: ['nro_support'],

    methods: {
        
        async showPdf(este){
            
            setTimeout(async function () {
                este.output = await este.$html2canvas(este.$refs.pdf, {type: 'dataURL'});

                let doc = new jsPDF();

                /*doc.fromHTML(await this.$html2canvas(this.$refs.pdf, {type: 'dataURL'}), 15, 15, {
                    'width': 120
                });*/

                doc.addImage(este.output, 'JPEG', 25, 15);
                doc.save('reporte.pdf');

                //doc.autoPrint();
                //window.open(doc.output('bloburl'), '_blank');
                
            }, 3000);

            //setTimeout(window.close(), 5000);
            
        },

        async loadData(){

            let details = this.$route.params.nro.split('|');
            let nro = details[0];
            this.hrs = details[1];
            this.serv = details[2];


            await axios
            .get(`/record/nro/${nro}`, {
                headers: { Authorization: "bearer " + this.$cookie.get("token") }
            })
            .then(res => {
                if (res.data.res) {
                    this.data = res.data.record[0].activities
                }
            })
            .catch(err => {
                alert(err);
                window.close();
            });


            await axios
            .get(`/support/nro/${nro}`, {
                headers: { Authorization: "bearer " + this.$cookie.get("token") }
            })
            .then(async res => {
                if (res.data.res) {
                    let temp_user = res.data.support

                    await axios
                    .get(`/user/${temp_user}`, {
                        headers: { Authorization: "bearer " + this.$cookie.get("token") }
                    })
                    .then(async ress => {
                        if(ress.data.res){

                            let temp_client = ress.data.user.id_infopersonal

                            await axios
                            .get(`/infopersonal/${temp_client}`, {
                                headers: { Authorization: "bearer " + this.$cookie.get("token") }
                            })
                            .then(async resss => {
                                if(resss.data.res){
                                    this.client = resss.data.infoPersonal
                                }
                            })
                            .catch(errr => {
                                alert(errr);
                                window.close();
                            })

                        }
                    })
                    .catch(errr => {
                        alert(errr);
                        window.close();
                    })
                }
            })
            .catch(err => {
                alert(err);
                window.close();
            });

            this.isLoadingPage = false
        },

        date(d = new Date){
            let month = String(d.getMonth() + 1);
            let day = String(d.getDate());
            const year = String(d.getFullYear());

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return `${day}/${month}/${year}`;
        }
    },

    created() {
        this.loadData();
    },
    watch: {
        $route: "loadData"
    },
    mounted: function () {
        this.$nextTick(function () {
            this.showPdf(this);
        })
    }
}
</script>

<style scoped>
.carta{
    width: 612px;
    height: 792px;
    /*border: solid 1px black;*/
    padding: 0px;
}

.center{
    text-align: center;
}

.end{
    text-align: end;
}

.max{
    font-size: 1.3em;
}


.master{
    /*display: flex;
    justify-content: center;
    align-items: center;*/
    margin: 0px;
}
</style>

