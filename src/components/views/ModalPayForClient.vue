<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">Pagar Factura</p>
    </header>

    <section class="modal-card-body">

      <p class="title is-6">Metodo de Pago: </p>

        <div class="center">
          <b-field>
            <b-checkbox-button v-model="method"
                native-value="visa"
                type="is-success">
                <b-icon pack="fas" icon="credit-card"></b-icon>
                <span>Visa</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="method"
                native-value="master"
                type="is-info">
                <b-icon pack="fas" icon="credit-card"></b-icon>
                <span>Master</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="method"
                native-value="transfer"
                type="is-success">
                <b-icon pack="fas" icon="money-bill-alt"></b-icon>
                <span>Transferencia</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="method"
                native-value="deposit"
                type="is-info">
                <b-icon pack="fas" icon="money-bill-alt"></b-icon>
                <span>Deposito</span>
            </b-checkbox-button>
          </b-field>
        </div>
        
        <br>
        <p class="title is-6">Referencia: <br><small>*Sin son más dos formas de pagos, separe por comas*</small></p>
  
        <b-field>
          <b-input 
                placeholder="Referencia"
                type="text"
                icon-pack="fas"
                icon="barcode"
                maxlength="30"
                rounded
                v-model="payment.ref">
            </b-input>
        </b-field>

        <p class="title is-6">Capturas de Pantalla: </p>

        <div class="file has-name is-boxed center">
            <label class="file-label">
                <input class="file-input" type="file" multiple name="images" id="images" ref="images" v-on:change="handleFileUpload()">
                <span class="file-cta">
                <span class="file-icon">
                    <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                    Choose a file…
                </span>
                </span>
            </label>
        </div>
        <br>
        <div class="tags center">
            <span v-for="(file, index) in images"
                :key="index"
                class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                </button>
            </span>
        </div>

    </section>

    <footer class="modal-card-foot foot center">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">{{global.button.close}}</button>
        <button class="button is-primary is-rounded" @click.prevent="pay()">Pagar</button>
    </footer>
    
    
</div>
</template>

<script>
import global from '@/config/global.js';
import axios from '@/config/axios.js';
import notify from '@/config/notify.js';
import FormData from 'form-data';

export default {
  data() {
    return {
      global: global.text,
      method: [],
      payment: {
        nro: '',
        id_bill : '',
        method: '',
        ref: '',
        images: ''
      },
      images: [],
      imagesShow: '',
    };
  },

  props: ['bill'],

  methods: {
    deleteDropFile(index) {
      this.images.splice(index, 1);
    },

    async pay() {

      this.payment.id_bill = this.bill._id;
      this.payment.nro = this.generateNro();
      this.payment.images = await this.uploadImages();
      this.payment.method = this.method
      this.bill.status = 'S'

      

      await axios
        .post('/payment', this.payment, {
          headers: {
            Authorization: 'bearer ' + this.$cookie.get('token'),
          }
        })
        .then(async res => {
          if (res.data.res) {

            await axios
            .put(`/bill/${this.bill._id}`, this.bill,{
              headers: {
                  Authorization: 'bearer ' + this.$cookie.get('token'),
                }
            })
            .then(ress => {
              if(ress.data.res){
                notify(this, 'S004');
                this.$emit('hijo:change'); //Envio el mensaje al componente padre para que actualice la tabla
                this.$parent.close(); //Cierro el modal
              }
            })
            .catch(errr => {
              alert(errr)
            })

          } else {
            notify(this, 'E008');
          }
        })
        .catch(err => {
          alert(err);
        });
    },

    generateNro() {
      let date = new Date();
      return date.getTime();
    },

    async uploadImages() {
      let data = new FormData();
      //data.append("file", this.file);

      for (var i = 0; i < this.images.length; i++) {
        let file = this.images[i];

        data.append('images', file);
      }

      let aux = '';

      await axios
        .post('/uppayment', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          if (res.data.res) {
            for (let i in res.data.images) {
              if (i == 0) {
                aux = res.data.images[i].filename;
              } else {
                aux = aux + '|' + res.data.images[i].filename;
              }
            }
          }
        })
        .catch(() => {
          notify(this, 'E009');
        });
      return aux;
    },

    handleFileUpload() {

        for (let i in this.$refs.images.files) {
            this.images.push(this.$refs.images.files[i]);
        }
        this.images.pop()
        this.images.pop()

        //this.$log.debug(this.images);

    },
  },
};
</script>

<style scoped>
.modal-card {
  width: 545px;
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


