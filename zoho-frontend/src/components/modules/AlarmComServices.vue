<template>
 <module>
    <v-icon slot="module-icon">settings_cell</v-icon>

    <v-toolbar-title slot="module-title">Alarm Com Services</v-toolbar-title>

    <v-container slot="module-content" class="column">

      <v-layout v-if="alarmComServices.password || alarmComServices.username || alarmComServices['ADC Customer Id']">
        <v-flex>
          <v-container class="column">
            <v-subheader class="right" v-if="alarmComServices.username">{{ alarmcComServices.username }}</v-subheader>
            <v-subheader class="right" v-if="alarmComServices.password">{{ alarmComServices.password }}</v-subheader>
            <v-subheader class="right">{{ alarmComServices['ADC Customer Id'] }}</v-subheader>
          </v-container>
        </v-flex>
      </v-layout>

      <v-divider v-if="alarmComServices.password || alarmComServices.username || alarmComServices['ADC Customer Id']"></v-divider>

      <v-layout class="wrap justify-space-between">

        <v-flex>
          <v-form ref="form">
            <v-flex>
              <v-text-field name="ADC Serial Number" label="Serial Number" v-model="adcSerial" :counter="15" :rules="[rules.required, rules.adcSerial]" required></v-text-field>
            </v-flex>
          </v-form>
        </v-flex>

      </v-layout>
    </v-container>

   <v-spacer slot="module-spacer"></v-spacer>

   <v-btn slot="module-action" class="btn--flat green--text btn--large" v-if="!alarmComServices['ADC Customer Id']" @click="activate">Activate</v-btn>
   <template slot="module-action" v-else>
     <v-btn class="btn--flat blue--text btn--large" @click="replace">Replace</v-btn>
     <v-btn class="btn--flat red--text btn--large" @click="terminate">Terminate</v-btn>
   </template>
  </module>
</template>

<script>
  import module from '../partials/module.vue';

  export default {
    components: {
      module: module
    },
    computed: {
      alarmComServices: function () {
        return this.$store.getters.alarmComServices
      },
      adcSerial: {
        get: function () {
          return this.alarmComServices['ADC Serial Number'];
        },
        set: function (value) {
          this.$store.dispatch('updateADC', value);
        }
      },
      rules () {
        return this.$store.getters.global.rules;
      }
    },
    methods: {
      activate: function () {
      },
      terminate: function () {
      },
      replace: function () {
      }
    }
  }
</script>
