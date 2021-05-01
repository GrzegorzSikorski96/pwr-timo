<template>
  <v-container>
    <v-row class="mt-2">
      <v-col class="col-6 col-sm-12 col-md-6">
        <Parameters v-model="parameters"></Parameters>
        <BaseFunction class="my-5" :variables="parameters.variables" v-model="base"></BaseFunction>
        <Limitations :m="parameters.limitations" :n="parameters.variables" v-model="limitations"></Limitations>
      </v-col>

      <v-col class="col-12 col-sm-12 col-md-6">
        <v-btn @click="createSimplexMatrix">Oblicz</v-btn>
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

export default {
  name: 'Home',
  components: {
    SimplexTable,
    BaseFunction,
    Limitations,
    Parameters,
  },
  data: () => ({
    parameters: {},
    base: [],
    limitations: [],
    iterations: {
      legends: [],
      tables: [],
    },
    matrix: [],
    render: false,
    legend: {
      rows: [],
      cols: [],
    },
  }),
  methods: {
    makeLegend: function (cols, rows) {
      for (let i = 0; i < cols; i++) {
        if (i === 0) {
          this.legend.cols[i] = "f(x)";
        } else {
          this.legend.cols[i] = i;
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
              matrix[i][j] = this.base[j - step];
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
      this.iterations.legends.push(this.legend);
      this.iterations.tables.push(this.tables);
    },
  },
}
</script>
