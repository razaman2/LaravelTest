<template>
  <v-container grid-list-xl>
    <CustomerInformation></CustomerInformation>
    <InstallInformation></InstallInformation>
    <TechStatus></TechStatus>
    <AlarmComServices></AlarmComServices>
  </v-container>
</template>

<script>
  import CustomerInformation from './modules/CustomerInformation.vue';
  import InstallInformation from './modules/InstallInformation.vue';
  import TechStatus from './modules/TechStatus.vue';
  import AlarmComServices from './modules/AlarmComServices.vue';

  export default {
    components: {
      CustomerInformation: CustomerInformation,
      InstallInformation: InstallInformation,
      TechStatus: TechStatus,
      AlarmComServices: AlarmComServices
    },
    created: function () {
      let companyId = this.$store.getters.global.companyId;
      this.$store.dispatch('dealFields');
      let id = this.$route.params.id;
      if(id) {
        this.$store.dispatch('updateDealId', id);
        this.$store.dispatch('fetchDeal');
      }
    }
  }
</script>
