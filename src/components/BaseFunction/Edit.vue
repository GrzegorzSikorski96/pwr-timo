<template>
  <v-card class="ma-3 pa-1" :elevation="5">
    <v-card-title>
      Edycja funkcji celu

      <v-spacer/>

      <v-btn color="green" icon @click="updateBaseFunction">
        <font-awesome-icon icon="save" size="lg"/>
      </v-btn>

      <v-btn color="red" icon @click="changeEditState">
        <font-awesome-icon icon="times" size="lg"/>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field class="mx-0 px-0"
                      required
                      @change="catchChange($event, i)"
                      v-for="i in 5"
                      :key="i"
        >
          <template slot="label">x<sub>{{ i }}</sub></template>
        </v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Edit',
  data: () => ({
    baseFunction: [],
  }),
  methods: {
    catchChange: function (event, index){
      this.baseFunction[index-1] = Number(event)
    },
    updateBaseFunction() {
      this.$emit('input', this.baseFunction);
      this.changeEditState();
    },
    changeEditState() {
      this.$emit('showEditBaseFunctionCard', false)
    },
  },
}
</script>

<style>
</style>
