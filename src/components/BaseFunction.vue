<template>
  <v-card>
    <v-card-title class="ml-md-n2">
      Funkcja celu
    </v-card-title>

    <v-card-text>
      <v-row align="center" class="align-center">
        max x<sub>0</sub><span class="mr-2">=</span>
        <span v-for="i in variables" v-bind:key="i"
              class="d-flex float-left align-center pa-0 col-12 col-sm-12 col-md-2 col-lg-2 mt-2">
          <v-text-field v-model="baseFunction[i-1]" :value="0" class="mx-0 px-0" required type="number">
            <template slot="label">x<sub>{{ i }}</sub></template>
          </v-text-field>
          x<sub>{{ i }}</sub>

          <span v-if="i !== variables" class="mx-2">
            +
          </span>
        </span>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: "BaseFunction",
  components: {},
  props: {
    variables: Number,
    value: Array,
  },
  data: () => ({
    baseFunction: [],
  }),
  watch: {
    baseFunction: function () {
      this.$emit("input", this.baseFunction);
    },
    value: function (val) {
      this.baseFunction = val;
    },
  }
}
</script>

<style scoped>

</style>
