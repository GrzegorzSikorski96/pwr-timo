<template>
  <v-card>
    <v-card-title>
      Ograniczenia
    </v-card-title>
    <v-card-text>
      <v-row align="center" v-for="i in m" v-bind:key="i">
        Ograniczenie {{ i }}
        <v-sheet class="align-center my-2 col-12 py-2" outlined>
          <span v-for="j in n" v-bind:key="j"
                class="d-inline-flex float-left align-center pa-0 col-12 col-sm-12 col-md-3 col-lg-2">
            <VariableInput :number="j"></VariableInput>
            x<sub>{{ j }}</sub>
            <span class="mx-2" v-if="j !== n">
              +
            </span>
        </span>
        </v-sheet>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VariableInput from "@/components/VariableInput";

export default {
  name: "Limitations",
  components: {VariableInput},
  props: {
    m: Number,
    n: Number,
  }
}
</script>

<style scoped>

</style>
