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
  </v-card>
</template>

<script>
export default {
  name: "Summary",
  props: {
    base: Array,
    limitations: Array,
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
