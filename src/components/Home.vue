<template>
  <v-container>
    <v-row class="mt-2">
      <v-col class="col-6 col-sm-12 col-md-6">
        <Parameters v-model="parameters"></Parameters>
        <BaseFunction class="my-5" :variables="parameters.variables" v-model="base"></BaseFunction>
        <Limitations :m="parameters.limitations" :n="parameters.variables" v-model="limitations"></Limitations>
      </v-col>

      <v-col class="col-12 col-sm-12 col-md-6">
        <v-btn @click="loadTest">Wczytaj testowe</v-btn>
        <v-btn @click="createSimplexMatrix">Generuj tabele</v-btn>
        <v-btn @click="calculate()">Oblicz</v-btn>
          <SimplexTable v-for="(iteration, key) in iterations" :key="key" :legend="iteration.legend"
                        :table="iteration.matrix">

          </SimplexTable>
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
    limitations: [],
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

      let matrix = Simplex.createSimplexMatrix(this.base, this.limitations, this.parameters);
      let legend = Matrix.makeLegend(matrix.length, matrix[0].length);

      this.iterations[0] = {matrix: matrix, legend: legend};
      //this.iterations.legend = legend;

      this.render = true;
    },
    calculate: function () {

      let column = Simplex.selectColumnInRow(this.iterations[this.iterations.length - 1].matrix);
      let row = Simplex.selectRow(this.iterations[this.iterations.length - 1].matrix, column);

      console.log(column);
      console.log(row);
      // this.gaussian(row, column);
      let nowsza = Gaussian.calculate(this.iterations[this.iterations.length - 1].matrix, row, column)
      this.iterations.push({
        matrix: nowsza,
        legend: Simplex.changeLegendRowWithColumn(this.iterations[this.iterations.length - 1].legend, row, column)
      })

      // this.createSimplexMatrix();
      //
      // let column = Simplex.selectColumnInRow(this.matrix);
      // let row = Simplex.selectRow(this.matrix, column);
      //
      // this.gaussian(row, column);
      // this.legend = Simplex.changeLegendRowWithColumn(this.legend, row, column);
    },
    gaussian: function (row, column) {
      let yrk = this.matrix[row][column]; //copy of value on selected cross. Remove after add reference to previous iteration
      let r = this.matrix[row]; //copy of values in of selected row for future calculations. Remove after add reference to previous iteration

      let c = []; //copy of values in of selected column for future calculations. Remove after add reference to previous iteration
      for (let i = 0; i < this.matrix.length; i++) {
        c[i] = this.matrix[i][column];
      }

      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[row].length; j++) {
          if (i !== row) {
            if (j !== column) {
              this.matrix[i][j] = Gaussian.outsideSelected(this.matrix[i][j], c[i], r[j], yrk);
            } else {
              this.matrix[i][j] = Gaussian.inColumn(this.matrix[i][j], yrk);
            }
          } else {
            if (j !== column) {
              this.matrix[i][j] = Gaussian.inRow(this.matrix[i][j], yrk);
            } else {
              this.matrix[i][j] = Gaussian.onCross(this.matrix[i][j]);
            }
          }
        }
      }
    },
    async setParameters() {
      this.parameters = {"variables": 2, "limitations": 3};
    },
    async loadTest() {
      await this.setParameters().then(() => {
        this.base = [2, 1];
        this.limitations = [[1, 1, 5], [-1, 1, 0], [6, 2, 21]];
      })
    },
  },
}
</script>
