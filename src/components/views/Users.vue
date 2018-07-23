<template>
    <section>
        <b-field grouped group-multiline>
            <h2 class="title is-3">{{global.title.users}}</h2>
            
        </b-field>

        <br>
        <p class="buttons">
            <a class="button is-success is-small is-rounded" @click="loadCreateNewUser()">
                <span>{{global.button.new}}</span>
                <span class="icon is-small">
                <i class="fas fa-plus"></i>
                </span>
            </a>
            <a class="button is-danger is-small is-rounded" @click="lock()">
                <span>{{global.button.lock}}</span>
                <span class="icon is-small">
                <i class="fas fa-times"></i>
                </span>
            </a>
            <a class="button is-warning is-small is-rounded" @click="unLock()">
                <span>{{global.button.unlock}}</span>
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
        <b-modal :active.sync="isComponentModalDetailsClientActive" has-modal-card :width="960">
            <modal-details-client :idClient="idClient"></modal-details-client>
        </b-modal>

        <b-modal :active.sync="isComponentModalCreateNewUserActive" has-modal-card :width="960">
            <modal-create-new-user @hijo:change="listenSon"></modal-create-new-user>
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
                
                <b-table-column field="assigned" label="Asignado" centered sortable>
                    <!--{{ clients._id == props.row.id_client ? clients.name : 'n/a' }}-->
                    
                    <a class="button is-info is-small" @click="loadDetailsClient(props.row._id)">
                        <span class="icon is-small">
                        <i class="fas fa-user-astronaut"></i>
                        </span>
                    </a>
                    
                </b-table-column>

                <b-table-column field="date" label="Creado" centered sortable>
                    <span class="tag is-info">
                        {{ props.row.createdAt.substring(0, 10) }}
                    </span>
                </b-table-column>

                <b-table-column field="username" label="Usuario" centered sortable>
                    {{ props.row.username }}
                </b-table-column>

                <b-table-column field="rol" label="Rol" centered sortable>
                    {{ props.row.rol }}
                </b-table-column>

                <b-table-column field="status" label="Estado" centered sortable>
                    <b-tag 
                    :type="props.row.status == true ? 'is-success' : 'is-danger'">
                    {{ props.row.status == true ? 'Activo' : 'Bloqueado'}}
                    </b-tag>
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
    </section>
</template>

<script>
import global from "@/config/global.js";
import axios from "@/config/axios.js";

//Components
import ModalDetailsClient from "@/components/views/ModalDetailsClient.vue";
import ModalCreateNewUser from "@/components/views/ModalCreateNewUser.vue";

export default {
  data() {
    return {
      isComponentModalDetailsClientActive: false,
      isComponentModalCreateNewUserActive: false,

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
    ModalDetailsClient,
    ModalCreateNewUser
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
        .get(`/user/ref/${this.$cookie.get("ref")}`, {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          if (res.data.res) {
            this.data = res.data.user;
            
          }
        })
        .catch(err => {
          alert(err);
        });
    },


    loadDetailsClient(idClient){
        this.idClient = idClient;
        this.isComponentModalDetailsClientActive = true;
    },

    loadCreateNewUser(){
        this.isComponentModalCreateNewUserActive = true;
    },

    lock(){

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
                title: 'Bloquear Usuario',
                message: `¿Estás seguro de bloquear el usuario: ${this.selected.username}?`,
                confirmText: 'Bloquear',
                type: 'is-danger',
                hasIcon: true,
                icon: 'lock',
                iconPack: 'fas',
                onConfirm: async () => {
                    this.selected.status = false
                    await axios
                    .put(`/user/changestatus/${this.selected._id}`, this.selected, {
                        headers: { Authorization: "bearer " + this.$cookie.get("token") }
                    })
                    .then(res => {
                        if(res.data.res){
                            this.$toast.open({
                                message: 'Usuario Bloqueado',
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
        
    },


    unLock(){

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
                title: 'Desbloquear Usuario',
                message: `¿Estás seguro de desbloquear el usuario: ${this.selected.username}?`,
                confirmText: 'Desbloquear',
                type: 'is-warning',
                hasIcon: true,
                icon: 'unlock',
                iconPack: 'fas',
                onConfirm: async () => {
                    this.selected.status = true
                    await axios
                    .put(`/user/changestatus/${this.selected._id}`, this.selected, {
                        headers: { Authorization: "bearer " + this.$cookie.get("token") }
                    })
                    .then(res => {
                        if(res.data.res){
                            this.$toast.open({
                                message: 'Usuario Desbloqueado',
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

