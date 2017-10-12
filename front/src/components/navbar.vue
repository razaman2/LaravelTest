<template>
  <div class="navbar">
      <router-link to="/">Home</router-link>
      <router-link v-if="isAuth" to="/zones">Zones</router-link>
      <router-link v-if="isAuth" to="/zone">Zone</router-link>
      <router-link v-if="isAuth" to="/zones/create">Create</router-link>
      <router-link v-if="isAuth" to="/zones/update">Edit</router-link>
      <router-link v-if="isAuth" to="/zones/delete">Delete</router-link>
      <router-link v-if="isAuth" to="/dashboard">Dashboard</router-link>
      <router-link v-if="!isAuth" to="/login">Login</router-link>
      <router-link v-if="!isAuth" to="/register">Register</router-link>
      <router-link v-if="isAuth" to="/logout">Logout</router-link>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                isAuth: null
            }
        },
        created () {
            this.isAuth = this.$auth.isAuthenticated();
            this.setAuthenticatedUser();
        },
        methods: {
            setAuthenticatedUser () {
                this.$http.get('api/user').then(response => {
                    console.log(response);
                    this.$auth.setAuthenticatedUser(response.body);
                });
            }
        }
    }
</script>

<style>
    .active{
        background-color: green !important;
        color: white;
    }
    .navbar{
        display: flex;
        justify-content: space-around;
        border: 1px solid lightgrey;
        border-bottom: none;
    }
    .navbar a{
        margin: 2px;
        padding: 5px;
        flex-grow: 1;
        background-color: lightgrey;
    }
    a{
        text-decoration: none;
    }
    a:hover{
        background-color: black;
        color: white;
    }
    *{
        margin: 0;
        padding: 0;
    }
</style>
