<template>
  <v-row align="center" class="ml-1">
    <slot name="before-function"></slot>
    <span v-for="i in variables" v-bind:key="i"
          class="d-inline-flex float-left align-center pa-0 col-12 col-sm-12 col-md-5 col-lg-2">
            <VariableInput :number="i" v-model="values[i-1]"></VariableInput>
            x<sub>{{ i }}</sub>
            <span class="mx-2" v-if="i !== variables">
              +
            </span>
    </span>
    <template v-if="limitation" >
      leq
      <VariableInput v-model="values[variables]" class="align-center col-1"></VariableInput>
    </template>
  </v-row>
</template>

<script>
import VariableInput from "@/components/VariableInput";

export default {
  name: "Function",
  components: {VariableInput},
  props: {
    variables: Number,
    limitation: Boolean,
    value: Array,
  },
  data: () => ({
    values: [],
  }),
  watch: {
    values: function () {
      this.$emit("input", this.values);
    },
    value: function () {
      this.values = this.value;
    },
  }
}
</script>

<style scoped>

</style>
