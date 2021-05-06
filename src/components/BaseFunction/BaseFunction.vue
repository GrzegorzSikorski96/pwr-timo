<template>
    <span>
        <base-function-show v-if="!editBaseFunctionCard" :baseFunction="baseFunction"
                            @showEditBaseFunctionCard="baseFunctionEditModal"/>
        <base-function-edit v-else v-model="baseFunction" @showEditBaseFunctionCard="baseFunctionEditModal"/>
    </span>
</template>

<script>
import BaseFunctionShow from "./Show";
import BaseFunctionEdit from "./Edit";

export default {
  name: 'BaseFunction',
  components: {
    BaseFunctionShow,
    BaseFunctionEdit,
  },
  data: () => ({
    baseFunction: [],
    editBaseFunctionCard: false,
  }),
  methods: {
    baseFunctionEditModal(value) {
      this.editBaseFunctionCard = value
    },
  },
  created() {
    this.baseFunction = this.value
  },
  watch: {
    baseFunction: function () {
      this.$emit("input", this.baseFunction);
    },
  }
}
</script>

<style>
</style>
