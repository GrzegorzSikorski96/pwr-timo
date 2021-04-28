<template>
  <v-container>
    <v-row>
      <v-col class="col-6 col-sm-12 col-md-6">
        <Parameters v-model="parameters"></Parameters>
        <Function class="mt-5" :variables="parameters.variables" v-model="baseVariables" v-if="baseVariables"></Function>
      </v-col>

      <v-col class="col-12 col-sm-12 col-md-6">
        <Limitations :m="parameters.limitations" :n="parameters.variables"></Limitations>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Parameters from "@/components/Parameters";
import Function from "@/components/Function";
import Limitations from "@/components/Limitations";

export default {
  name: 'Home',
  components: {
    Limitations,
    Function,
    Parameters,
  },
  data: () => ({
    parameters: {},
    baseVariables: [],
    limitations: [],
  }),
}
</script>
