<template>
  <module>
    <v-icon slot="module-icon">assignment</v-icon>
    <v-toolbar-title slot="module-title">Install Information</v-toolbar-title>
    <v-spacer slot="module-spacer"></v-spacer>

    <v-form slot="module-content" ref="form">
      <v-layout column>

        <v-layout wrap justify-space-between>

          <v-flex>
            <v-select :items="picklists['Monitoring Level']" v-model="installInfo['Monitoring Level']"
                      label="Level of Service" autocomplete :rules="[rules.required]" required></v-select>
          </v-flex>

          <v-flex>
            <v-select :items="picklists['Package Type']" v-model="installInfo['Package Type']" label="Package"
                      autocomplete :rules="[rules.required]" required></v-select>
          </v-flex>

          <v-flex>
            <v-select :items="picklists['Monitoring Center']" v-model="installInfo['Monitoring Center']"
                      label="Central Station" autocomplete :rules="[rules.required]" required></v-select>
          </v-flex>

          <v-flex>
            <v-select :items="picklists['Panel Type']" v-model="installInfo['Panel Type']" label="Panel Type"
                      autocomplete :rules="[rules.required]" required></v-select>
          </v-flex>

        </v-layout>

        <v-divider></v-divider>

        <v-layout wrap justify-space-between>

          <v-flex>
            <v-text-field label="Codeword" :rules="[rules.passcode]" v-model="installInfo.Codeword"></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field label="Panel Phone" :rules="[rules.phone]" v-model="installInfo['Panel Phone']"></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field label="Panel Location" :rules="[rules.required]" required v-model="installInfo['Panel Location']"></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field label="Transformer Location" :rules="[rules.required]" required v-model="installInfo['Transformer Location']"></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field label="Cross Street" v-model="installInfo['Cross Street']"></v-text-field>
          </v-flex>

        </v-layout>

        <v-layout class="wrap justify-space-between pl-2 pr-2">

          <v-flex class="sm2 xs4">
            <p class="subheading pa-0 ma-0">Twoway</p>
            <v-checkbox class="pa-0 ma-0" v-model="installInfo['Two Way Voice']"></v-checkbox>
          </v-flex>

          <v-flex class="sm2 xs4">
            <p class="subheading pa-0 ma-0">Video+</p>
            <v-checkbox class="pa-0 ma-0" v-model="installInfo['ADC Video']" :disabled="installInfo['Skybell Only']"></v-checkbox>
          </v-flex>

          <v-flex class="sm2 xs4">
            <p class="subheading pa-0 ma-0">Skybell</p>
            <v-checkbox class="pa-0 ma-0" v-model="installInfo['Skybell Only']" :disabled="installInfo['ADC Video']"></v-checkbox>
          </v-flex>

        </v-layout>

      </v-layout>
    </v-form>

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
      installInfo () {
        return this.$store.getters.installInfo
      },
      global () {
        return this.$store.getters.global
      },
      picklists () {
        return this.$store.getters.dealPicklists;
      },
      rules () {
        return this.global.rules;
      }
    },
    created: function () {
      this.$store.dispatch('dealFields', this);
    },
    methods: {
      save: function () {
        return this.$store.getters.global.rules.validate(this);
      }
    }
  }
</script>
