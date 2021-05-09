<template>
  <v-card>
    <v-card-title class="ml-md-n2">
      Parametry funkcji
    </v-card-title>

    <v-card-text>
      <v-row class="justify-space-between" no-gutters>
        <v-card class="col-12 mb-2 col-sm-12 col-md-6 mb-sm-2 my-md-0 ml-md-n2 mr-md-2" flat outlined>
          <v-card-title>
            Ilość zmiennych
          </v-card-title>
          <v-card-text>
            <v-select v-model="parameters.variables" :items="[1, 2, 3, 4, 5]" @change="update"/>
          </v-card-text>
        </v-card>

        <v-card class="col-12 mt-2 col-sm-12 col-md-6 mt-sm-2 my-md-0 mr-md-n2 ml-md-2" flat outlined>
          <v-card-title>
            Ilość ograniczeń
          </v-card-title>
          <v-card-text>
            <v-select v-model="parameters.limitations" :items="[1, 2, 3, 4, 5]" @change="update"/>
          </v-card-text>
        </v-card>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Parameters',
  props: ['value'],
  data: () => ({
    parameters: {
      variables: 1,
      limitations: 1
    }
  }),
  created() {
    this.update();
  },
  methods: {
    update: function () {
      this.$emit("input", this.parameters)
    },
  },
  watch: {
    value: function (val) {
      this.parameters.variables = val.variables;
      this.parameters.limitations = val.limitations;
    },
  }
}
</script>

<style scoped>

</style>
