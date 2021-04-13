<template>
  <div class="main-div">
    <div class="side-div">
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-home-outline
        </v-icon>
        <span class="icon-text">Início</span>
      </div>
    </div>
    <div class="mid-div">

      <v-select class="module-select" :items="modules" label="Módulos disponíveis" outlined></v-select>
      <DeButton label="Criar jogo"></DeButton>
    </div>
    <div class="side-div">
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main-div {
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    height: 100vh
  }
  .side-div {
    display: flex;
    color: var(--app-main-blue);
    font-size: 1.6vw;
    font-weight: 450;
    justify-content: center;
  }
  .icon-text {
    margin-left: 10px;
  }
  .top-buttons {
    margin-top: 2vh;
  }
  .mid-div {
    display: grid;
    justify-content: center;
    margin: auto;
  }
  .module-select {
    width: 35vw;

  }
</style>

<script>
  import DeButton from '@/components/DeButton.vue'

  export default {
    name: 'NewGame',
    components: {
     DeButton
    },
    data: () => ({
      selectedModule: undefined,
      modules: ['Integrity - Animal Experimentation', 'Modulo 2', 'Modulo 3', 'Modulo 4']
    }),
    methods: {

    }
  }
</script>
