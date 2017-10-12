<template>
  <div>
    <form action="" class="auth">
      <input v-model="firstName" type="text" placeholder="enter first name">
      <input v-model="lastName" type="text" placeholder="enter last name">
      <input v-model="email" type="email" placeholder="enter email">
      <input v-model="password" type="password" placeholder="enter password">
      <input v-model="passwordVerify" type="password" placeholder="verify password">
      <input type="submit">
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordVerify: null
      }
    }
  }
</script>

<style>
  .auth{
    display: flex;
    flex-flow: column;
    border: 1px solid lightgrey;
    padding: 25%;
  }
  input{
    margin: 3px;
    padding: 5px;
  }
  input[type = submit]{
    width: 25%;
    align-self: flex-end;
  }
  input[type = submit]:hover{
    background-color: green;
    color: white;
  }
</style>
