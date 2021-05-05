<template>
  <v-card>
    <v-card-title>
      Ograniczenia
    </v-card-title>
    <v-card-text>
      <v-row align="center" class="ma-1" v-for="i in m" v-bind:key="i">
        Ograniczenie {{ i }}
        <v-sheet class="align-center col-12" outlined>
          <Function class="ml-1 align-center" :variables="n" v-model="limitations[i-1]" :limitation="true">
          </Function>
        </v-sheet>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Function from "@/components/Function";

export default {
  name: "Limitations",
  components: {Function},
  props: {
    m: Number,
    n: Number,
    value: Array,
  },
  data: function () {
    return {
      limitations: [],
    };
  },
  watch: {
    limitations: function () {
      this.$emit("input", this.limitations)
    },
    value: function () {
      this.limitations = this.value;
    },
  }
}
</script>

<style scoped>

</style>
