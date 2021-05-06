<template>
  <v-card class="ma-3 pa-1" :elevation="5">
    <v-card-title>
      Funkcja celu

      <v-spacer/>

      <v-btn icon @click="changeEditState" color="info">
        <font-awesome-icon icon="pen" size="lg"/>
      </v-btn>
    </v-card-title>

    <v-card-text>
      {{ baseFunction|json }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Show',
  props:{
    baseFunction: Array,
  },
  methods: {
    changeEditState() {
      this.$emit('showEditBaseFunctionCard', true)
    }
  },
}
</script>

<style>
</style>
