<template>
  <div class="main-div">
    <div class="header-container">
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-home-outline
        </v-icon>
        <span class="icon-text">Início</span>
      </div>
      <div class="header-label">Criação de novo jogo</div>
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>


    <div class="father-container">
      <div class="team-left-1">
        <img src="pencils.svg" class="home-img" alt="">
      </div>
      <div class="instructions-container middle-container">
        <div class="mid-div">
          <v-select class="module-select" v-model="selectedModule" :items="modules" label="Selecione o módulo" outlined></v-select>
          <DeButton class="button" label="Criar jogo" @pressed="createRoom"></DeButton>
        </div>
      </div>
      <div class="team-right-1">
        <img src="books.svg" class="home-img" alt="">
      </div>
    </div>


  </div>
</template>

<style scoped>
  .icon-text {
    margin-left: 10px;
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
    margin-bottom: -35vh;
  }

  .father-container {
    height: 89.7vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 25vw 50vw 25vw;
    align-items: center;
  }

  .middle-container {
    width: 40vw;
  }

  .team-left-1 {
    width: 19vw;
    margin-left: 6vw;
    /* background-color: pink; */
    height: 100%;
    display: flex;
    align-items: flex-end;
    opacity: 50%;
  }

  .team-right-1 {
    width: 19vw;
    margin-right: 6vw;
    /* background-color: pink; */
    height: 100%;
    display: flex;
    align-items: flex-end;
    opacity: 50%;
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
      modules: ['Integrity - Animal Experimentation']
    }),
    methods: {
      makeId(length) {
        let result             = [];
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
      },
      createRoom: function() {
        // debugger; // eslint-disable-line no-debugger
        const roomId = this.makeId(6);
        this.sendMessage(`create:${roomId}:${this.modules.indexOf(this.selectedModule)}`);
        this.$router.push(`waiting_room/${roomId}`);
      }
    }
  }
</script>
