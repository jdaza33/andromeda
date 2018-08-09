<template>

    <nav class="breadcrumb is-centered is-medium has-bullet-separator" aria-label="breadcrumbs">
        <ul>
            <li>
            <a href="#">
                <span class="icon is-small">
                <i class="fas fa-home" aria-hidden="true"></i>
                </span>
                <span>Panel</span>
            </a>
            </li>
            <li class="is-active">
            <a href="#">
                <span class="icon is-small">
                <i :class="'fas fa-'+icon" aria-hidden="true"></i>
                </span>
                <span>{{name}}</span>
            </a>
            </li>
        </ul>
    </nav>
    
</template>

<script>
export default {
    data(){
        return{

        }
    },

    props: ['name', 'icon']
}
</script>

