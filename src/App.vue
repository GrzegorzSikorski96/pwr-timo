<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center font-weight-bold">
        Algorytm dwufazowy simpleks dla
        wektora x rzeczywistego – dla liniowego
        zadania PL
      </div>
    </v-app-bar>

    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
