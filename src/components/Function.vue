<template>
  <v-card>
    <v-card-title class="ml-md-n2">
      Funkcja celu
    </v-card-title>

    <v-card-text>
      <v-row align="center">
        max x<sub>0</sub><span class="mr-2">=</span>
        <span v-for="i in variables" v-bind:key="i"
              class="d-inline-flex float-left align-center pa-0 col-12 col-sm-12 col-md-3 col-lg-2">
            <VariableInput :number="i" v-model="baseVariables[i-1]"></VariableInput>
            x<sub>{{ i }}</sub>
            <span class="mx-2" v-if="i !== variables">
              +
            </span>
        </span>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VariableInput from "@/components/VariableInput";

export default {
  name: "Function",
  components: {VariableInput},
  props: {
    variables: Number,
  },
  data: function () {
    return {
      baseVariables: [],
    };
  },
  watch: {
    baseVariables: function () {
      this.$emit("input", this.baseVariables);
    }
  }
}
</script>

<style scoped>

</style>
