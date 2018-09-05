<template>

  <div>
    <breadcrub name="Agenda" icon="calendar-alt"/>
    <p class="buttons">
        <a class="button is-success is-small is-rounded" @click="newEvent()">
            <span>Nuevo</span>
            <span class="icon is-small">
            <i class="fas fa-plus"></i>
            </span>
        </a>
        <!--<a class="button is-danger is-small is-rounded" @click="lock()">
            <span>Cancelar</span>
            <span class="icon is-small">
            <i class="fas fa-times"></i>
            </span>
        </a>-->
    </p>

    <vue-event-calendar :events="data"></vue-event-calendar>

    <!--Modals-->
    <b-modal :active.sync="isComponentModalNewEventActive" has-modal-card :width="960">
        <modal-new-event @hijo:change="listenSon"></modal-new-event>
    </b-modal>

    <!--End Modals-->
  </div>
  
</template>

<script>

import axios from "@/config/axios.js";

//Components
import ModalNewEvent from "@/components/views/ModalNewEvent";

//Templates
import Breadcrub from "@/components/templates/Breadcrub";

export default {
  data () {
    return {
      data: [],
      demoEvents: [{
        date: '2018/08/19', // Required
        title: 'Foo', // Required
        desc: 'Nada de nada jajajajaja'
      }, {
        date: '2016/12/15',
        title: 'Bar',
        desc: 'Nada de nada jajajajaja'
      }],

      isComponentModalNewEventActive: false
    }
  },

  components: {
    Breadcrub,
    ModalNewEvent
  },

  methods: {
    newEvent(){
      this.isComponentModalNewEventActive = true
    },

    listenSon(){
      this.loadData()
    },

    async loadData(){

      this.data = []

      await axios
      .get(`/calendar/host/${this.$cookie.get('infopersonalId')}`, {
        headers: { Authorization: "bearer " + this.$cookie.get("token") }
      })
      .then(res => {
        if(res.data.res){
          let temp_data = res.data.calendar
          for (let i in temp_data){
            let aux = {
              date: '', title: '', desc: ''
            }
            let temp_date = temp_data[i].date.substring(0,10).split('-')
            aux.date = temp_date[0]+'/'+temp_date[1]+'/'+temp_date[2]
            aux.title = temp_data[i].title
            aux.desc = temp_data[i].description
            this.data.push(aux)
          }
        }
      })
      .catch(err => {
        alert(err)
      })

      await axios
      .get(`/calendar/invited/${this.$cookie.get('infopersonalId')}`, {
        headers: { Authorization: "bearer " + this.$cookie.get("token") }
      })
      .then(res => {
        if(res.data.res){
          let temp_data = res.data.calendar
          for (let i in temp_data){
            let aux = {
              date: '', title: '', desc: ''
            }
            let temp_date = temp_data[i].date.substring(0,10).split('-')
            aux.date = temp_date[0]+'/'+temp_date[1]+'/'+temp_date[2]
            aux.title = temp_data[i].title
            aux.desc = temp_data[i].description
            this.data.push(aux)
          }
        }
      })
      .catch(err => {
        alert(err)
      })

      this.$log.debug(this.data)
    }
  },

  created() {
      this.loadData();
  },
  watch: {
      $route: "loadData"
  }
}
</script>

<style>
.__vev_calendar-wrapper .cal-wrapper {
    width: 50%;
    padding: 10px 10px;
}

</style>
