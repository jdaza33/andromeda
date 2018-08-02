<template>
    <section>
        <b-field grouped group-multiline>
            <h2 class="title is-3">{{global.title.support}}</h2>
            
        </b-field>

        <br>
        <p class="buttons">
            <a class="button is-success is-small is-rounded" @click="isComponentModalCreateSupportActive = true">
                <span>{{global.button.new}}</span>
                <span class="icon is-small">
                <i class="fas fa-plus"></i>
                </span>
            </a>
            <a class="button is-danger is-small is-rounded" @click="cancel()">
                <span>{{global.button.cancel}}</span>
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
        <b-modal :active.sync="isComponentModalCreateSupportActive" has-modal-card :width="960">
            <modal-create-support @hijo:change="listenSon"></modal-create-support>
        </b-modal>

        <b-modal :active.sync="isComponentModalDetailsSupportActive" has-modal-card :width="960">
            <modal-details-support :dataSupport="data" :nroSupport="nroSupport"></modal-details-support>
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

//Components
import ModalCreateSupport from "@/components/views/ModalCreateSupport.vue";
import ModalDetailsSupport from "@/components/views/ModalDetailsSupport.vue";
import ModalDetailsClient from "@/components/views/ModalDetailsClient.vue";

export default {
  data() {
    return {
      isComponentModalCreateSupportActive: false,
      isComponentModalDetailsSupportActive: false,
      nroSupport: '',

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
    ModalCreateSupport,
    ModalDetailsSupport,
    ModalDetailsClient
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
        .get(`/support/ref/${this.$cookie.get("ref")}`, {
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

    cancel(){

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
            this.$dialog.confirm({
                title: 'Cancelar solicitud',
                message: `¿Estás seguro de cancelar la solicitud de soporte nro. #${this.selected.nro}?`,
                confirmText: 'Cancelar',
                type: 'is-danger',
                hasIcon: true,
                icon: 'times',
                iconPack: 'fas',
                onConfirm: async () => {
                    this.selected.status = 'C'
                    await axios
                    .put(`/support/changestatus/${this.selected._id}`, this.selected, {
                        headers: { Authorization: "bearer " + this.$cookie.get("token") }
                    })
                    .then(res => {
                        if(res.data.res){
                            this.$toast.open({
                                message: 'Solicitud Cancelada',
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

