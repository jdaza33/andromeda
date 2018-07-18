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
        <b-field>
            <b-upload v-model="images_support" class="uploadSupport"
                multiple
                drag-drop>
                <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <b-icon
                                pack="fas"
                                icon="cloud-upload-alt"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>{{global.input.upload}}</p>
                    </div>
                </section>
            </b-upload>
        </b-field>

        <div class="tags">
            <span v-for="(file, index) in images_support"
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
        <button class="button is-primary is-rounded" @click="newSupport()">{{global.button.send}}</button>
    </footer>
    
    
</div>
</template>

<script>

import global from "@/config/global.js";
import axios from "@/config/axios.js";
import notify from "@/config/notify.js";

    export default {
        data(){
            return {
                global: global.text,
                support: {id_client: this.$cookie.get("userId") ,nro: "1", issue: "", description: "", images:"", ref: this.$cookie.get("ref")},
                images_support: []
            }
        },
        props: ['userData', 'userInfoData'],

        methods: {
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            },

            newSupport(){
                axios
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
                    } else {
                    notify(this, 'E008');
                    }
                })
                .catch(err => {
                    alert(err);
                })
            }
        }
    }
</script>

<style scope>
.modal-card{
    width: 100px;
    height: 460px;
}
.modal-card-foot{
    height: 50px;
}

.section{
    width: 36em;
}

</style>


