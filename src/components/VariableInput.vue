<template>
  <v-text-field class="mx-0 px-0"
                required
                v-model="x"
  >
    <template slot="label" v-if="number">x<sub>{{ number }}</sub></template>
  </v-text-field>
</template>

<script>
export default {
  name: "VariableInput",
  props: {
    number: Number,
    value: Number,
  },
  data: () => ({
    x: null,
  }),
  watch: {
    x: function (value) {
      this.$emit("input", Number(value));
    },
    value: function (val) {
      this.x = Number(val);
    },
  },
}
</script>

<style scoped>

</style>
