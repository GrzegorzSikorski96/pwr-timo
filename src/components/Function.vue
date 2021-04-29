<template>
  <v-row align="center">
    <slot name="before-function"></slot>
    <span v-for="i in variables" v-bind:key="i"
          class="d-inline-flex float-left align-center pa-0 col-12 col-sm-12 col-md-3 col-lg-2">
            <VariableInput :number="i" v-model="values[i-1]"></VariableInput>
            x<sub>{{ i }}</sub>
            <span class="mx-2" v-if="i !== variables">
              +
            </span>
    </span>
    <slot name="after-function"></slot>
  </v-row>
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
      values: [],
    };
  },
  watch: {
    values: function () {
      this.$emit("input", this.values);
    }
  }
}
</script>

<style scoped>

</style>
