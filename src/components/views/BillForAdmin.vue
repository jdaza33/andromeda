<template>
    <section ref="pdf">

        <breadcrub name="Gestión de Facturas" icon="dollar-sign"/>

        <p class="buttons">
            <!--<a class="button is-warning is-small is-rounded" @click="notify()">
                <span>Notificar</span>
                <span class="icon is-small">
                <i class="fas fa-bell"></i>
                </span>
            </a>-->
            <a class="button is-info is-small is-rounded" @click="deselect()">
                <span>{{global.button.deselect}}</span>
                <span class="icon is-small">
                <i class="fas fa-bolt"></i>
                </span>
            </a>
            <a>
                <b-field>
                    <b-radio-button v-model="showBill"
                        native-value="0"
                        type="is-info">
                        <b-icon pack="fas" icon="eye"></b-icon>
                        <span>Todos</span>
                    </b-radio-button>

                    <b-radio-button v-model="showBill"
                        native-value="1"
                        type="is-success">
                        <b-icon pack="fas" icon="check-double"></b-icon>
                        <span>Pagados</span>
                    </b-radio-button>

                    <b-radio-button v-model="showBill"
                        native-value="2"
                        type="is-danger">
                        <b-icon pack="fas" icon="check"></b-icon>
                        <span>No Pagados</span>
                    </b-radio-button>
                </b-field>
            </a>
        </p>

        <!--Modals-->
        <b-modal :active.sync="isComponentModalDetailsClientActive" has-modal-card :width="960">
            <modal-details-client :idClient="idClient"></modal-details-client>
        </b-modal>
        <b-modal :active.sync="isComponentModalDetailsPaymentActive" has-modal-card :width="960">
            <modal-details-payment :idBill="billShow"></modal-details-payment>
        </b-modal>
        <!--End Modals-->

        <b-table
            :data="isEmpty ? [] : showBill == '0'  ? billAll : showBill == '1' ? billYes : billNot"
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
                
                <b-table-column field="nro" label="Nro." centered sortable>
                    <span class="tag is-success">
                        {{props.row.nro}}
                    </span>
                </b-table-column>

                <b-table-column field="Cliente" label="Cliente" centered sortable>
                    <a class="button is-info is-small" @click="loadDetailsClient(props.row.id_client)">
                        <span class="icon is-small">
                        <i class="fas fa-user-astronaut"></i>
                        </span>
                    </a>
                </b-table-column>

                <b-table-column field="SubTotal" label="SubTotal" centered sortable>
                    {{props.row.sub_total}}
                </b-table-column>

                <b-table-column field="IVA" label="IVA" centered sortable>
                    {{props.row.iva}}
                </b-table-column>

                <b-table-column field="Total" label="Total" centered sortable>
                    {{props.row.total_amount}}
                </b-table-column>

                <b-table-column field="status" label="Pago" centered sortable>
                    <b-tag 
                    :type="props.row.status == 'S' ? 'is-success' : 'is-danger'">
                    {{ props.row.status == 'S' ? 'SI' : 'NO'}}
                    </b-tag>
                </b-table-column>

                <b-table-column field="pdf" label="PDF" centered sortable>
                    <a class="button is-warning is-small" @click="showPdf()">
                        <span class="icon is-small">
                        <i class="fas fa-file-pdf"></i>
                        </span>
                    </a>
                </b-table-column>

                <b-table-column field="pdf" label="Comprobante" centered sortable>
                    <a class="button is-success is-small" @click="showPayment(props.row._id)"
                    v-if="props.row.status == 'S'">
                        <span class="icon is-small">
                        <i class="fas fa-file-pdf"></i>
                        </span>
                    </a>
                    <a class="button is-dark is-small" v-if="props.row.status == 'N'">
                        <span class="icon is-small">
                        <i class="fas fa-file-pdf"></i>
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
    </section>
</template>

<script>
import global from "@/config/global.js";
import axios from "@/config/axios.js";


//Components
import ModalDetailsClient from '@/components/views/ModalDetailsClient'
import ModalDetailsPayment from '@/components/views/ModalDetailsPayment'


//Templates
import Breadcrub from "@/components/templates/Breadcrub.vue";

export default {
  data() {
    return {

        isComponentModalDetailsClientActive: false,
        isComponentModalDetailsPaymentActive: false,

        global: global.text,

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

        showBill: '0',

        idClient: '',

        billAll: '',
        billYes: [],
        billNot: [],

        billShow: ''

    };
  },

  components: {
      ModalDetailsClient,
      Breadcrub,
      ModalDetailsPayment
  },

  methods: {
    listenSon() {
      this.refreshData();
    },

    deselect(){
        this.selected = ''
    },

    loadDetailsClient(idClient){
        this.idClient = idClient;
        this.isComponentModalDetailsClientActive = true;
    },

    async refreshData() {
        await axios
        .get(`/bill/ref/${this.$cookie.get('ref')}`, {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(res => {
            if (res.data.res) {
            this.billAll = res.data.bill

            this.billYes = []
            this.billNot = []

            for(let i in this.billAll){
                if(this.billAll[i].status == 'S'){
                    this.billYes.push(this.billAll[i])
                }else{
                    this.billNot.push(this.billAll[i])
                }
            }
            }
        })
        .catch(err => {
            alert(err);
        });

        
    },


    showPdf(){

        /*let routeData = this.$router.resolve({path: `/reportemp/${details}`});
        window.open(routeData.href, '_blank');*/
    },

    showPayment(idBill){
        this.billShow = idBill
        this.isComponentModalDetailsPaymentActive = true
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

