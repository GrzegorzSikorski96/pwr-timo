<template>
  <v-card>
    <v-card-title>
      Funkcja celu
    </v-card-title>
    <v-card-text>
      <v-card-text class="text-subtitle-1">
        max<sub>0</sub> =
        <span v-for="(item, key) in base" v-bind:key="key">
          {{ item }}x<sub>{{ key + 1 }}</sub>
          <span v-if="key !== base.length-1">+</span>
        </span>
      </v-card-text>
    </v-card-text>

    <v-divider/>

    <v-card-title>
      Ograniczenia
    </v-card-title>
    <v-card-text>
      <v-card-text class="text-subtitle-1">
        <div v-for="(limitation, limitationKey) in limitations" :key="limitationKey">
        <span v-for="(variable, key) in limitation.variables" v-bind:key="key">
          {{ variable }}x<sub>{{ key + 1 }}</sub>
          <span v-if="key !== limitation.variables.length-1">+</span>
          <span v-else>
            {{ sign(limitation.sign) }} {{ limitation.value }}
          </span>
        </span>
        </div>
      </v-card-text>
    </v-card-text>
    <v-divider/>

    <template v-if="result.text.length">
      <v-card-title>
        Rozwiązanie
      </v-card-title>
      <v-card-text>
        <v-card-text class="text-subtitle-1">
          {{ result.text }}
          <template v-if="result.value">
            <div>x<sub>0</sub>={{ result.value }}</div>

            <div v-for="(value, key) in result.variables" :key="key">
              x<sub>{{ key + 1 }}</sub>={{ value }}
            </div>
          </template>
        </v-card-text>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "Summary",
  props: {
    base: Array,
    limitations: Array,
    result: Object,
  },
  methods: {
    sign(sign) {
      return sign ? (sign === "leq" ? "≤" : (sign === "geq" ? "≥" : null)) : null;
    }
  },
}
</script>

<style scoped>
.selected {
  background-color: yellow;
}
</style>
