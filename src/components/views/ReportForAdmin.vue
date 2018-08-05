<template>
    <section>
        <b-field grouped group-multiline>
            <h2 class="title is-3">Gestión de Reportes</h2>
            
        </b-field>

        <br>
        <p class="buttons">
            <a class="button is-success is-small is-rounded" @click="checkIn()">
                <span>Facturar</span>
                <span class="icon is-small">
                <i class="fas fa-bell"></i>
                </span>
            </a>
            <a class="button is-info is-small is-rounded" @click="deselect()">
                <span>{{global.button.deselect}}</span>
                <span class="icon is-small">
                <i class="fas fa-bolt"></i>
                </span>
            </a>
            <a>
                <b-field>
                    <b-radio-button v-model="showReport"
                        native-value="0"
                        type="is-success">
                        <b-icon pack="fas" icon="eye"></b-icon>
                        <span>Todos</span>
                    </b-radio-button>

                    <b-radio-button v-model="showReport"
                        native-value="1"
                        type="is-info">
                        <b-icon pack="fas" icon="check-double"></b-icon>
                        <span>Facturados</span>
                    </b-radio-button>

                    <b-radio-button v-model="showReport"
                        native-value="2"
                        type="is-warning">
                        <b-icon pack="fas" icon="check"></b-icon>
                        <span>No Facturados</span>
                    </b-radio-button>
                </b-field>
            </a>
        </p>

        <!--Modals-->

        <!--End Modals-->

        <b-table
            :data="isEmpty ? [] : showReport == '0'  ? reportsAll : showReport == '1' ? reportsCheckIn : reportsNotCheckIn"
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
                
                <b-table-column field="nro" label="Nro. de Reporte" centered sortable>
                    <span class="tag is-success">
                        {{props.row.nro}}
                    </span>
                </b-table-column>

                <b-table-column field="nro_support" label="Nro. de Soporte" centered sortable>
                    <span class="tag is-info">
                       {{props.row.nro_support}}
                    </span>
                </b-table-column>

                <b-table-column field="total_hours" label="Total Horas" centered sortable>
                    {{props.row.total_hours}}
                </b-table-column>

                <b-table-column field="total_service" label="Total Servicio" centered sortable>
                    {{props.row.total_service}}
                </b-table-column>

                <b-table-column field="invoiced" label="Facturado" centered sortable>
                    <b-tag 
                    :type="props.row.invoiced == 'S' ? 'is-success' : 'is-danger'">
                    {{ props.row.invoiced == 'S' ? 'SI' : 'NO'}}
                    </b-tag>
                </b-table-column>

                <b-table-column field="pdf" label="PDF" centered sortable>
                    <a class="button is-warning is-small" @click="showPdf()">
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


export default {
  data() {
    return {

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

      showReport: '0',

      reportsAll: '',
      reportsCheckIn: [],
      reportsNotCheckIn: []

    };
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
        .get(`/report/ref/${this.$cookie.get('ref')}`, {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          if (res.data.res) {
            this.reportsAll = res.data.report

            this.reportsCheckIn = []
            this.reportsNotCheckIn = []

            for(let i in this.reportsAll){
                if(this.reportsAll[i].invoiced == 'S'){
                    this.reportsCheckIn.push(this.reportsAll[i])
                }else{
                    this.reportsNotCheckIn.push(this.reportsAll[i])
                }
            }
          }
        })
        .catch(err => {
          alert(err);
        });
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

