<template>
  <v-simple-table>
    <thead>
    <tr>
      <th></th>
      <th v-for="col in legend.cols" v-bind:key="col">
        <template v-if="col !== 'f(x)'">
          x<sub>{{ col }}</sub>
        </template>
        <template v-else>
          {{ col }}
        </template>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, index) in table" v-bind:key="index">
      <th>{{ legend.rows[index] }}</th>
      <td v-for="(col, colIndex) in row" v-bind:key="colIndex">{{ col }}</td>
    </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  name: "SimplexTable",
  props: {
    legend: Object,
    table: Array,
  }
}
</script>

<style scoped>

</style>
