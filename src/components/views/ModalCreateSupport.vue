<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">{{global.title.newsupport}}</p>
    </header>

    <section class="modal-card-body">
        <p class="title is-6">{{global.input.issue + ": "}}</p>
        <b-field>
          <b-input 
                :placeholder="global.input.issue"
                type="text"
                icon-pack="fas"
                icon="user-astronaut"
                maxlength="50"
                v-model="support.issue"
                rounded>
            </b-input>
        </b-field>
        
        <p class="title is-6">{{global.input.description + ": "}}</p>
        <b-field>
            <b-input 
                type="textarea"
                maxlength="300"
                v-model="support.description"
                rounded>
            </b-input>
        </b-field>

        <p class="title is-6">{{global.title.images + ": "}}</p>

        <div class="file has-name is-boxed">
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
        <div class="tags">
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

    <footer class="modal-card-foot foot">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">{{global.button.close}}</button>
        <button class="button is-primary is-rounded" @click.prevent="newSupport()">{{global.button.send}}</button>
    </footer>
    
    
</div>
</template>

<script>
import global from "@/config/global.js";
import axios from "@/config/axios.js";
import notify from "@/config/notify.js";
import FormData from "form-data";

export default {
  data() {
    return {
      global: global.text,
      support: {
        id_client: this.$cookie.get("userId"),
        nro: "",
        issue: "",
        description: "",
        images: "",
        ref: this.$cookie.get("ref")
      },
      images: ''
    };
  },
  props: ["userData", "userInfoData"],

  methods: {
    deleteDropFile(index) {
        this.images.splice(index, 1);
    },

    async newSupport() {
      this.support.nro = this.generateNro();
      this.support.images = await this.uploadImages();

      await axios
        .post('/support',this.support,
        { 
            headers: 
            { 
                Authorization: "bearer " + this.$cookie.get("token") 
                }
            }
        )
        .then(res => {
            this.$log.debug(res.data);
            if (res.data.res) {
            notify(this, 'S002');
            this.$emit('hijo:change') //Envio el mensaje al componente padre para que actualice la tabla
            this.$parent.close() //Cierro el modal
            } else {
            notify(this, 'E008');
            }
        })
        .catch(err => {
            alert(err);
        })
    },

    generateNro() {
      let date = new Date();
      return date.getTime();
    },

    async uploadImages() {
        
        let data = new FormData();
        //data.append("file", this.file);

        for( var i = 0; i < this.images.length; i++ ){
            let file = this.images[i];

            data.append('images', file);
        }

        let aux = '';

        await axios
        .post("/upsupport", data, {
            headers: {
            "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            if (res.data.res) {
                for (let i in res.data.images) {
                    if(i==0){
                        aux = res.data.images[i].filename;
                    }else{
                        aux = aux + '|' + res.data.images[i].filename;
                    }
                }
            }
        })
        .catch(err => {
            notify(this, "E009");
            this.$log.debug(err);
        });
        return aux;
    },

    handleFileUpload(){
        this.images = this.$refs.images.files;
        this.images = Object.values(this.images);
      }
  }
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
</style>


