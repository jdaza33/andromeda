<template>
    <div>
        <br>
        <div class="center">
            <button class="button is-outlined is-rounded is-primary" type="button" @click="showPdf()">Imprimir</button>
        </div>
        <div class="master">
            <div class="carta" ref="pdf">
                <p class="title is-3 center">Factura</p>

                <div class="">
                    <p class="max">
                        <strong class="title is-5 max">Fecha: </strong>
                        {{date()}}
                    </p>
                </div>
                <br>
                <div class="columns">
                    <div class="column is-6">
                        <strong class="title is-5 max">Cliente: </strong>
                        <p class="max">{{client.name + ' ' + client.lastname}}</p>
                        <strong class="title is-5 max">Dirección: </strong>
                        <p class="max">{{client.address.country + ', ' + client.address.state + ', ' + client.address.location + ', ' + client.address.description}}</p>
                    </div>

                    <div class="column is-6">
                        <strong class="title is-5 max">RIF/C.I: </strong>
                        <p class="max">{{client.nit}}</p>
                        <strong class="title is-5 max">Telf: </strong>
                        <p class="max">{{client.phone}}</p>
                    </div>
                </div>

                <br>
                <!--<p class="title is-4 center">Detalles</p>-->

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
                        <b-table-column field="cant" label="Cant." centered>
                            {{ props.row.cant }}
                        </b-table-column>

                        <b-table-column field="description" label="Descripción" centered>
                            {{ props.row.description }}
                        </b-table-column>

                        <b-table-column field="unit_price" label="Monto Unitario" centered>
                            {{ props.row.unit_price }}
                        </b-table-column>

                        <b-table-column field="total" label="Monto Total" centered>
                            {{ props.row.total }}
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

                <p class="end"> 
                    <strong class="title is-6">Sub-Total: {{bill.sub_total}} </strong> 
                </p>
                <p class="end"> 
                    <strong class="title is-6">IVA: {{bill.iva}} </strong> 
                </p>
                <p class="end"> 
                    <strong class="title is-6">Total: {{bill.total_amount}} </strong> 
                </p>

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
//import { setTimeout } from 'timers';

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
            bill: '',

            ready: false
        }

    },

    props: ['nro_support'],

    methods: {
        
        async showPdf(){
            
            //setTimeout(async function () {
                this.output = await this.$html2canvas(this.$refs.pdf, {type: 'dataURL'});

                let doc = new jsPDF();

                /*doc.fromHTML(await this.$html2canvas(this.$refs.pdf, {type: 'dataURL'}), 15, 15, {
                    'width': 120
                });*/

                doc.addImage(this.output, 'JPEG', 25, 15);
                doc.save('reporte.pdf');

                //doc.autoPrint();
                //window.open(doc.output('bloburl'), '_blank');
                
            //}, 3000);

            //setTimeout(window.close(), 5000);
            
        },

        async loadData(){

            let nro_bill = this.$route.params.nro;


            await axios
            .get(`/bill/nro/${nro_bill}`, {
                headers: { Authorization: "bearer " + this.$cookie.get("token") }
            })
            .then(res => {
                if (res.data.res) {
                    this.data = res.data.bill[0].details
                    this.bill = res.data.bill[0]
                }
            })
            .catch(err => {
                alert(err);
                window.close();
            });


            await axios
            .get(`/user/${this.bill.id_client}`, {
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
            //this.showPdf(this);
        })
    }
}
</script>

<style scoped>
.carta{
    width: 612px;
    height: auto;
    border: solid 1px black;
    padding: 10px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0px 0px 0px;
}

.center{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

