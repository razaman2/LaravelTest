<template>
  <v-alert error dismissible @input="onClose" :value="true">
    This is a success alert that is closable.
  </v-alert>
</template>

<script>
  export default {
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismissed');
      }
    }
  }
</script>
