<template>
  <div class="auth">
    <input v-model="email" type="email" placeholder="your email">
    <input v-model="password" type="password" placeholder="your password">
    <input @click="login" type="button" value="Login">
  </div>
</template>

<script>
    export default {
        data () {
            return {
                email: null,
                password: null
            }
        },
        methods: {
            login () {
                let data = {
                    client_id: 2,
                    client_secret: 'VFMpWvDYUtUQGgnt73XIYHuPjxNtQaLjkEHyB1lS',
                    grant_type: 'password',
                    username: this.email,
                    password: this.password
                };
//                this.$http.post('http://localhost:8000/oauth/token', data)
//                    .then(function (response) {
//                        console.log(response);
//                    });
                this.$http.post('oauth/token', data).then(response => {
                    console.log(response);
                    this.$auth.setToken(response.body.access_token, response.body.expires_in + Date.now());
                }).then(() => {
                    this.$router.push('/dashboard');
                });
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
  input[type = button]{
    width: 25%;
    align-self: flex-end;
  }
  input[type = button]:hover{
    background-color: green;
    color: white;
  }
</style>
