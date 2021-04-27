<template>
  <v-card class="col-12 col-sm-12 col-md-6">
    <v-card-title class="ml-md-n2">
      Funkcja celu
    </v-card-title>

    <v-card-text>
      <v-form>
        <v-row align="center">
          max x<sub>0</sub>=
          <VariableInput v-for="i in variables" v-bind:key="i" :number="i" :last="i === variables"></VariableInput>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>

import VariableInput from "@/components/VariableInput";

export default {
  name: "FunctionComponent",
  components: {VariableInput},
  props: {
    variables: Number,
  },
  data: () => ({}),
}
</script>

<style scoped>

</style>
