<template>
  <v-app>
      <v-toolbar dark clipped-left>
          <v-toolbar-side-icon @click="drawerOpen = true"></v-toolbar-side-icon>
          <v-toolbar-title style="cursor: pointer">Lotto-App</v-toolbar-title>
          <v-toolbar-items>
              <v-btn flat>Login</v-btn>
              <v-btn flat>Logout</v-btn>
          </v-toolbar-items>
      </v-toolbar>
      <v-navigation-drawer temporary dark v-model="drawerOpen"></v-navigation-drawer>
      <router-view></router-view>
  </v-app>
</template>

<script>
    export default {
        created: function () {
            console.log('Vue', this);
        },
        computed: {
            drawerOpen: {
                get () {
                    return this.$store.state.ui.drawerOpen;
                },
                set (value) {
                    this.$store.commit('drawerOpen', value);
                }
            }
        }
    }
</script>