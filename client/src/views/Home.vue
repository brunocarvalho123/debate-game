<template>
  <div class="main-div-home">
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
        <div class="join-btn-container">
          <v-icon size="2vw" class="kb-icon">mdi-keyboard</v-icon>
          <input class="join-btn-label" type="text" placeholder="Insira o código de acesso" size="25" v-model="accessCode" @focus="focusInput" name="asdasds">

          <!-- <v-text-field class="join-btn-label" prepend-inner-icon="mdi-keyboard" color="var(--org-blue)" label="Insira o código de acesso"  @focus="focusInput"></v-text-field> -->
        </div>
        <transition name="fade">
          <div key=1 v-if="joinNormal" class="join-game-button" @click="nameDialog=true">Juntar</div>
        </transition>
      </div>

    </div>
    <div class="right-side">
      <img src="home_page_img.svg" class="home-img" alt="home page img">
    </div>

    <v-dialog v-model="nameDialog" width="500">
      <v-card>
        <v-card-title class="headline">
          Nome:
        </v-card-title>
        <v-card-text>
          <v-text-field :name="Math.random()" color="var(--app-main-blue)" v-model=name></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="nameDialog=false">
            Cancelar
          </v-btn>
          <v-btn color="var(--app-accent)" text @click="joinGame()">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
  .main-div-home {
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
    width: 25vw;
    height: 8vh;
    border-radius: 10px;
    border: 2px solid var(--app-main-blue);
    font-size: 1.5vw;
    font-weight: 500;
    margin-bottom: 25px;
  }
  .main-button:hover {
    cursor: pointer;
  }
  .new-game-button {
    background-color: var(--app-main-blue);
    color: var(--app-background);
  }
  .join-game-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--app-background);
    color: var(--app-main-blue);
    width: 6vw;
    font-size: 1.2vw;
    border: none;
  }
  .join-game-button:hover {
    cursor: pointer;
  }
  .kb-icon {
    margin-left: 0.5vw;
  }
  .home-img {
    width: 26vw;
    margin-right: 10vw;
  }
  .div-inline-flex {
    display: inline-flex;
  }

  .join-btn-container {
    border: solid 1px black;
    border-radius: 10px;
    border: 2px solid var(--app-main-blue);
    width: 100%;
    height: 8vh;
  }

  .container-hr {
    width: 100%;
    background-color: var(--app-background);
    height: 5px;
    position: relative;
    top: -24px;
  }

  .join-btn-label {
    width: 15vw;
    font-size: 1.2vw;
    height: 7vh;
    margin-left: 0.5vw;
    outline: none;
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
      accessCode: '',
      nameDialog: false,
      name: ''
    }),
    methods: {
      newGame: function() {
        this.$router.push(`new_game`);
      },
      joinGame: function() {
        if (this.accessCode.length === 6 && this.name)  {
          this.sendMessage(`join:${this.accessCode}:${this.name}`);
          this.$router.push(`waiting_room/${this.accessCode}/`);
        }
      },
      focusInput: function() {
        this.joinNormal = true;
      }
    }
}
</script>
