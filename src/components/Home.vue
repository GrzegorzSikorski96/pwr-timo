<template>
  <v-container>
    <v-row class="mt-2">
      <v-col class="col-12 col-sm-12 col-md-12 col-lg-6">
        <Parameters v-model="parameters"></Parameters>
        <BaseFunction v-model="base" :variables="parameters.variables" class="my-5"></BaseFunction>
        <Limitations v-model="limitations" :m="parameters.limitations" :n="parameters.variables"></Limitations>
      </v-col>

      <v-col class="col-12 col-sm-12 col-md-12 col-lg-6">
        <v-btn class="v-btn--block mb-2" @click="loadExample">Wczytaj testowe</v-btn>
        <v-btn class="v-btn--block mb-2" @click="clear">Czyść</v-btn>
        <v-btn class="v-btn--block mb-2" @click="createSimplexMatrix">Generuj tabele</v-btn>
        <v-btn class="v-btn--block mb-2" @click="run">Start</v-btn>
        <v-btn class="v-btn--block mb-2" @click="calculate()">Oblicz</v-btn>
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
import * as Examples from "@/helpers/examples"

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
        signs: [],
      }
    }],
    matrix: [],
    baseIndexes: [],
    render: false,
    counter: 0,
  }),
  methods: {
    calculate: function () {
      let column = Simplex.selectColumnInRow(this.iterations[this.iterations.length - 1].matrix);
      let row = Simplex.selectRow(this.iterations[this.iterations.length - 1].matrix, column);

      this.iterations.push({
        matrix: Gaussian.calculate(this.iterations[this.iterations.length - 1].matrix, row, column),
        legend: Simplex.changeLegendRowWithColumn(this.iterations[this.iterations.length - 1].legend, row, column)
      });
    },
    run: function () {
      this.clear();

      let tmp = Simplex.createSimplexMatrix(this.base, this.limitations, this.parameters.variables, this.parameters.limitations);
      this.baseIndexes = [...tmp.baseIndexes]
      let matrix = [...tmp.matrix];
      let legend = Matrix.makeLegend(matrix.length, matrix[0].length, Array.from(this.limitations.slice(0, this.parameters.limitations), x => x.sign));

      this.render = true;
      this.iterations[0] = {matrix: matrix, legend: legend};

      if (Simplex.hasMajorityRestrictions(this.iterations[this.iterations.length - 1].legend.signs)) {
        this.iterations.push(Object.assign({}, Simplex.changeMajoritySign(this.iterations[this.iterations.length - 1])));
      }

      while (Simplex.hasLowerThanZeroLimitation(this.iterations[this.iterations.length - 1].matrix) && !Simplex.emptySet(this.iterations[this.iterations.length - 1].matrix)) {
        let row = Simplex.lowestLimitationRowIndex(this.iterations[this.iterations.length - 1].matrix);
        let column = Simplex.selectColumnInRow(this.iterations[this.iterations.length - 1].matrix, row);

        this.iterations.push({
          matrix: Gaussian.calculate(this.iterations[this.iterations.length - 1].matrix, row, column),
          legend: Simplex.changeLegendRowWithColumn(this.iterations[this.iterations.length - 1].legend, row, column)
        });
      }

      if (Simplex.emptySet(this.iterations[this.iterations.length - 1].matrix)) {
        return Simplex.emptySet(this.iterations[this.iterations.length - 1].matrix);
      }

      while (!Simplex.SimplexEnd(this.iterations[this.iterations.length - 1])) {
        let column = Simplex.selectColumnInRow(this.iterations[this.iterations.length - 1].matrix);
        let row = Simplex.selectRow(this.iterations[this.iterations.length - 1].matrix, column);

        this.iterations.push({
          matrix: Gaussian.calculate(this.iterations[this.iterations.length - 1].matrix, row, column),
          legend: Simplex.changeLegendRowWithColumn(this.iterations[this.iterations.length - 1].legend, row, column)
        });
      }

      console.log(Simplex.SimplexEnd(this.iterations[this.iterations.length - 1]))
    },
    getLastIterationMatrix: function (){
      return this.iterations[this.iterations.length - 1].matrix;
    },
    async setParameters(variables, limitations) {
      this.parameters = {"variables": variables, "limitations": limitations};
    },
    async loadExample() {
      //let example = Examples.getRandomExample();
      let example = Examples.examples[this.counter];

      if(this.counter === Examples.examples.length - 1){
        this.counter = 0;
      } else{
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
