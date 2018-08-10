<template>
    <section>

        <breadcrub name="Gestión de Servicios" icon="wrench"/>

        <b-tabs type="is-boxed" position="is-centered" expanded>
            <b-tab-item label="Para todos" icon-pack="fas" icon="door-open">

                <p class="buttons" v-if="showTypeTable=='0'">
                    <a class="button is-success is-small is-rounded" @click="approve()"> 
                        <span>{{global.button.approve}}</span>
                        <span class="icon is-small">
                        <i class="fas fa-thumbs-up"></i>
                        </span>
                    </a>
                    <a class="button is-danger is-small is-rounded" @click="deny()">
                        <span>{{global.button.deny}}</span>
                        <span class="icon is-small">
                        <i class="fas fa-times"></i>
                        </span>
                    </a>
                    <a class="button is-info is-small is-rounded" @click="deselect()">
                        <span>{{global.button.deselect}}</span>
                        <span class="icon is-small">
                        <i class="fas fa-bolt"></i>
                        </span>
                    </a>
                </p>

                <b-table
                    :data="isEmpty ? [] : data"
                    :bordered="isBordered"
                    :striped="isStriped"
                    :narrowed="isNarrowed"
                    :hoverable="isHoverable"
                    :loading="isLoading"
                    :focusable="isFocusable"
                    :mobile-cards="hasMobileCards"

                    :selected.sync="selected"
                    
                    :paginated="isPaginated"
                    :per-page="perPage"
                    :current-page.sync="currentPage"
                    :pagination-simple="isPaginationSimple"
                    :default-sort-direction="defaultSortDirection">

                    <template slot-scope="props">

                        <b-table-column field="client" label="Cliente" centered sortable>
                            
                            <a class="button is-info is-small" @click="loadDetailsClient(props.row.id_client)">
                                <span class="icon is-small">
                                <i class="fas fa-user-astronaut"></i>
                                </span>
                            </a>
                        </b-table-column>

                        <b-table-column field="date" label="Creado" centered sortable>
                            <span class="tag is-primary">
                                {{ convertDate(props.row.createdAt.substring(0, 10)) }}
                            </span>
                        </b-table-column>

                        <b-table-column field="issue" label="Asunto" centered sortable>
                            {{ props.row.issue }}
                        </b-table-column>

                        <b-table-column field="assigned" label="Asignado" centered sortable>
                            
                            <a class="button is-success is-small" @click="loadDetailsClient(props.row.assigned)" v-if="props.row.assigned!=''">
                                <span class="icon is-small">
                                <i class="fas fa-user-astronaut"></i>
                                </span>
                            </a>
                            <div v-else>
                                <a class="button is-danger is-small">
                                    <span class="icon is-small">
                                        <i class="fas fa-times"></i>
                                    </span>
                                </a>
                            </div>
                            
                        </b-table-column>

                        <b-table-column field="status" label="Estado" centered sortable>
                            <b-tag 
                            :type="
                                props.row.status == 'P' ? 'is-warning' : 
                                props.row.status == 'A' ? 'is-info' : 
                                props.row.status == 'R' ? 'is-danger' : 
                                props.row.status == 'F' ? 'is-success' : 'is-dark' ">

                                {{ props.row.status == 'P' ? 'Pendiente' : 
                                props.row.status == 'A' ? 'Aprobado' : 
                                props.row.status == 'R' ? 'Rechazado por Técnico' :
                                props.row.status == 'F' ? 'Finalizado' :  'Rechazado por Cliente' }}
                                
                                </b-tag>
                        </b-table-column>

                        <b-table-column field="more" label="Detalles" centered sortable>
                            <a class="button is-info is-small" @click="loadDetailsSupport(props.row.nro)">
                                <span class="icon is-small">
                                <i class="fas fa-info"></i>
                                </span>
                            </a>
                        </b-table-column>

                    </template>

                    <template slot="empty">
                        <section class="section">
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
                        </section>
                    </template>
                </b-table>

            </b-tab-item>


            <b-tab-item label="Para mí" icon-pack="fas" icon="door-closed">

                <p class="buttons" v-if="showTypeTable=='0'">
                    <a class="button is-success is-small is-rounded" @click="finalize()"> 
                        <span>Finalizar</span>
                        <span class="icon is-small">
                        <i class="fas fa-plug"></i>
                        </span>
                    </a>
                    <a class="button is-info is-small is-rounded" @click="deselect()">
                        <span>{{global.button.deselect}}</span>
                        <span class="icon is-small">
                        <i class="fas fa-bolt"></i>
                        </span>
                    </a>
                </p>

                <b-table
                    :data="isEmpty ? [] : dataForMe"
                    :bordered="isBordered"
                    :striped="isStriped"
                    :narrowed="isNarrowed"
                    :hoverable="isHoverable"
                    :loading="isLoading"
                    :focusable="isFocusable"
                    :mobile-cards="hasMobileCards"

                    :selected.sync="selectedForMe"
                    
                    :paginated="isPaginated"
                    :per-page="perPageForMe"
                    :current-page.sync="currentPageForMe"
                    :pagination-simple="isPaginationSimple"
                    :default-sort-direction="defaultSortDirection">

                    <template slot-scope="props">

                        <b-table-column field="client" label="Cliente" centered sortable>
                            <a class="button is-info is-small" @click="loadDetailsClient(props.row.id_client)">
                                <span class="icon is-small">
                                <i class="fas fa-user-astronaut"></i>
                                </span>
                            </a>
                        </b-table-column>

                        <b-table-column field="date" label="Fecha" centered sortable>
                            <span class="tag is-primary">
                                {{ convertDate(props.row.createdAt.substring(0, 10)) }}
                            </span>
                        </b-table-column>

                        <b-table-column field="issue" label="Asunto" centered sortable>
                            {{ props.row.issue }}
                        </b-table-column>


                        <b-table-column field="status" label="Estado" centered sortable>
                            <b-tag 
                            :type="
                                props.row.status == 'P' ? 'is-warning' : 
                                props.row.status == 'A' ? 'is-info' : 
                                props.row.status == 'R' ? 'is-danger' : 
                                props.row.status == 'F' ? 'is-success' : 'is-dark' ">

                                {{ props.row.status == 'P' ? 'Pendiente' : 
                                props.row.status == 'A' ? 'Aprobado' : 
                                props.row.status == 'R' ? 'Rechazado por Técnico' :
                                props.row.status == 'F' ? 'Finalizado' :  'Rechazado por Cliente' }}
                                
                                </b-tag>
                        </b-table-column>

                        <b-table-column field="more" label="Detalles" centered sortable>
                            <a class="button is-info is-small" @click="loadDetailsSupport(props.row.nro)">
                                <span class="icon is-small">
                                <i class="fas fa-info"></i>
                                </span>
                            </a>
                        </b-table-column>

                        <b-table-column field="record" label="Historial" centered sortable>
                            <a v-if="props.row.status != 'F'" class="button is-success is-small" @click="showRecordSupportAdmin(props.row.nro)">
                                <span class="icon is-small">
                                <i class="fas fa-headset"></i>
                                </span>
                            </a>
                            <a v-else class="button is-black is-small">
                                <span class="icon is-small">
                                <i class="fas fa-headset"></i>
                                </span>
                            </a>
                        </b-table-column>

                    </template>

                    <template slot="empty">
                        <section class="section">
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
                        </section>
                    </template>
                </b-table>

            </b-tab-item>


        </b-tabs>
        

        <!--Modals-->
        <b-modal :active.sync="isComponentModalDetailsSupportActive" has-modal-card :width="960">
            <modal-details-support :dataSupport="data" :nroSupport="nroSupport"></modal-details-support>
        </b-modal>

        <b-modal :active.sync="isComponentModalDetailsClientActive" has-modal-card :width="960">
            <modal-details-client :idClient="idClient"></modal-details-client>
        </b-modal>

        <b-modal :active.sync="isComponentModalAssignSupportActive" has-modal-card :width="960">
            <modal-assign-support @hijo:change="listenSon" :support="selected"></modal-assign-support>
        </b-modal>

        <b-modal :active.sync="isComponentModalRecordSupportActive" has-modal-card :width="960">
            <modal-record-support-admin :nroSupport="nroSupport" @hijo:change="listenSon"></modal-record-support-admin>
        </b-modal>
        <!--End Modals-->


    </section>
</template>

<script>
import global from "@/config/global.js";
import axios from "@/config/axios.js";
//import BusEvent from "@/bus.js"

//Components
import ModalDetailsSupport from "@/components/views/ModalDetailsSupport.vue";
import ModalDetailsClient from "@/components/views/ModalDetailsClient.vue";
import ModalAssignSupport from "@/components/views/ModalAssignSupport.vue";
import ModalRecordSupportAdmin from "@/components/views/ModalRecordSupportAdmin.vue";

//Templates
import Breadcrub from "@/components/templates/Breadcrub.vue";

export default {
  data() {
    return {
        isComponentModalDetailsSupportActive: false,
        isComponentModalDetailsClientActive: false,
        isComponentModalAssignSupportActive: false,
        isComponentModalRecordSupportActive: false,
        idClient: '',
        nroSupport: '',
        clients: [],

        global: global.text,

        data: [],

        isEmpty: false,
        isBordered: false,
        isStriped: true,
        isNarrowed: true,
        isHoverable: true,
        isFocusable: false,
        isLoading: false,
        hasMobileCards: true,

        selected: "",

        isPaginated: true,
        isPaginationSimple: false,
        defaultSortDirection: "asc",
        currentPage: 1,
        perPage: 7,

        showTypeTable: '0',

        dataForMe: [],
        selectedForMe: '',
        perPageForMe: 4,
        currentPageForMe: 1

    };
  },

  components: {
    ModalDetailsSupport,
    ModalDetailsClient,
    ModalAssignSupport,
    ModalRecordSupportAdmin,
    Breadcrub
  },

  methods: {
    listenSon() {
      this.refreshData();
    },

    deselect(){
        this.selected = ''
        this.selectedForMe = ''
    },

    async refreshData() {
      await axios
        .get(`/support/all`, {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          if (res.data.res) {
            this.data = res.data.support;
            this.dataForMe = []
            for (let i in this.data){
                if(this.data[i].assigned == this.$cookie.get('userId')){
                    this.dataForMe.push(this.data[i])
                }
            }
          }
        })
        .catch(err => {
          alert(err);
        });

        //await this.loadClients();
    },

    convertStatus(status){
        let aux = ''
        if(status=='P'){
            aux = {
                name: 'Pendiente',
                tag: 'is-warning'
            }
        }
        if(status=='A'){
            aux = {
                name: 'Aprobado',
                tag: 'is-info'
            }
        }
        if(status=='R'){
            aux = {
                name: 'Rechazado',
                tag: 'is-danger'
            }
        }
        if(status=='C'){
            aux = {
                name: 'Cancelado',
                tag: 'is-dark'
            }
        }
        if(status=='F'){
            aux = {
                name: 'Finalizado',
                tag: 'is-success'
            }
        }
        return aux
    },

    loadDetailsSupport(nro){
        this.nroSupport = nro;
        this.isComponentModalDetailsSupportActive = true;
    },

    showAssignSupport(){
        this.isComponentModalAssignSupportActive = true;
    },

    showRecordSupportAdmin(nroSupport){
        this.nroSupport = nroSupport;
        this.isComponentModalRecordSupportActive = true
    },

    async loadClients(){
        for (let i in this.data){
            await axios
            .get(`/infopersonal/${this.data[i].id_client}`, {
                headers: { Authorization: "bearer " + this.$cookie.get("token") }
            })
            .then(res => {
                if(res.data.res){
                    this.clients.push(res.data.infoPersonal)
                }
            })
            .catch(err => {
                alert(err);
            })
        }
    },

    loadDetailsClient(idClient){
        this.idClient = idClient;
        this.isComponentModalDetailsClientActive = true;
    },

    deny(){

        //TODO 
        /*
        Quitar el codigo duro que tengo aqui jeje
        */
        if(this.selected==''){
            this.$toast.open({
                message: 'Seleccione una fila',
                type: 'is-warning'
            })
        }else{
            if(this.selected.status == 'C'){
                this.$toast.open({
                    message: 'La solicitud fue cancelada por el cliente',
                    type: 'is-warning'
                })
            }else if (this.selected.status == 'R'){
                this.$toast.open({
                    message: 'La solicitud ya fue rechazada',
                    type: 'is-warning'
                })
            }else if (this.selected.status == 'F'){
                this.$toast.open({
                    message: 'La solicitud ya fue finalizada',
                    type: 'is-warning'
                })
            }else{
                this.$dialog.confirm({
                    title: 'Rechazar Solicitud',
                    message: `¿Estás seguro de rechazar la solicitud de soporte nro. #${this.selected.nro}?`,
                    confirmText: 'Rechazar',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times',
                    iconPack: 'fas',
                    onConfirm: async () => {
                        this.selected.status = 'R'
                        await axios
                        .put(`/support/changestatus/${this.selected._id}`, this.selected, {
                            headers: { Authorization: "bearer " + this.$cookie.get("token") }
                        })
                        .then(res => {
                            if(res.data.res){
                                this.$toast.open({
                                    message: 'Solicitud Rechazada',
                                    type: 'is-success'
                                })
                            }
                        })
                        .catch(err => {
                            alert(err)
                        })

                        await this.refreshData();
                    }
                })
            }
            
        }
        
    },


    approve(){

        //TODO 
        /*
        Quitar el codigo duro que tengo aqui jeje
        */
        if(this.selected==''){
            this.$toast.open({
                message: 'Seleccione una fila',
                type: 'is-warning'
            })
        }else{
            if(this.selected.status == 'C'){
                this.$toast.open({
                    message: 'La solicitud fue cancelada por el cliente',
                    type: 'is-warning'
                })
            }else if (this.selected.status == 'A'){
                this.$toast.open({
                    message: 'La solicitud ya fue aprobada',
                    type: 'is-warning'
                })
            }else if (this.selected.status == 'F'){
                this.$toast.open({
                    message: 'La solicitud ya fue finalizada',
                    type: 'is-warning'
                })
            }else{

                //let temp = BusEvent.$emit('getInfopersonal', 'hola');
                
                this.$dialog.confirm({
                    title: 'Aprobar Solicitud',
                    message: `¿Estás seguro de aprobar la solicitud de soporte nro. #${this.selected.nro}?`,
                    confirmText: 'Aprobar',
                    type: 'is-success',
                    hasIcon: true,
                    icon: 'thumbs-up',
                    iconPack: 'fas',
                    onConfirm: async () => {
                        this.showAssignSupport();
                       

                        //await this.refreshData();
                    }
                })
            }
            
        }
        
    },

    finalize(){

        //TODO 
        /*
        Quitar el codigo duro que tengo aqui jeje
        */
        if(this.selectedForMe==''){
            this.$toast.open({
                message: 'Seleccione una fila',
                type: 'is-warning'
            })
        }else{
            if(this.selectedForMe.status == 'C'){
                this.$toast.open({
                    message: 'La solicitud fue cancelada por el cliente',
                    type: 'is-warning'
                })
            }else if (this.selectedForMe.status == 'F'){
                this.$toast.open({
                    message: 'La solicitud ya fue finalizada',
                    type: 'is-warning'
                })
            }else if (this.selectedForMe.status == 'R'){
                this.$toast.open({
                    message: 'La solicitud ya fue rechazada',
                    type: 'is-warning'
                })
            }else{
                
                this.$dialog.confirm({
                    title: 'Finalizar Soporte',
                    message: `¿Estás seguro de finalizar el soporte nro. #${this.selectedForMe.nro}?`,
                    confirmText: 'Finalizar',
                    type: 'is-success',
                    hasIcon: true,
                    icon: 'plug',
                    iconPack: 'fas',
                    onConfirm: async () => {
                        this.selectedForMe.status = 'F'
                        await axios
                        .put(`/support/changestatus/${this.selectedForMe._id}`, this.selectedForMe, {
                            headers: { Authorization: "bearer " + this.$cookie.get("token") }
                        })
                        .then(res => {
                            if(res.data.res){
                                this.$toast.open({
                                    message: 'Soporte Finalizado',
                                    type: 'is-success'
                                })
                            }
                        })
                        .catch(err => {
                            alert(err)
                        });

                        let total_hours = 0
                        let total_service = 0

                        await axios
                        .get(`/record/hourserv/${this.selectedForMe.nro}`, {
                            headers: { Authorization: "bearer " + this.$cookie.get("token") }
                        })
                        .then(res => {
                            if(res.data.res){
                                total_hours = res.data.total_hours
                                total_service = res.data.total_service
                            }
                        })
                        .catch(err => {
                            alert(err)
                        })

                        await axios
                        .post('/report', 
                        {
                            nro: this.generateNro(),
                            nro_support: this.selectedForMe.nro,
                            total_hours: total_hours.toString(),
                            total_service: total_service.toString(),
                            invoiced: 'N',
                            ref: this.$cookie.get('ref')
                        }, 
                        {
                            headers: { Authorization: "bearer " + this.$cookie.get("token") }
                        })
                        .then(res => {
                            if(res.data.res){
                                this.$toast.open({
                                    message: 'Reporte Creado',
                                    type: 'is-success'
                                })
                            }
                        })
                        .catch(err => {
                            alert(err)
                        })

                        await this.refreshData();
                    }
                })
            }
            
        }
        
    },

    generateNro() {
      let date = new Date();
      return date.getTime();
    },

    convertDate(date){
        let temp = date.split('-')
        return `${temp[2]}-${temp[1]}-${temp[0]}`
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

.dialog .modal-card {
    max-height: 200px;
}

</style>

