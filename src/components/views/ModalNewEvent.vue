<template>
<div class="modal-card container">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">Nuevo Evento</p>
    </header>

    <section class="modal-card-body">

        <div class="temp">

            <b-input placeholder="Titulo"
                type="text"
                icon-pack="fas"
                icon="shuttle-van"
                maxlength="20"
                v-model="calendar.title"
                rounded>
            </b-input>

            <b-input placeholder="Descripción"
                type="textarea"
                maxlength="100"
                v-model="calendar.description"
                rounded>
            </b-input>

            <b-field>
                <b-datepicker
                    placeholder="Fecha"
                    icon="calendar-alt"
                    icon-pack="fas"
                    rounded
                    v-model="calendar.date">
                </b-datepicker>
            </b-field>

            <b-field>
                <b-select placeholder="Invitado" icon="user" expanded icon-pack="fas" rounded v-model="calendar.invited">
                    <option :value="item.id" v-for="(item, index) in invited" :key="index">{{item.fullname}}</option>
                </b-select>
            </b-field>


        </div>

        

    </section>

    <footer class="modal-card-foot foot center">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">{{global.button.close}}</button>
        <button class="button is-primary is-rounded" @click.prevent="newEvent()">{{global.button.save}}</button>
    </footer>
    
    
</div>
</template>

<script>
import global from "@/config/global.js";
import axios from "@/config/axios.js";
import notify from "@/config/notify.js";

//TODO
/*
    Arreglar que se pueda guardar por roles 
*/

export default {
  data() {
    return {

      global: global.text,
      calendar: { nro: "", title: "", description: "", date: "", invited: "", host: ""},
      invited: []


    }
    
  },

  methods: {

    async newEvent() {

        this.calendar.nro = this.generateNro()
        this.calendar.host = this.$cookie.get('infopersonalId')


        if (this.validateInput(this.calendar)) {
            await axios
            .post('/calendar',this.calendar,
            { 
                headers: 
                    { 
                    Authorization: "bearer " + this.$cookie.get("token") 
                    }
                }
            )
            .then(res => {

                if (res.data.res) {
                notify(this, 'S005');
                this.$emit('hijo:change') //Envio el mensaje al componente padre para que actualice la tabla
                this.$parent.close() //Cierro el modal
                }
            })
            .catch(err => {
                alert(err);
            })
        }
      
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

    generateNro() {
      let date = new Date();
      return date.getTime();
    },

    async loadInvited(){
        await axios
        .get('/infopersonal/all', {
            headers: 
                { 
                Authorization: "bearer " + this.$cookie.get("token") 
                }
        })
        .then(res => {
            if(res.data.res){
                let aux = res.data.infoPersonal
                for (let i in aux){
                    let temp = {
                        id: '', fullname: ''
                    }
                    temp.id = aux[i]._id
                    temp.fullname = aux[i].name + ' ' + aux[i].lastname
                    this.invited.push(temp)
                }
            }
        })
        .catch(err => {
            alert(err)
        })
    }


  },

  created() {
      this.loadInvited();
  },
  watch: {
      $route: "loadInvited"
  }
};
</script>

<style scoped>
.modal-card {
  width: 450px;
  height: 490px;
}
.modal-card-foot {
  height: 50px;
}

.section {
  width: 36em;
}

.container{
    margin: 50px;
}
.center{
    display: flex;
    justify-content: center;
    align-items: center;
}

.temp{
    margin: 0px 30px 0px 30px;
}

</style>


