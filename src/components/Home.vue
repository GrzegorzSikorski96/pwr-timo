<template>
  <v-container>
    <v-row class="mt-2">
      <v-col class="col-6 col-sm-12 col-md-6">
        <Parameters v-model="parameters"></Parameters>
        <BaseFunction class="my-5" :variables="parameters.variables" v-model="base"></BaseFunction>
        <Limitations :m="parameters.limitations" :n="parameters.variables" v-model="limitations"></Limitations>
      </v-col>

      <v-col class="col-12 col-sm-12 col-md-6">
        <Summary :base="base" :limitations="limitations"></Summary>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Parameters from "@/components/Parameters";
import Limitations from "@/components/Limitations";
import BaseFunction from "@/components/BaseFunction";
import Summary from "@/components/Summary";

export default {
  name: 'Home',
  components: {
    Summary,
    BaseFunction,
    Limitations,
    Parameters,
  },
  data: () => ({
    parameters: {},
    base: [],
    limitations: [],
  }),
}
</script>
