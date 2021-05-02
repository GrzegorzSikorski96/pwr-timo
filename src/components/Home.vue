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
        <SimplexTable v-if="render" :legend="legend" :table="matrix"></SimplexTable>
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
      variables: Number,
      limitation: Number,
    },
    base: [],
    limitations: [],
    matrix: [],
    render: false,
    legend: {
      rows: [],
      columns: [],
    },
  }),
  methods: {
    makeLegend: function (columns, rows) {
      for (let i = 0; i < columns; i++) {
        if (i === 0) {
          this.legend.columns[i] = "f(x)";
        } else {
          this.legend.columns[i] = i;
        }
      }

      for (let i = 0; i < rows; i++) {
        if (i === 0) {
          this.legend.rows[i] = "z";
        } else {
          this.legend.rows[i] = "U" + i;
        }
      }
    },
    createSimplexMatrix: function () {
      this.render = false;
      let matrix = new Array(this.parameters.limitations + 1).fill(0).map(() => new Array((this.parameters.variables * 2) + 1).fill(0))

      for (let i = 0; i < matrix.length; i++) {
        let step = 1;
        for (let j = 0; j < matrix[i].length; j++) {
          if (i === 0 && j === 0) {
            matrix[i][j] = 0;
          }

          if (j % 2 !== 0) {
            if (i === 0) {
              matrix[i][j] = -this.base[j - step];
              step++;
            } else {
              matrix[i][j] = this.limitations[i - 1][j - step];
              step++;
            }
          } else {
            if (j > 0) {
              matrix[i][j] = -matrix[i][j - 1];
            } else {
              if (i > 0) {
                matrix[i][j] = this.limitations[i - 1][this.parameters.variables];
              }
            }
          }
        }
      }

      this.makeLegend(matrix[0].length, matrix.length);
      this.matrix = matrix;
      this.render = true;
    },
    calculate: function () {
      this.createSimplexMatrix();
      let column = this.gaussianSelectColumn();
      let row = this.gaussianSelectRow(column);
      this.gaussian(row, column);
      this.changeLegendRowWithColumn(row, column);
    },
    gaussian: function (row, column) {
      let yrk = this.matrix[row][column];
      let r = this.matrix[row];

      let c = [];
      for (let i = 0; i < this.matrix.length; i++) {
        c[i] = this.matrix[i][column];
      }

      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[row].length; j++) {
          if (i !== row) {
            if (j !== column) {
              this.matrix[i][j] = Gaussian.outisdeSelected(this.matrix[i][j], c[i], r[j], yrk);
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
    gaussianSelectColumn() {
      let min = this.matrix[0][0];
      let column = 0;
      for (let i = 0; i < this.matrix.length; i++) {
        if (this.matrix[0][i] < min) {
          min = this.matrix[0][i];
          column = i;
        }
      }

      return column;
    },
    gaussianSelectRow(column) {
      let min = this.calculateRowValue(this.matrix[1][0], this.matrix[1][column]);
      let row = 1;

      for (let i = 1; i < this.matrix.length; i++) {
        if (this.calculateRowValue(this.matrix[i][0], this.matrix[i][column]) < min && this.calculateRowValue(this.matrix[i][0], this.matrix[i][column]) > 0) {
          min = this.calculateRowValue(this.matrix[i][0], this.matrix[i][column]);
          row = i;
        }
      }

      return row;
    },
    calculateRowValue(value, colValue) {
      return value / colValue;
    },
    changeLegendRowWithColumn(row, column) {
      let tmp = this.legend.rows[row];

      this.legend.rows[row] = this.legend.columns[column];
      this.legend.columns[column] = tmp;
    },
    loadTest: function () {
      this.parameters = {"variables": 2, "limitations": 3};

      this.base = [2, 1];
      this.limitations = [[1, 1, 5], [-1, 1, 0], [6, 2, 21]];
    },
  },
}
</script>
