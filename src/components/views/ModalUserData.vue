<template>
<div class="modal-card">

    <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">Cuenta</p>
    </header>

    <section class="modal-card-body">
        
        <b-tabs position="is-centered" class="block">
            <b-tab-item label="Datos Personales"></b-tab-item>
            <b-tab-item label="Dirección"></b-tab-item>
            <b-tab-item label="Autenticación"></b-tab-item>
        </b-tabs>

    </section>

    <footer class="modal-card-foot foot">
        <button class="button is-outlined is-rounded" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary is-rounded">Login</button>
    </footer>
    
    
</div>
</template>

<script>
    export default {
        data(){
            return {
                personalData: [],
                address: [],
                auth: []
            }
        },
        props: ['userData', 'userInfoData']
    }
</script>

<style>
.modal-card{
    width: 200px;
    height: 500px;
}
.modal-card-foot{
    height: 50px;
}

</style>


