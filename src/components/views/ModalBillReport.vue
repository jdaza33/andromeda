<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">Detalles de Factura</p>
    </header>

    <section class="modal-card-body">

        <p class="title is-6">Introduce la cantidad y el precio de cada actividad: </p>

        <div v-if="record.activities.length != 0">

            <b-collapse class="card" :open="false" v-for="(item, index) in record.activities" :key="index">
                <div slot="trigger" slot-scope="props" class="card-header">
                    <p class="card-header-title">
                        <b-tag type="is-warning" size="is-medium">Fecha: {{item.date.substring(0, 10)}}</b-tag>
                        
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            pack="fas"
                            :icon="props.open ? 'sort-down' : 'caret-up'">
                        </b-icon>
                    </a>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p><strong>Titulo: </strong> {{item.title}}</p>
                        <p><strong>Descripción: </strong>{{item.description}}</p>
                    </div>
                    <div class="columns">
                        <div class="column is-6">
                            <b-field label="Cantidad: ">
                                <b-input placeholder="Cantidad: "
                                    type="number"
                                    icon-pack="fas"
                                    icon="info-circle"
                                    maxlength="2"
                                    @change="changePrice"
                                    rounded
                                    v-model="bill.details[index].cant">
                                </b-input>
                            </b-field>
                        </div>
                        <div class="column is-6">
                            <b-field label="Precio Unitario: ">
                                <b-input placeholder="Precio Unitario: "
                                    type="number"
                                    icon-pack="fas"
                                    icon="info-circle"
                                    maxlength="2"
                                    rounded
                                    v-model="bill.details[index].unit_price">
                                </b-input>
                            </b-field>
                        </div>
                        <!--<div class="column is-4">
                            <b-field label="Total: ">
                                <b-input placeholder="Total: "
                                    type="number"
                                    icon-pack="fas"
                                    icon="info-circle"
                                    maxlength="2"
                                    rounded
                                    disabled
                                    v-model="bill.details[index].total">
                                </b-input>
                            </b-field>
                        </div>-->
                    </div>
                </div>
            </b-collapse>
        </div>

        <div v-else>
            <div class="content has-text-grey has-text-centered">
                <p>
                    <b-icon
                        pack="fas"
                        icon="frown-open"
                        size="is-large">
                    </b-icon>
                </p>
                <p>Nothing here.</p>
            </div>
        </div>
                

    </section>

    <footer class="modal-card-foot foot center">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">{{global.button.close}}</button>
        <button class="button is-primary is-rounded" @click.prevent="saveBill()">{{global.button.save}}</button>
    </footer>
    
    
</div>
</template>

<script>
import global from "@/config/global.js";
import axios from "@/config/axios.js";
import notify from "@/config/notify.js";

export default {
  data() {
    return {
        global: global.text,
        isHoursServ: '0',
        hours: 0,
        service: 'Servicio',
        activity: {
            date: '', 
            nro_activity: '', 
            title: '', 
            details: '', 
            description: '', 
            hours_service: ''
            },
        record: '',

        client: '',

        bill: {
            nro_report: '',
            id_client: '',
            details: [],
            sub_total: 0,
            iva: 0,
            total_amount: 0,
            ref: ''
        }
    };
  },

  props: ['nroSupport', 'nroReport', 'recordSelect'],

  methods: {

    generateNro() {
      let date = new Date();
      return date.getTime();
    },

    changePrice(){
        for (let i in this.bill.details){
            this.bill.details[i].total = this.bill.details[i].cant * this.bill.details[i].unit_price
            this.bill.sub_total = this.bill.sub_total + this.bill.details[i].total
        }

        this.bill.iva = this.bill.iva + (this.bill.sub_total*0.12)
        this.bill.total_amount = this.bill.iva + this.bill.sub_total


    },

    async refreshData(){

        await axios
        .get(`/record/nro/${this.nroSupport}`, {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(res => {
            if(res.data.res){
                this.record = res.data.record[0]

                for (let i in this.record.activities){
                    this.bill.details.push({
                        cant: 0,
                        description: this.record.activities[i].title,
                        unit_price: 0,
                        total: 0
                    })
                }

            }
        })
        .catch(err => {
            alert(err);
        })

        await this.$log.debug(this.record)
        await this.$log.debug(this.activities)
        await this.loadClient()
    },

    async loadClient(){

        await axios
        .get(`/support/nro/${this.nroSupport}`, {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(async res => {
            if (res.data.res) {
                this.client = res.data.support
            }
        })
        .catch(err => {
            alert(err);
        });

        
    },

    async saveBill() {

        this.bill.ref = this.$cookie.get('ref');
        this.bill.id_client = this.client
        this.bill.nro_report = this.nroReport
        this.changePrice();

        this.recordSelect.invoiced = 'S'

        await axios
        .put(`/report/changeinvoiced/${this.recordSelect._id}`, this.recordSelect, {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(async res => {
            if(res.data.res){

                this.$toast.open({
                    message: 'Reporte facturado',
                    type: 'is-success'
                })

                await axios
                .post('/bill', this.bill, {
                    headers: { Authorization: "bearer " + this.$cookie.get("token") }
                })
                .then(ress => {
                    if(ress.data.res){
                        this.$toast.open({
                            message: 'Factura creada',
                            type: 'is-success'
                        })
                        //this.refreshData();
                        this.$parent.close()
                    }
                })
                .catch (errr => {
                    alert(errr)
                })

            }
        })
        .catch(err => {
            alert(err);
        });

      
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
      
    },

    clear(){
        this.activity.date = '',
        this.activity.nro_activity = '',
        this.activity.title = '',
        this.activity.details = '',
        this.activity.description = '',
        this.activity.hours_service = '',
        this.hours = ''
    }


  },
  created() {
    this.refreshData();
  },
  watch: {
    $route: "refreshData"
  }
};
</script>

<style scoped>
.modal-card {
  width: 600px;
  height: 540px;
}
.modal-card-foot {
  height: 50px;
}

.section {
  width: 36em;
}

.createRecord{
    margin-left: 35px;
    margin-right: 35px;
}

.center{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>


