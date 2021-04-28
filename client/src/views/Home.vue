<template>
  <div class="main-div">
    <div class="left-side">
      <div class="main-title">Jogo de debate</div>
      <div class="main-button new-game-button" @click="newGame()">
        <span>
          <v-icon size="2.5vw" class="b-icon" color="var(--app-background)">
            mdi-plus-circle-outline
          </v-icon>
          Criar novo jogo
        </span>
      </div>


      <div class="div-inline-flex">
        <v-text-field prepend-inner-icon="mdi-keyboard" filled color="var(--org-blue)" label="Insira o código de acesso" v-model="accessCode" @focus="focusInput"></v-text-field>
        <transition name="fade">
          <div key=1 v-if="joinNormal" class="main-button join-game-button" @click="joinGame()">
            <span>
              Juntar
            </span>
          </div>
        </transition>
      </div>

    </div>
    <div class="right-side">
      <img src="home_page_img.svg" class="home-img" alt="home page img">
    </div>
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
  .main-title {
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
    width: 20%;
    margin-left: 1vw;
    height: 6.5vh;
    width: 6vw;
    font-size: 1.2vw;
  }
  .home-img {
    width: 30vw;
    margin-right: 10vw;
  }
  .div-inline-flex {
    display: inline-flex;
    align-items: center;
  }

  .fade-enter-active,
  .fade-leave-active {
      transition: opacity .5s
  }
  .fade-enter,
  .fade-leave-to {
      opacity: 0
  }
</style>

<script>
  export default {
    name: 'Home',
    data: () => ({
      joinNormal: false,
      accessCode: ''
    }),
    methods: {
      newGame: function() {
        this.$router.push(`new_game`);
      },
      joinGame: function() {
        if (this.accessCode.length === 6)  {
          this.sendMessage(`join:${this.accessCode}:Rita`);
          this.$router.push(`waiting_room/${this.accessCode}/`);
        }
      },
      focusInput: function() {
        this.joinNormal = true;
      }
    }
}
</script>
