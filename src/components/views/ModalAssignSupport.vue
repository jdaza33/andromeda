<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">{{global.title.assignSupport}}</p>
    </header>

    <section class="modal-card-body">
        <p class="title is-6 has-text-centered">{{global.input.toAssign + ": "}}</p>
        
        <b-field class="center">
            <b-select
                icon="users"
                icon-pack="fas"
                v-model="isAssignSelect"
                placeholder="Nombre">
                <option v-for="(item, index) in nameAdmin" :key="index" :value="item.id">
                    {{item.name + " " + item.lastname}}
                </option>
            </b-select>
        </b-field>

    </section>

    <footer class="modal-card-foot foot center">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">{{global.button.close}}</button>
        <button class="button is-primary is-rounded" @click.prevent="saveAssignSupport()">{{global.button.save}}</button>
    </footer>
    
    
</div>
</template>

<script>
import global from "@/config/global.js";
import axios from "@/config/axios.js";
import notify from "@/config/notify.js";

export default {
  data() {
    return {
      global: global.text,
      nameAdmin: [],
      isAssignSelect: "",
      supportSelect: ""
    };
  },

  props: ["support"],

  methods: {
    async refreshData() {
      this.supportSelect = this.support;

      await axios
        .get(`/user/ref/${this.$cookie.get("ref")}`, {
          headers: { Authorization: "bearer " + this.$cookie.get("token") }
        })
        .then(async res => {
          if (res.data.res) {
            for (let i in res.data.user) {
              await axios
                .get(`/infopersonal/${res.data.user[i].id_infopersonal}`, {
                  headers: {
                    Authorization: "bearer " + this.$cookie.get("token")
                  }
                })
                .then(ress => {
                  if (ress.data.res) {
                    this.nameAdmin.push({
                      id: res.data.user[i]._id,
                      name: ress.data.infoPersonal.name,
                      lastname: ress.data.infoPersonal.lastname
                    });
                  }
                })
                .catch(err => {
                  alert(err);
                });
            }
          }
        })
        .catch(err => {
          alert(err);
        });
    },

    async saveAssignSupport() {
      this.supportSelect.status = "A";
      this.supportSelect.assigned = this.isAssignSelect;
      //this.$log.debug(this.supportSelect);

      await axios
        .put(
          `/support/changestatus/${this.supportSelect._id}`,
          this.supportSelect,
          {
            headers: { Authorization: "bearer " + this.$cookie.get("token") }
          }
        )
        .then(async res => {
          if (res.data.res) {

            await axios
            .post("/record",
            {
                nro_support: this.supportSelect.nro,
                activities: []
            },
            {
                headers: { Authorization: "bearer " + this.$cookie.get("token") }
            })
            .then(ress => {
                if(ress.data.res){
                    this.$toast.open({
                    message: "Solicitud Aprobada",
                    type: "is-success"
                    });
                    this.$emit("hijo:change");
                    this.$parent.close();
                }
                
            })
            .catch(errr => {
                alert(errr);
            });
          }
        })
        .catch(err => {
          alert(err);
        });

      
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
.modal-card {
  width: 345px;
  height: 260px;
}
.modal-card-foot {
  height: 50px;
}

.section {
  width: 36em;
}

.center{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>


