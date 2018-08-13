<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">{{global.title.recordSupport}}</p>
    </header>

    <section class="modal-card-body">
        
        <b-tabs position="is-centered" class="block" type="is-boxed">
            
            <b-tab-item label="Crear">

                <div class="createRecord">
                    <p class="title is-5 has-text-centered">Crear nueva actividad: </p>

                    <b-field group-multiline>
                        <b-field>
                            <b-datepicker
                                placeholder="Fecha"
                                icon="calendar-alt"
                                icon-pack="fas"
                                rounded
                                v-model="activity.date">
                            </b-datepicker>
                        </b-field>

                        <b-field>
                            <b-input placeholder="Titulo"
                                type="text"
                                icon-pack="fas"
                                icon="space-shuttle"
                                maxlength="20"
                                rounded
                                v-model="activity.title">
                            </b-input>
                        </b-field>
                    </b-field>

                    <b-field group-multiline>
                        <b-field>
                            <b-input placeholder="Nro. de Serie"
                                type="text"
                                icon-pack="fas"
                                icon="fingerprint"
                                minlength="10"
                                maxlength="30"
                                rounded
                                v-model="activity.nro_serie">
                            </b-input>
                        </b-field>
                        <b-field>
                            <b-input placeholder="Marca"
                                type="text"
                                icon-pack="fas"
                                icon="desktop"
                                maxlength="20"
                                rounded
                                v-model="activity.make">
                            </b-input>
                        </b-field>
                        <b-field>
                            <b-input placeholder="Modelo"
                                type="text"
                                icon-pack="fas"
                                icon="server"
                                maxlength="20"
                                rounded
                                v-model="activity.model">
                            </b-input>
                        </b-field>
                    </b-field>

                    <!--<b-field>
                        <b-input :placeholder="global.title.details"
                            type="text"
                            icon-pack="fas"
                            icon="info-circle"
                            maxlength="20"
                            rounded
                            v-model="activity.details">
                        </b-input>
                    </b-field>-->

                    <b-field>
                        <b-input :placeholder="global.input.description"
                            type="textarea"
                            minlength="20"
                            maxlength="100"
                            rounded
                            v-model="activity.description">
                        </b-input>
                    </b-field>

                    <div class="block center">
                        <b-radio v-model="isHoursServ"
                            native-value="0">
                            Horas
                        </b-radio>
                        <b-radio v-model="isHoursServ"
                            native-value="1">
                            Servicio
                        </b-radio>
                    </div>

                    <div v-if="isHoursServ == '0'">
                        <b-field>
                            <b-input placeholder="Horas"
                                type="number"
                                icon-pack="fas"
                                icon="hourglass-start"
                                maxlength="2"
                                rounded
                                v-model="hours">
                            </b-input>
                        </b-field>

                    </div>

                    <div v-else>
                        <b-field>
                            <b-input placeholder="Servicio"
                                type="text"
                                icon-pack="fas"
                                icon="concierge-bell"
                                :value="service"
                                rounded
                                disabled
                                v-model="service">
                            </b-input>
                        </b-field>

                    </div>
                    <br>
                    <b-field>
                        <p class="control has-text-centered">
                            <button class="button is-primary" @click="saveActivity()">
                            Guardar
                            </button>
                        </p>
                    </b-field>

                </div>

                
                
            </b-tab-item>

            <b-tab-item label="Visualizar">

                <div v-if="record.activities.length != 0">
                    <b-collapse class="card" :open="false" v-for="(item, index) in record.activities" :key="index">
                        <div slot="trigger" slot-scope="props" class="card-header">
                            <p class="card-header-title">
                                Fecha: {{item.date.substring(0, 10)}}
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
                                <strong>Titulo: </strong>
                                <p>{{item.title}}</p>
                                <strong>Detalles: </strong>
                                <p>Nro. de Serie: {{item.nro_serie}} | Marca: {{item.make}} | Modelo: {{item.model}}</p>
                                <strong>Descripción: </strong>
                                <p>{{item.description}}</p>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a class="card-footer-item">
                                <b-taglist attached>
                                    <b-tag type="is-dark">Nro.</b-tag>
                                    <b-tag type="is-info">{{item.nro_activity}}</b-tag>
                                </b-taglist>
                            </a>
                            <a class="card-footer-item">
                                <b-taglist attached>
                                    <b-tag type="is-dark">Hrs/Serv</b-tag>
                                    <b-tag type="is-info">{{item.hours_service}}</b-tag>
                                </b-taglist>
                            </a>
                        </footer>
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
                
            </b-tab-item>

        </b-tabs>

    </section>

    <footer class="modal-card-foot foot center">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">{{global.button.close}}</button>
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
            nro_serie: '', 
            model: '', 
            make: '', 
            description: '', 
            hours_service: ''
            },
        record: '',
        date: new Date()
    };
  },

  props: ['nroSupport'],

  methods: {

    generateNro() {
      let date = new Date();
      return date.getTime();
    },

    async refreshData(){

        await axios
        .get(`/record/nro/${this.nroSupport}`, {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(res => {
            if(res.data.res){
                this.record = res.data.record[0]
            }
        })
        .catch(err => {
            alert(err);
        })

        await this.$log.debug(this.record)
        await this.$log.debug(this.activities)
    },

    async saveActivity() {

        this.activity.nro_activity = this.generateNro()
        
        if(this.isHoursServ == '0'){
            this.activity.hours_service = this.hours.toString()
        }else{
            this.activity.hours_service = this.service
        }
        this.record.activities.push(this.activity)

        await axios
        .put(`/record/${this.record._id}`, this.record, {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(res => {
            if(res.data.res){
                this.$toast.open({
                    message: 'Actividad Registrada',
                    type: 'is-success'
                });
                this.clear()
                this.refreshData()
            }
        })
        .catch(err => {
            alert(err)
        })

      
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
        //this.activity.details = '',
        this.activity.nro_Serie = '',
        this.activity.model = '',
        this.activity.make = '',
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


