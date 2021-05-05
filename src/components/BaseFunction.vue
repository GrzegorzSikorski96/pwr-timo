<template>
  <v-card>
    <v-card-title class="ml-md-n2">
      Funkcja celu
    </v-card-title>

    <v-card-text>
      <Function :variables="variables" v-model="baseFunction">
        <template v-slot:before-function>
          max x<sub>0</sub><span class="mr-2">=</span>
        </template>
      </Function>
    </v-card-text>
  </v-card>
</template>

<script>
import Function from "@/components/Function";

export default {
  name: "BaseFunction",
  components: {Function},
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
