<template>
  <v-container>
    <v-row>
      <v-col class="col-6 col-sm-12 col-md-6">
        <Parameters class="" v-model="parameters"></Parameters>
        <FunctionComponent class="mt-5" :variables="parameters.variables"></FunctionComponent>
      </v-col>

      <v-col class="col-12 col-sm-12 col-md-6">
      </v-col>
    </v-row>


  </v-container>
</template>

<script>
import Parameters from "@/components/Parameters";
import FunctionComponent from "@/components/FunctionComponent";

export default {
  name: 'Home',
  components: {
    FunctionComponent,
    Parameters,
  },
  data: () => ({
    parameters: {},
  }),
}
</script>
