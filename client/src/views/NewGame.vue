<template>
  <div class="main-div">
    <div class="top-div">
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-home-outline
        </v-icon>
        <span class="icon-text">Início</span>
      </div>
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="mid-div">
      <v-select class="module-select" v-model="selectedModule" :items="modules" label="Módulos disponíveis" outlined></v-select>
      <DeButton class="button" label="Criar jogo" @pressed="createRoom"></DeButton>
    </div>
  </div>
</template>

<style scoped>
  .main-div {
    display: grid;
    grid-template-rows: 0.1fr 1fr;
    height: 100vh;
  }
  .top-div {
    height: 11vh;
    display: flex;
    color: var(--app-main-blue);
    font-size: 1.6vw;
    font-weight: 450;
    justify-content: space-between;
    box-shadow: 0 4px 6px -6px #222;
  }
  .icon-text {
    margin-left: 10px;
  }
  .top-buttons {
    margin: 4vh;
  }
  .mid-div {
    display: grid;
    justify-content: center;
    margin: auto;
  }
  .module-select {
    width: 35vw;
    margin-top: -12vh !important;
  }
  .button {
    margin-bottom: -30vh;
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
      createRoom: function() {
        // debugger; // eslint-disable-line no-debugger
        this.$router.push(`waiting_room/${this.modules.indexOf(this.selectedModule)}`);
      }
    }
  }
</script>
