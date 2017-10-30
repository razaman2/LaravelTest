<template>
  <module>
    <v-icon slot="module-icon">account_circle</v-icon>

    <v-toolbar-title slot="module-title">Customer Information</v-toolbar-title>

    <v-container slot="module-content">
      <v-form ref="form">
        <v-layout column>

          <v-layout wrap justify-space-between>

            <v-flex>
              <v-text-field name="First Name" label="First Name" :rules="[rules.required]" required v-model="customerInfo['First Name']"></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field name="Last Name" label="Last Name" :rules="[rules.required]" required v-model="customerInfo['Last Name']"></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field name="Contact Phone" label="Phone" :rules="[rules.phone, rules.required]" required v-model="customerInfo['Contact Phone']"></v-text-field>
            </v-flex>

          </v-layout>

          <v-divider></v-divider>

          <v-layout wrap justify-space-between>

            <v-flex>
              <v-text-field name="Address" label="Address1" :rules="[rules.required]" required v-model="customerInfo.Address"></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field name="Address 2" label="Address2" v-model="customerInfo['Address 2']"></v-text-field>
            </v-flex>

          </v-layout>

          <v-layout wrap justify-space-between>

            <v-flex>
              <v-text-field name="City" label="City" :rules="[rules.required]" required v-model="customerInfo.City"></v-text-field>
            </v-flex>

            <v-flex v-if="customerInfo.Country === 'Canada'">
              <v-select name="Province" :items="picklists['State']" v-model="customerInfo.Province" label="Province" autocomplete :rules="[rules.required]" required></v-select>
            </v-flex>

            <v-flex v-else>
              <v-select name="State" :items="picklists['State']" v-model="customerInfo.State" label="State" autocomplete :rules="[rules.required]" required></v-select>
            </v-flex>

            <v-flex v-if="customerInfo.Country === 'Canada'">
              <v-text-field name="Postal Code" label="Postal Code" :rules="[rules.required]" required v-model="customerInfo.Postal"></v-text-field>
            </v-flex>

            <v-flex v-else>
              <v-text-field name="Zip" label="Zip Code" :rules="[rules.zip, rules.required]" required v-model="customerInfo.Zip"></v-text-field>
            </v-flex>

          </v-layout>

          <v-layout wrap justify-space-between>

            <v-flex v-if="customerInfo.Country !== 'Canada'">
              <v-text-field name="County" label="County" :rules="[rules.required]" required v-model="customerInfo.County"></v-text-field>
            </v-flex>

            <v-flex>
              <v-select name="Country" :items="picklists['Country']" v-model="customerInfo.Country" label="Country" autocomplete :rules="[rules.required]" required></v-select>
            </v-flex>

          </v-layout>

        </v-layout>
      </v-form>
    </v-container>

    <v-spacer slot="module-spacer"></v-spacer>

    <v-btn slot="module-action" class="green--text btn--large btn--flat" @click="save">Save</v-btn>
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
      global () {
        return this.$store.getters.global;
      },
      rules () {
        return this.global.rules;
      }
    },
    methods: {
      save: function () {
        let data = this.global.rules.validate(this);
        if(data) {
          this.$store.dispatch('updateDeal', {deal: data});
        }
      }
    }
  }
</script>
