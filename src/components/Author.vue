<template>
  <v-dialog v-model="modal" max-width="800px" @click:outside="closeDialog()">
    <v-card>
      <v-card-title>
        Informacje o aplikacji
      </v-card-title>

      <v-card-text>
        Projekt wykonany w ramach kursu Teoria i Metody Optymalizacji.

        <br>
        <br>
        <strong>Uczelnia: </strong> Politechnika Wrocławska <br>
        <strong>Wdział: </strong> Wydział Elektroniki <br>
        <strong>Kierunek: </strong> Automatyka i robotyka <br>
        <strong>Tryb: </strong> Stacjonarny II stopnia <br>
        <strong>Kurs: </strong> Teoria i metody optymalizacji, TP 13<sup>15</sup>-15<sup>00</sup> <br>
        <strong>Temat projektu: </strong> Algorytm dwufazowy simpleks dla wektora x rzeczywistego – dla liniowego
        zadania PL <br>
        <strong>Autor: </strong> inż. Grzegorz Sikorski <br>
        <strong>Prowadząca: </strong> dr inż. Ewa Szlachcic

        <br>
        <br>

        Aplikacja rozwiązuje zadanie liniowego programowania w oparciu o dwufazowy
        algorytm simpleks. Po kliknięciu przycisku <strong>WCZYTAJ TESTOWE</strong> program załaduje przykładowe dane do
        aplikacji. Aby wczytać inne dane należy ponownie kliknąć przycisk bądź wprowadzić dane ręcznie. Jako wynik
        zwracane są poszczególne iteracje rozwiązywania zadania oraz informacja o wyniku algorytmu.
      </v-card-text>

      <v-card-actions>
        <v-btn text href="https://github.com/GrzegorzSikorski96/pwr-timo" target="__blank" outlined><v-icon>mdi-github</v-icon> Kod źródłowy</v-btn>
        <v-spacer/>
        <v-btn color="darken-1" text @click="closeDialog()">Anuluj</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Author',
  props: {
    modal: {},
  },
  methods: {
    closeDialog() {
      this.confirmation = '';
      this.$emit('modal', false)
    },
  },
}
</script>

<style>
</style>
