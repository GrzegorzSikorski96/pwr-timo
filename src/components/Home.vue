<template>
  <v-container>
    <Parameters v-model="parameters"></Parameters>
    <FunctionComponent class="mt-5" :variables="parameters.variables"></FunctionComponent>
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
