<template>
  <v-card>
    <v-card-title class="ml-md-n2">
      Funkcja celu
    </v-card-title>

    <v-card-text>
      <v-form>
        <v-row align="center">
          max x<sub>0</sub><span class="mr-2">=</span>
          <span v-for="i in variables" v-bind:key="i"
                class="d-inline-flex float-left align-center pa-0 col-12 col-sm-12 col-md-3 col-lg-2">
            <VariableInput :number="i"></VariableInput>
            x<sub>{{ i }}</sub>
            <span class="mx-2" v-if="i !== variables">
              +
            </span>
          </span>
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
