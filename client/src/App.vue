<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<style lang="scss">
  @import './theme/variables.css';
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
  #app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--app-background);
  }
</style>
