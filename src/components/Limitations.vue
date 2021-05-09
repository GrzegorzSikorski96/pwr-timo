<template>
  <v-card>
    <v-card-title>
      Ograniczenia
    </v-card-title>
    <v-card-text>
      <v-row v-for="i in m" v-bind:key="i" align="center" class="ma-1">
        Ograniczenie {{ i }}
        <v-sheet class="align-center col-12" outlined>
          <LimitationFunction v-model="limitations[i-1]" :limitation="true" :variables="n" class="mx-1 align-center"/>
        </v-sheet>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import LimitationFunction from "@/components/LimitationFunction";

export default {
  name: "Limitations",
  components: {LimitationFunction},
  props: {
    m: Number,
    n: Number,
    value: Array,
  },
  data: function () {
    return {
      limitations: [{
        sign: "leq",
        variables: [],
        value: null,
      }],
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
