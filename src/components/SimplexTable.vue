<template>
  <v-simple-table>
    <thead>
    <tr>
      <th></th>
      <th v-for="col in legend.columns" v-bind:key="col">
        <template v-if="col !== 'f(x)'">
          {{ col.substring(0, 1) }}<sub>{{ col.substring(1) }}</sub>
        </template>
        <template v-else>
          {{ col }}
        </template>
      </th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, index) in table" v-bind:key="index">
      <th>{{ legend.rows[index].substring(0, 1) }}<sub class="mr-0">{{ legend.rows[index].substring(1) }}</sub></th>
      <td v-for="(col, colIndex) in row" v-bind:key="colIndex">{{ col }}</td>
      <th>{{ sign(legend.signs[index]) }}</th>
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
  },
  methods: {
    sign(sign) {
      return sign ? (sign === "leq" ? "≤" : (sign === "geq" ? "≥" : null)) : null;
    }
  }
}
</script>

<style scoped>

</style>
