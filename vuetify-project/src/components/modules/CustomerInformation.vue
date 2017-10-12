<template>
  <module>
    <v-icon slot="module-icon">account_circle</v-icon>

    <v-toolbar-title slot="module-title">Customer Information</v-toolbar-title>

    <v-form slot="module-content" ref="form">
      <v-layout column>

        <v-layout wrap justify-space-between>

          <v-flex>
            <v-text-field label="First Name" :rules="[rules.required]" required v-model="customerInfo['First Name']"></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field label="Last Name" :rules="[rules.required]" required v-model="customerInfo['Last Name']"></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field label="Phone" :rules="[rules.phone, rules.required]" required v-model="customerInfo['Contact Phone']"></v-text-field>
          </v-flex>

        </v-layout>

        <v-divider></v-divider>

        <v-layout wrap justify-space-between>

          <v-flex>
            <v-text-field label="Address1" :rules="[rules.required]" required v-model="customerInfo.Address"></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field label="Address2" v-model="customerInfo['Address 2']"></v-text-field>
          </v-flex>

        </v-layout>

        <v-layout wrap justify-space-between>

          <v-flex>
            <v-text-field label="City" :rules="[rules.required]" required v-model="customerInfo.City"></v-text-field>
          </v-flex>

          <v-flex v-if="customerInfo.Country === 'Canada'">
            <v-select :items="picklists['State']" v-model="customerInfo.Province" label="Province" autocomplete
                      :rules="[rules.required]" required></v-select>
          </v-flex>

          <v-flex v-else>
            <v-select :items="picklists['State']" v-model="customerInfo.State" label="State" autocomplete
                      :rules="[rules.required]"
                      required></v-select>
          </v-flex>

          <v-flex v-if="customerInfo.Country === 'Canada'">
            <v-text-field label="Postal Code" :rules="[rules.required]" required v-model="customerInfo.Postal"></v-text-field>
          </v-flex>

          <v-flex v-else>
            <v-text-field label="Zip Code" :rules="[rules.zip, rules.required]" required v-model="customerInfo.Zip"></v-text-field>
          </v-flex>

        </v-layout>

        <v-layout wrap justify-space-between>

          <v-flex v-if="customerInfo.Country !== 'Canada'">
            <v-text-field label="County" :rules="[rules.required]" required v-model="customerInfo.County"></v-text-field>
          </v-flex>

          <v-flex>
            <v-select :items="picklists['Country']" v-model="customerInfo.Country" label="Country" autocomplete
                      :rules="[rules.required]" required></v-select>
          </v-flex>

        </v-layout>

      </v-layout>
    </v-form>

    <v-spacer slot="module-spacer"></v-spacer>

    <v-btn slot="module-action" large flat @click="save">Save</v-btn>
  </module>
</template>

<script>
  import module from '../partials/module.vue';

  export default {
    components: {
      module: module
    },
    computed: {
      customerInfo: {
        get: function () {
          return this.$store.getters.customerInfo;
        },
        set: function (value) {
          console.log(value);
        }
      },
      picklists () {
        return this.$store.getters.dealPicklists;
      },
      rules () {

        return this.$store.getters.global.rules;
      }
    },
    methods: {
      save: function () {
        return this.$store.getters.global.rules.validate(this);

      }
    },
    created: function () {
      if(this.$route.params.id) {
        this.$store.dispatch('fetchDeal', this);
      }
    }
  }
</script>
