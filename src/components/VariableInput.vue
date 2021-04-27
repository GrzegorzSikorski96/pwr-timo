<template>
  <v-col cols="2" class="pa-0">
    <v-row align="center">
      <v-text-field class="col-9 mr-0 pr-0"
                    required
      >
        <template slot="label">x<sub>{{ number }}</sub></template>
      </v-text-field>
      <div>
        x<sub>{{ number }}</sub> <span v-if="!last">+</span>
      </div>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "VariableInput",
  props: {
    number: Number,
    last: Boolean,
  }
}
</script>

<style scoped>

</style>
