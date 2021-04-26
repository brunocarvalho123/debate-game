<template>
  <div class="main-div">
    <div class="left-side">
      <div class="title">Nome do jogo</div>
      <div class="main-button new-game-button" @click="newGame()">
        <span>
          <v-icon size="2.5vw" class="b-icon" color="var(--app-background)">
            mdi-plus-circle-outline
          </v-icon>
          Criar novo jogo
        </span>
      </div>
      <div class="main-button join-game-button" @click="joinGame()">
        <span>
          <v-icon size="2.5vw" class="b-icon" color="var(--app-main-blue)">
            mdi-keyboard
          </v-icon>
          Insira o código de acesso
        </span>
      </div>
    </div>
    <div class="right-side"></div>
  </div>
</template>


<style scoped>
  .main-div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh
  }
  .left-side {
    display: grid;
    justify-content: center;
    margin: auto;
    width: 100%;
  }
  .right-side {
    display: grid;
    justify-content: center;
    margin: auto;
    width: 100%;
  }
  .title {
    color: var(--app-main-blue);
    font-size: 3vw;
    font-weight: 550;
    margin-bottom: 55px;
  }
  .b-icon {
    margin-right: 10px;
  }
  .main-button {
    display: inline-grid;
    justify-items: center;
    align-items: center;
    width: 28vw;
    height: 9.5vh;
    border-radius: 10px;
    border: 2px solid var(--app-main-blue);
    font-size: 1.8vw;
    font-weight: 500;
    margin-bottom: 35px;
  }
  .main-button:hover {
    cursor: pointer;
  }
  .new-game-button {
    background-color: var(--app-main-blue);
    color: var(--app-background);
  }
  .join-game-button {
    background-color: var(--app-background);
    color: var(--app-main-blue);
  }
</style>


<script>
  export default {
    name: 'Home',
    methods: {
      newGame: function() {
        this.$router.push(`new_game`);
      },
      joinGame: function() {
        this.$router.push(`waiting_room/1`);
      }
    }
}
</script>
