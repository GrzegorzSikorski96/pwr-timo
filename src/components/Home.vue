<template>
  <v-container>
    <v-row class="mt-2">
      <v-col class="col-12 col-sm-12 col-md-12 col-lg-6">
        <Parameters v-model="parameters"></Parameters>
        <BaseFunction v-model="base" :variables="parameters.variables" class="my-5"></BaseFunction>
        <Limitations v-model="limitations" :m="parameters.limitations" :n="parameters.variables"></Limitations>
      </v-col>

      <v-col class="col-12 col-sm-12 col-md-12 col-lg-6">
        <v-btn class="v-btn--block mb-2" @click="loadTest">Wczytaj testowe</v-btn>
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
    render: false,
    legend: {
      rows: [],
      columns: [],
    },
  }),
  methods: {
    createSimplexMatrix: function () {
      this.render = false;

      console.log(this.limitations);

      let matrix = Simplex.createSimplexMatrix(this.base, this.limitations, this.parameters.variables, this.parameters.limitations);
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
    run: function () {
      this.clear();

      let matrix = Simplex.createSimplexMatrix(this.base, this.limitations, this.parameters.variables, this.parameters.limitations);
      let legend = Matrix.makeLegend(matrix.length, matrix[0].length, Array.from(this.limitations.slice(0, this.parameters.limitations), x => x.sign));
      this.render = true;
      this.iterations[0] = {matrix: matrix, legend: legend};

      if (Simplex.hasMajorityRestrictions(this.iterations[this.iterations.length - 1].legend.signs)) {
        this.iterations.push(Object.assign({}, Simplex.changeMajoritySign(this.iterations[this.iterations.length - 1])));
      }

      while (Simplex.hasLowerThanZeroLimitation(this.iterations[this.iterations.length - 1].matrix)) {
        let row = Simplex.lowestLimitationRowIndex(this.iterations[this.iterations.length - 1].matrix);
        let column = Simplex.selectColumnInRow(this.iterations[this.iterations.length - 1].matrix, row);

        this.iterations.push({
          matrix: Gaussian.calculate(this.iterations[this.iterations.length - 1].matrix, row, column),
          legend: Simplex.changeLegendRowWithColumn(this.iterations[this.iterations.length - 1].legend, row, column)
        });
      }

      while (!Simplex.SimplexEnd(this.iterations[this.iterations.length - 1].matrix)) {
        let column = Simplex.selectColumnInRow(this.iterations[this.iterations.length - 1].matrix);
        let row = Simplex.selectRow(this.iterations[this.iterations.length - 1].matrix, column);

        this.iterations.push({
          matrix: Gaussian.calculate(this.iterations[this.iterations.length - 1].matrix, row, column),
          legend: Simplex.changeLegendRowWithColumn(this.iterations[this.iterations.length - 1].legend, row, column)
        });
      }

      if (Simplex.unlimitedManySolutions(this.iterations[this.iterations.length - 1].matrix)){
        for(let i = 0; i < this.parameters.variables; i++){
          let column = Simplex.selectColumnInRow(this.iterations[this.iterations.length - 1].matrix);
          let row = Simplex.selectRow(this.iterations[this.iterations.length - 1].matrix, column);

          this.iterations.push({
            matrix: Gaussian.calculate(this.iterations[this.iterations.length - 1].matrix, row, column),
            legend: Simplex.changeLegendRowWithColumn(this.iterations[this.iterations.length - 1].legend, row, column)
          });
        }
      }

        console.log(Simplex.SimplexEnd(this.iterations[this.iterations.length - 1].matrix))

      // for (let i = 0; i < 2; i++) {
      //   let column = Simplex.selectColumnInRow(this.iterations[this.iterations.length - 1].matrix);
      //   let row = Simplex.selectRow(this.iterations[this.iterations.length - 1].matrix, column);
      //
      //   this.iterations.push({
      //     matrix: Gaussian.calculate(this.iterations[this.iterations.length - 1].matrix, row, column),
      //     legend: Simplex.changeLegendRowWithColumn(this.iterations[this.iterations.length - 1].legend, row, column)
      //   });
      // }

    },
    async setParameters() {
      // this.parameters = {"variables": 2, "limitations": 3};
      // this.parameters = {"variables": 2, "limitations": 2};
      // this.parameters = {"variables": 2, "limitations": 3};
      // this.parameters = {"variables": 2, "limitations": 4};
      this.parameters = {"variables": 2, "limitations": 3};
    }
    ,
    async loadTest() {
      // await this.setParameters().then(() => {
      //   this.base = [2, 1];
      //
      //   this.limitations = [{
      //     variables: [1, 1], sign: "geq", value: 5,
      //   }, {
      //     variables: [-1, 1], sign: "leq", value: 0,
      //   }, {
      //     variables: [6, 2], sign: "leq", value: 21,
      //   },
      //   ]
      // })

      // await this.setParameters().then(() => {
      //   this.base = [1, 2];
      //
      //   this.limitations = [{
      //     variables: [-2, 1], sign: "geq", value: 2,
      //   }, {
      //     variables: [1, -2], sign: "geq", value: 2,
      //   },
      //   ]
      // })

      // await this.setParameters().then(() => {
      //   this.base = [2100, 1200];
      //
      //   this.limitations = [{
      //     variables: [-2, 1], sign: "geq", value: 2,
      //   }, {
      //     variables: [1, -2], sign: "geq", value: 2,
      //   },
      //   ]
      // // })
      //
      // await this.setParameters().then(() => {
      //   this.base = [5, 8];
      //
      //   this.limitations = [{
      //     variables: [3, 2], sign: "geq", value: 3,
      //   }, {
      //     variables: [1, 4], sign: "geq", value: 4,
      //   }, {
      //     variables: [1, 1], sign: "leq", value: 5,
      //   },
      //   ]
      // // })
      //
      // await this.setParameters().then(() => {
      //   this.base = [1, 1];
      //
      //   this.limitations = [{
      //     variables: [1, 1], sign: "geq", value: 2,
      //   }, {
      //     variables: [-1, 1], sign: "leq", value: 1,
      //   }, {
      //     variables: [1, 0], sign: "geq", value: 0,
      //   }, {
      //     variables: [0, 1], sign: "geq", value: 0,
      //   },
      //   ]
      // })

      await this.setParameters().then(() => {
        this.base = [1, 6];

        this.limitations = [{
          variables: [2, 1], sign: "geq", value: 2,
        }, {
          variables: [-1, 1], sign: "leq", value: 3,
        }, {
          variables: [1, 1], sign: "leq", value: 6,
        },
        ]
      })
    }
    ,
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
