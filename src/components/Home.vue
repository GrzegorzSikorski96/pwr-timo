<template>
  <v-container>
    <v-row class="mt-2">
      <v-col class="col-6 col-sm-12 col-md-6">
        <Parameters v-model="parameters"></Parameters>
        <BaseFunction class="my-5" :variables="parameters.variables" v-model="base"></BaseFunction>
        <Limitations :m="parameters.limitations" :n="parameters.variables" v-model="limitations"></Limitations>
      </v-col>

      <v-col class="col-12 col-sm-12 col-md-6">
        <v-btn @click="loadTest" class="v-btn--block mb-2">Wczytaj testowe</v-btn>
        <v-btn @click="clear" class="v-btn--block mb-2">Czyść</v-btn>
        <v-btn @click="createSimplexMatrix" class="v-btn--block mb-2">Generuj tabele</v-btn>
        <v-btn @click="calculate()" class="v-btn--block mb-2">Oblicz</v-btn>
        <br>
        <template v-if="this.render">
          <div v-for="(iteration, key) in iterations" :key="key" class="mb-4">
            <div class="iteration-header d-flex">
              Iteracja {{ key + 1 }}
              <v-spacer/>
              Optymalna wartość: {{ iteration.matrix[0][0] }}
            </div>

            <SimplexTable :legend="iteration.legend" :table="iteration.matrix"/>
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Parameters from "@/components/Parameters";
import Limitations from "@/components/Limitations";
import BaseFunction from "@/components/BaseFunction";
import SimplexTable from "@/components/SimplexTable";
import * as Gaussian from "@/helpers/gaussian";
import * as Simplex from "@/helpers/simplex";
import * as Matrix from "@/helpers/matrix"

export default {
  name: 'Home',
  components: {
    SimplexTable,
    BaseFunction,
    Limitations,
    Parameters,
  },
  data: () => ({
    parameters: {
      variables: 1,
      limitations: 2,
    },
    base: [],
    limitations: [{
      sign: "leq",
      variables: [],
      value: {},
    }],
    iterations: [{
      matrix: [],
      legend: {
        rows: [],
        columns: [],
      }
    }],
    matrix: [],
    render: false,
    legend: {
      rows: [],
      columns: [],
    },
  }),
  methods: {
    createSimplexMatrix: function () {
      this.render = false;

      let matrix = Simplex.createSimplexMatrix(this.base, this.limitations);
      let legend = Matrix.makeLegend(matrix.length, matrix[0].length, Array.from(this.limitations, x => x.sign));

      this.iterations[0] = {matrix: matrix, legend: legend};

      this.render = true;
    },
    calculate: function () {
      let column = Simplex.selectColumnInRow(this.iterations[this.iterations.length - 1].matrix);
      let row = Simplex.selectRow(this.iterations[this.iterations.length - 1].matrix, column);

      this.iterations.push({
        matrix: Gaussian.calculate(this.iterations[this.iterations.length - 1].matrix, row, column),
        legend: Simplex.changeLegendRowWithColumn(this.iterations[this.iterations.length - 1].legend, row, column)
      });
    },
    async setParameters() {
      this.parameters = {"variables": 2, "limitations": 3};
    },
    async loadTest() {
      await this.setParameters().then(() => {
        this.base = [2, 1];

        this.limitations = [{
          variables: [1, 1], sign: "leq", value: 5,
        }, {
          variables: [-1, 1], sign: "leq", value: 0,
        }, {
          variables: [6, 2], sign: "leq", value: 21,
        },
        ]
      })
    },
    clear: function () {
      this.iterations = [{
        matrix: [],
        legend: {
          rows: [],
          columns: [],
        }
      }]
      this.render = false;
    }
  },
}
</script>

<style scoped>
.iteration-header {
  border-bottom: grey 2px solid;
}
</style>
