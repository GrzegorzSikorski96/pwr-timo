<template>
  <v-text-field class="mx-0 px-0"
                required
  >
    <template slot="label">x<sub>{{ number }}</sub></template>
  </v-text-field>
</template>

<script>
export default {
  name: "VariableInput",
  props: {
    number: Number,
  }
}
</script>

<style scoped>

</style>
