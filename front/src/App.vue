<template>
    <div id="app">
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        components: {
            navbar: require('./components/navbar.vue')
        }
    }
</script>

<style>
    #app{
        padding: 1em;
    }
</style>
