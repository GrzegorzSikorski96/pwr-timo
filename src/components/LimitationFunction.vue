<template>
  <v-row align="center" class="align-center">
    <slot name="before-function"></slot>
    <span v-for="i in variables" v-bind:key="i"
          class="d-flex float-left align-center pa-0 col-12 col-sm-12 col-md-2 col-lg-2 mt-2">
      <v-text-field v-model="limitation.variables[i-1]"
                    class="mx-0 px-0"
                    required
                    type="number"
      >
        <template slot="label">x<sub>{{ i }}</sub></template>
      </v-text-field>

      x<sub>{{ i }}</sub>

      <span v-if="i !== variables" class="mx-2">
        +
      </span>
    </span>

    <v-btn-toggle
        v-model="limitation.sign" class="col-12 col-sm-12 col-md-12 col-lg-12 px-0"
    >
      <v-btn class="mb-1" color="primary" outlined small value="leq">
        <v-icon color="primary">≤</v-icon>
      </v-btn>
      <v-btn class="mt-1" color="primary" outlined small value="geq">
        <v-icon color="primary">≥</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-text-field v-model="limitation.value"
                  class="mr-1 px-0 col-12 col-12 col-sm-12 col-md-12 col-lg-12 pb-0"
                  label="Wartość ograniczenia"
                  required
                  type="number"
    >
    </v-text-field>
  </v-row>
</template>

<script>


export default {
  name: "LimitationFunction",
  props: {
    variables: Number,
    value: Object,
  },
  data: () => ({
    limitation: {
      sign: "leq",
      variables: [],
      value: null,
    },
  }),
  watch: {
    'limitation.variables': function () {
      this.$emit("input", this.limitation);
    },
    value: function () {
      this.limitation = this.value;
    },
  }
}
</script>

<style scoped>
.v-btn-toggle {
  flex-direction: column;
}

</style>
