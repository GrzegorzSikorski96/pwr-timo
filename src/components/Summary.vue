<template>
  <v-card>
    <v-card-text>
      <v-card>
        <v-card-title>
          Funkcja celu
        </v-card-title>
        <v-card-text>
          max<sub>0</sub> =
          <span v-for="(item, key) in base" v-bind:key="key">
          {{ item }}x<sub>{{ key + 1 }}</sub>
          <span v-if="key !== base.length-1">+</span>
        </span>
        </v-card-text>
      </v-card>

      <v-card class="mt-3">
        <v-card-title>
          Ograniczenia
        </v-card-title>
        <v-card-text>
          <span v-for="(row, key) in limitations" v-bind:key="key" class="d-block">
            <span v-for="(col, colKey) in row" v-bind:key="colKey">
              <span>
                <template v-if="colKey === row.length-1">
                  <template v-if="col === 'leq'">
                    ≤
                  </template>
                  <template v-else>
                    ≥
                  </template>
                </template>
                <template v-if="colKey === row.length">
                  {{ col }}
                </template>
                <template v-if="colKey < row.length-2">
                  {{ col }}x<sub>{{ colKey + 1 }}</sub><span v-if="colKey <= row.length-3">+</span>
                </template>
              </span>
            </span>
          </span>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Summary",
  props: {
    base: Array,
    limitations: Array,
  }
}
</script>

<style scoped>

</style>
