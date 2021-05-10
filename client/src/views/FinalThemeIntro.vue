<template>
  <div class="main-div">
    <div class="top-div">
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-home-outline
        </v-icon>
        <span class="icon-text">Início</span>
      </div>
      <div class="top-label">
        Atividade prática - Explicação geral
      </div>
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="mid-div">
      <div class="text-grid">
        <div class="text-cell">
          <div class="text-cell-number">1</div>
          <div>O jogo é realizado através de equipas, que são geradas de forma aleatória.</div>
        </div>
        <div class="text-cell">
          <div class="text-cell-number">2</div>
          <div>Cada grupo vai ser colocado numa sala privada, onde lhe será apresentado uma dilema para o qual têm de arranjar uma solução.</div>
        </div>
        <div class="text-cell">
          <div class="text-cell-number">3</div>
          <div>Após x tempo, os grupos serão todos reunidos numa sala comum.</div>
        </div>
        <div class="text-cell">
          <div class="text-cell-number">4</div>
          <div>Na sala comum, cada grupo vai debater com o seu oponente.</div>
        </div>
        <div class="text-cell">
          <div class="text-cell-number">5</div>
          <div>Após cada debate, todos os participantes devem votar no grupo que defendeu melhor as suas ideias.</div>
        </div>
        <div class="text-cell">
          <div class="text-cell-number">6</div>
          <div>No final de todos os debates, serão apresentadas as classificações e ganha quem tiver o maior número de pontos.</div>
        </div>
      </div>
      <DeButton class="button" v-if="isMod" label="Começar jogo" @pressed="startGame"></DeButton>
    </div>
    <Footer :items="items" label="Participantes"></Footer>
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
  .top-label {
    margin: 4vh;
  }
  .icon-text {
    margin-left: 10px;
  }
  .top-buttons {
    margin: 4vh;
  }

  .b-icon {
    margin-bottom: 0.2vh;
  }
  .d-icon {
    margin-left: 1vh;
    margin-right: 1vh;
    color: var(--app-main-blue);
  }
  .d-icon:hover {
    cursor: pointer;
    color: var(--app-accent);
  }
  .mid-div {
    display: grid;
    justify-content: center;
    margin: auto;
  }
  .continue-button {
    margin-left: 1vh;
    padding: 5px;
  }
  .continue-button:hover {
    cursor: pointer;
    color: var(--app-accent);
    text-decoration: underline;
  }
  .text-grid {
    margin: -10vh auto auto auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
  }
  .text-cell {
    color: var(--app-main-blue);
    font-size: 1.2vw;
    font-weight: 600;
    padding-bottom: 6vh;
    padding-left: 4vw;
    padding-right: 4vw;
    display: flex;
  }

  .text-cell-number {
    font-size: 2.5vw;
    color: var(--app-accent);
    font-weight: 700;
    position: relative;
    top: -1vh;
    margin-right: 1.3vw;
  }

  .button {
    position: relative;
    bottom: -9vh;
  }
</style>

<script>
  import Footer from '@/components/Footer.vue';
  import DeButton from '@/components/DeButton.vue';
  import http from "../http-common";
  import { bus } from '../main';

  export default {
    name: 'FinalThemeIntro',
    components: {
     Footer,
     DeButton
    },
    mounted() {
      this.roomId = this.$route.params.roomId;
      if (this.roomId.length !== 6) this.$router.push(`/`);

      bus.$on('me-mod', (event) => {
        if (event && event.roomId === this.roomId) {
          this.isMod = true;
        }
      })

      http.get(`/users/${this.roomId}`).then(response => {
        if (response && response.data && response.data.length > 0) {
          this.items = [];
          for (let idx = 0; idx < response.data.length; idx++) {
            const element = response.data[idx];0
            this.items.push({id: idx, name: element});
          }
        }
      }).catch(err => {
        console.log(err);
      });

      bus.$on('start-game-groups', (event) => {
        if (event && event.roomId === this.roomId) {
          this.$router.push(`/game_groups/${this.roomId}`);
        }
      })
    },
    data: () => ({
      isMod: false,
      selectedModule: undefined,
      roomId: '',
      items: []
    }),
    methods: {
      startGame: function() {
        if (this.isMod) {
          this.sendMessage(`start-game-groups:${this.roomId}`);
        }
      }
    }
  }
</script>
