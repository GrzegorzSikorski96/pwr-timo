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
          <span class="d-block" v-for="(row, key) in limitations" v-bind:key="key">
            <span v-for="(col, keyk) in row" v-bind:key="keyk">
              <span v-if="col">
                {{ col }}x<sub>{{ keyk + 1 }}</sub><span v-if="keyk !== row.length-1">+</span>
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
