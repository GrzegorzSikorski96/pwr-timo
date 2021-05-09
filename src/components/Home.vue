<template>
  <v-container>
    <v-row class="mt-2">
      <v-col class="col-12 col-sm-12 col-md-12 col-lg-6">
        <Parameters v-model="parameters"/>
        <BaseFunction v-model="base" :variables="parameters.variables" class="my-5"/>
        <Limitations v-model="limitations" :m="parameters.limitations" :n="parameters.variables"/>
      </v-col>

      <v-col class="col-12 col-sm-12 col-md-12 col-lg-6">
        <v-btn class="v-btn--block mb-2" @click="loadExample">Wczytaj testowe</v-btn>
        <v-btn class="v-btn--block mb-2" @click="clear">Czyść</v-btn>
        <v-btn class="v-btn--block mb-2" @click="calculate">Oblicz</v-btn>
        <br>
        <template v-if="iterations.length-1">
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
import * as Examples from "@/helpers/examples"
import * as Cases from "@/helpers/cases"

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
      value: Number,
    }],
    iterations: [{
      matrix: [],
      legend: {
        rows: [],
        columns: [],
        signs: [],
      }
    }],
    counter: 0,
  }),
  methods: {
    calculate: function () {
      this.clear();
      let matrix = Matrix.createSimplexMatrix(this.base, this.limitations, this.parameters.variables, this.parameters.limitations);

      this.iterations[0] = {
        matrix: matrix,
        legend: Matrix.makeLegend(matrix.length, matrix[0].length, Array.from(this.limitations.slice(0, this.parameters.limitations), x => x.sign))
      };

      if (Simplex.hasMajorityRestrictions(this.getLastLegend().signs)) {
        this.iterations.push(Object.assign({}, Simplex.changeMajoritySign(this.getLastIteration())));
      }

      while (Simplex.hasLowerThanZeroLimitation(this.getLastMatrix()) && !Cases.emptySet(this.getLastMatrix())) {
        let row = Simplex.lowestLimitationRowIndex(this.getLastMatrix());
        let column = Simplex.selectColumnInRow(this.getLastMatrix(), row);

        this.iterations.push({
          matrix: Gaussian.calculate(this.getLastMatrix(), row, column),
          legend: Matrix.changeLegendRowWithColumn(this.getLastLegend(), row, column)
        });
      }

      if (Cases.emptySet(this.getLastMatrix())) {
        return Cases.emptySet(this.getLastMatrix());
      }

      while (!Cases.SimplexEnd(this.getLastIteration())) {
        let column = Simplex.selectColumnInRow(this.getLastMatrix());
        let row = Simplex.selectRow(this.getLastMatrix(), column);

        this.iterations.push({
          matrix: Gaussian.calculate(this.getLastMatrix(), row, column),
          legend: Matrix.changeLegendRowWithColumn(this.getLastLegend(), row, column)
        });
      }

      console.log(Cases.SimplexEnd(this.getLastIteration()))
    },
    getLastMatrix() {
      return this.getLastIteration().matrix;
    },
    getLastLegend() {
      return this.getLastIteration().legend;
    },
    getLastIteration() {
      return this.iterations[this.iterations.length - 1];
    },
    async setParameters(variables, limitations) {
      this.parameters = {"variables": variables, "limitations": limitations};
    },
    async loadExample() {
      let example = Examples.examples[this.counter];

      if (this.counter === Examples.examples.length - 1) {
        this.counter = 0;
      } else {
        this.counter++;
      }

      await this.setParameters(example.parameters.variables, example.parameters.limitations).then(() => {
        this.base = example.base;
        this.limitations = example.limitations;
      });
    },
    clear: function () {
      this.iterations = [{
        matrix: [],
        legend: {
          rows: [],
          columns: [],
        }
      }]
    }
  },
}
</script>

<style scoped>
.iteration-header {
  border-bottom: grey 2px solid;
}
</style>
