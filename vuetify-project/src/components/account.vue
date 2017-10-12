<template>
  <v-container grid-list-xl>
    <CustomerInformation></CustomerInformation>
    <InstallInformation></InstallInformation>
    <TechStatus></TechStatus>
  </v-container>
</template>

<script>
  import CustomerInformation from './modules/CustomerInformation.vue';
  import InstallInformation from './modules/InstallInformation.vue';
  import TechStatus from './modules/TechStatus.vue';

  export default {
    components: {
      CustomerInformation: CustomerInformation,
      InstallInformation: InstallInformation,
      TechStatus: TechStatus
    }
  }
</script>
