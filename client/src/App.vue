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

  * {
    font-weight: 600;
  }

  .header-container {
    height: 10.3vh;
    display: flex;
    color: var(--app-main-blue);
    font-size: 1.6vw;
    font-weight: 450;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0px 15px 5px rgb(0, 0, 0, 10%);
    z-index: 1;
  }

  .header-buttons, .header-label {
    margin: 0 4vh;
  }

  .instructions-container {
    display: grid;
    align-content: space-evenly;
    height: 81.7vh;
    width: 84.3vw;
    margin: 0 auto;
    justify-content: center; // ver se isto estraga outras paginas
  }

  .instructions-grid {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 9.5vw;
    grid-row-gap: 8vh;
  }

  .instructions-text-cell {
    color: var(--app-main-blue);
    font-size: 1.2vw;
    font-weight: 600;
    display: flex;
  }

  .main-div {
    display: grid;
    grid-template-rows: 0.1fr 1fr;
    height: 100vh;
  }
</style>
