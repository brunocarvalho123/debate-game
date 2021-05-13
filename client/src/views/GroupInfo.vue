<template>
  <div class="main-div">
    <div class="header-container">
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-timer-sand
        </v-icon>
        <span class="icon-text">{{timeLeftStr}}</span>
      </div>
      <div class="header-label">
        <ProgressHeader step=0></ProgressHeader>
      </div>
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="instructions-container">
      <div class="instructions-grid">
        <div class="instructions-text-cell">
          <div class="text-cell-number hide-number">0</div>
          <div>Bem vindos à sala do vosso grupo! Dentro de 3 minutos, vai aparecer um dilema no ecrã. O objetivo é que vocês arranjem uma solução para este problema. Esta atividade está dividida em várias fases:</div>
        </div>
        <div class="instructions-text-cell">
          <div class="text-cell-number">3</div>
          <div>Na fase de discussão, vão ter os vossos microfones ligados. Serão apresentadas as duas propostas com mais votos, e devem decidir entre vocês uma solução final. Podem modificar as ideias como quiserem.</div>
        </div>
        <div class="instructions-text-cell">
          <div class="text-cell-number">1</div>
          <div>No início vão estar todos com o microfone desligado, e cada um deve escrever a solução que achar melhor. Esta resposta é anónima.</div>
        </div>
        <div class="instructions-text-cell">
          <div class="text-cell-number">4</div>
          <div>No fim, devem votar num colega que será o representante do grupo no debate final em frente à turma.</div>
        </div>
        <div class="instructions-text-cell">
          <div class="text-cell-number">2</div>
          <div>Quando acabar o tempo, começa a fase de votação. Aqui cada um deve votar nas ideias que achar melhor.</div>
        </div>
      </div>
    </div>
    <Footer :items="items" :label="'Grupo ' + groupId"></Footer>
  </div>
</template>

<style scoped>
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

  .text-cell-number {
    font-size: 2.5vw;
    color: var(--app-accent);
    font-weight: 700;
    position: relative;
    top: -1vh;
    margin-right: 1.3vw;
  }

  .hide-number {
    color: var(--app-background);
  }

  .button {
    position: relative;
    bottom: -6vh;
  }
</style>

<script>
  import Footer from '@/components/Footer.vue';
  import ProgressHeader from '@/components/ProgressHeader.vue';
  import http from "../http-common";

  export default {
    name: 'GroupInfo',
    components: {
     Footer,
     ProgressHeader
    },
    mounted() {
      this.roomId = this.$route.params.roomId;
      this.groupId = +this.$route.params.groupId + 1;
      if (this.roomId.length !== 6) this.$router.push(`/`);
      if (this.groupId < 0 ) this.$router.push(`/`);

      http.get(`/groups/${this.roomId}`).then(response => {
        if (response && response.data && response.data.length > 0) {
          this.items = response.data[this.groupId - 1].members;
        }
      }).catch(err => {
        console.log(err);
      });


      setTimeout(() => {this.startGame()}, this.totalTime * 1000);

      setInterval(() => {
                          if (this.timeLeft > 0)
                            this.timeLeft--;
                          else
                            return;

                          if (this.timeLeft >= 225 && this.timeLeft < 230) {
                            this.step = 2;
                          } else if (this.timeLeft >= 220 && this.timeLeft < 225) {
                            this.step = 3;
                          } else if (this.timeLeft < 220) {
                            this.step = 4;
                          }
                          const minutes = Math.floor(this.timeLeft/60);
                          const seconds = this.timeLeft - minutes * 60;
                          this.timeLeftStr = this.strPadLeft(minutes,seconds);
                        }, 1000);
    },
    data: () => ({
      items: [],
      roomId: '',
      groupId: '',
      timeLeft: 2 * 60,
      totalTime: 2 * 60,
      timeLeftStr: ''
    }),
    methods: {
      startGame: function() {
        this.$router.push(`/groups/individual_solution/${this.roomId}/${this.groupId}`);
      },
      strPadLeft: function(minutes,seconds) {
        return (new Array(2+1).join('0')+minutes).slice(-2) + ':' + (new Array(2+1).join('0')+seconds).slice(-2);
      }
    }
  }
  //aqui
</script>
