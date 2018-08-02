<template>
    <section>
        <b-field grouped group-multiline>
            <h2 class="title is-3">{{global.title.support}}</h2>
            
        </b-field>

        <br>
        <p class="buttons">
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
        <!--End Modals-->

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
                <!--<b-table-column field="nro" label="Nro" width="40" centered numeric sortable>
                    {{ props.row.nro }}
                </b-table-column>-->

                <b-table-column field="client" label="Cliente" centered sortable>
                    <!--{{ clients._id == props.row.id_client ? clients.name : 'n/a' }}-->
                    
                    <a class="button is-info is-small" @click="loadDetailsClient(props.row.id_client)">
                        <span class="icon is-small">
                        <i class="fas fa-user-astronaut"></i>
                        </span>
                    </a>
                </b-table-column>

                <b-table-column field="date" label="Fecha" centered sortable>
                    <span class="tag is-primary">
                        {{ props.row.createdAt.substring(0, 10) }}
                    </span>
                </b-table-column>

                <b-table-column field="issue" label="Asunto" centered sortable>
                    {{ props.row.issue }}
                </b-table-column>

                <!--<b-table-column field="description" label="Descripción" centered sortable>
                    {{ props.row.description }}
                </b-table-column>-->

                <!--<b-table-column field="image" label="Imagenes" centered sortable>
                    {{ props.row.images }}
                </b-table-column>-->

                <b-table-column field="assigned" label="Asignado" centered sortable>
                    <!--{{ clients._id == props.row.id_client ? clients.name : 'n/a' }}-->
                    
                    <a class="button is-success is-small" @click="loadDetailsClient(props.row.assigned)" v-if="props.row.assigned!=''">
                        <span class="icon is-small">
                        <i class="fas fa-user-astronaut"></i>
                        </span>
                    </a>
                    <div v-else>
                        n/a
                    </div>
                    
                </b-table-column>

                <b-table-column field="status" label="Estado" centered sortable>
                    <b-tag 
                    :type="
                        props.row.status == 'P' ? 'is-warning' : 
                        props.row.status == 'A' ? 'is-success' : 
                        props.row.status == 'R' ? 'is-danger' : 'is-dark' ">

                        {{ props.row.status == 'P' ? 'Pendiente' : 
                        props.row.status == 'A' ? 'Aprobado' : 
                        props.row.status == 'R' ? 'Rechazado' : 'Cancelado' }}
                        
                        </b-tag>
                </b-table-column>

                <b-table-column field="more" label="Detalles" centered sortable>
                    <a class="button is-info is-small" @click="loadDetailsSupport(props.row.nro)">
                        <span class="icon is-small">
                        <i class="fas fa-info"></i>
                        </span>
                    </a>
                </b-table-column>

                <!--<b-table-column label="Gender" sortable>
                    <b-icon pack="fas"
                        :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                    </b-icon>
                    {{ props.row.gender }}
                </b-table-column>-->
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

export default {
  data() {
    return {
      isComponentModalDetailsSupportActive: false,
      isComponentModalDetailsClientActive: false,
      isComponentModalAssignSupportActive: false,
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
      perPage: 7
    };
  },

  components: {
    ModalDetailsSupport,
    ModalDetailsClient,
    ModalAssignSupport
  },

  methods: {
    listenSon() {
      this.refreshData();
    },

    deselect(){
        this.selected = ''
    },

    async refreshData() {
      await axios
        .get(`/support/all`, {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          if (res.data.res) {
            this.data = res.data.support;
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
                tag: 'is-success'
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
        return aux
    },

    loadDetailsSupport(nro){
        this.nroSupport = nro;
        this.isComponentModalDetailsSupportActive = true;
    },

    showAssignSupport(){
        this.isComponentModalAssignSupportActive = true;
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

