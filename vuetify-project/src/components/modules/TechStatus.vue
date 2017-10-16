<template>
  <module>
    <v-icon slot="module-icon">location_on</v-icon>

    <v-toolbar-title slot="module-title">Technician Status</v-toolbar-title>

    <v-container slot="module-content">
      <v-layout class="wrap justify-space-between">

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
    </v-container>
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
      global: function () {
        return this.$store.getters.global;
      },
      enroute: {
        get: function () {
          return this.techStatus['Tech In Route'];
        },
        set: function (value) {
          this.$store.dispatch('updateDeal', {deal: {'Tech In Route': value ? this.time() : null, Id: this.global.dealId}});
        }
      },
      onsite: {
        get: function () {
          return this.techStatus['Tech Arrival'];
        },
        set: function (value) {
          this.$store.dispatch('updateDeal', {deal: {'Tech Arrival': value ? this.time() : null, Id: this.global.dealId}});
        }
      },
      completed: {
        get: function () {
          return this.techStatus['Tech Complete'];
        },
        set: function (value) {
          this.$store.dispatch('updateDeal', {deal: {'Tech Complete': value ? this.time() : null, Id: this.global.dealId}});
        }
      }
    }
  }
</script>
