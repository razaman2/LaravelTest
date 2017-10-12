<template>
  <module>
    <v-icon slot="module-icon">location_on</v-icon>

    <v-toolbar-title slot="module-title">Technician Status</v-toolbar-title>

    <v-layout slot="module-content" class="wrap justify-space-between pl-2 pr-2">

      <v-flex class="xs6 sm3">
        <p class="subheading pa-0 ma-0">Not on Site</p>
        <v-checkbox class="pa-0 ma-0" v-model="techStatus.notOnSite" :disabled="true"></v-checkbox>
      </v-flex>

      <v-flex class="xs6 sm3">
        <p class="subheading pa-0 ma-0">Enroute</p>
        <v-checkbox class="pa-0 ma-0" v-model="enroute" :disabled="enroute != null"></v-checkbox>
      </v-flex>

      <v-flex class="xs6 sm3">
        <p class="subheading pa-0 ma-0">On Site</p>
        <v-checkbox class="pa-0 ma-0" v-model="onsite" :disabled="onsite != null || enroute === null"></v-checkbox>
      </v-flex>

      <v-flex class="xs6 sm3">
        <p class="subheading pa-0 ma-0">Completed</p>
        <v-checkbox class="pa-0 ma-0" v-model="completed" :disabled="completed != null || onsite === null"></v-checkbox>
      </v-flex>

    </v-layout>
  </module>
</template>

<script>
  import module from '../partials/module.vue';

  export default {
    components: {
      module: module
    },
    methods: {
      time: function () {
        return this.$moment().format('YYYY-MM-DD HH:mm:ss');
      }
    },
    computed: {
      techStatus: function () {
        return this.$store.getters.techStatus;
      },
      enroute: {
        get: function () {
          return this.techStatus['Tech In Route'];
        },
        set: function (value) {
          this.$store.dispatch('updateDeal', {obj: this,  value: {'Tech In Route': value ? this.time():null}});
        }
      },
      onsite: {
        get: function () {
          return this.techStatus['Tech Arrival'];
        },
        set: function (value) {
          this.$store.dispatch('updateDeal', {obj: this,  value: {'Tech Arrival': value ? this.time():null}});
        }
      },
      completed: {
        get: function () {
          return this.techStatus['Tech Complete'];
        },
        set: function (value) {
          this.$store.dispatch('updateDeal', {obj: this,  value: {'Tech Complete': value ? this.time():null}});
        }
      }
    }
  }
</script>
