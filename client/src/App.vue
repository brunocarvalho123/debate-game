<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<style lang="scss">
  @import './theme/variables.css';
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--app-background);
  }
</style>
