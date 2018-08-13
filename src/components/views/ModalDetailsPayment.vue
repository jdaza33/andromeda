<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">Comprobante de Pago</p>
    </header>

    <section class="modal-card-body">

        <div class="center">

            <b-field grouped group-multiline>
                <div class="control">
                    <b-taglist attached>
                        <b-tag type="is-dark" size="is-medium">Nro.</b-tag>
                        <b-tag type="is-info" size="is-medium">{{data.nro}}</b-tag>
                    </b-taglist>
                </div>

                <div class="control">
                    <b-taglist attached>
                        <b-tag type="is-dark" size="is-medium">{{global.title.date}}</b-tag>
                        <b-tag type="is-primary" size="is-medium">{{ convertDate(data.createdAt.substring(0,10)) }}</b-tag>
                    </b-taglist>
                </div>

            </b-field>

        </div>
        
        <br>

        <div class="content">
            
            <p class="title is-6">Metodo de Pago: {{data.method == 'visa' ? 'Visa' : data.method == 'master' ? 'Master' : data.method == 'transfer' ? 'Transferencia' : 'Deposito'}} </p>
            <p class="title is-6">Referencia: {{data.ref}} </p>
            <p class="title is-6">Captura de Pantalla: </p>
            <div v-show="isImg">
                <figure class="image is-4by3" v-for="(item, index) in images" :key="index">
                    <img :src="api + '/uploads/payment/' + item">
                </figure>
            </div>
            

        </div>

    </section>

    <footer class="modal-card-foot foot center">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">{{global.button.close}}</button>
    </footer>
    
    
</div>
</template>

<script>
import global from '@/config/global.js';
import axios from '@/config/axios.js';
//import notify from "@/config/notify.js";

export default {
  data() {
    return {
      global: global.text,
      images_support: [],
      data: '',
      images: [],
      isImg: false,
      api: process.env.VUE_APP_API_URL,
    };
  },
  props: ['idBill'],

  methods: {
    async loadDataSupport() {
      await axios
        .get(`/payment/bill/${this.idBill}`, {
          headers: { Authorization: 'bearer ' + this.$cookie.get('token') },
        })
        .then(res => {
          if (res.data.res) {
            this.data = res.data.payment[0];
          }
        })
        .catch(err => {
          alert(err);
          //this.$parent.close()
        });

      this.$log.debug(this.data);

      if (this.data.images != '') {
        let aux = this.data.images.split('');
        let temp = false;
        for (let i in aux) {
          if (aux[i] == '|') {
            temp = true;
          }
        }
        if (temp == false) {
          this.images.push(this.data.images);
        } else {
          this.images = this.data.images.split('|');
        }
        this.isImg = true;
      }
    },

    convertDate(date) {
      let temp = date.split('-');
      return `${temp[2]}-${temp[1]}-${temp[0]}`;
    },
  },

  created() {
    this.loadDataSupport();
  },
  watch: {
    $route: 'loadDataSupport',
  },
};
</script>

<style scoped>
.modal-card {
  width: 645px;
  height: 460px;
}
.modal-card-foot {
  height: 50px;
}

.section {
  width: 36em;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


