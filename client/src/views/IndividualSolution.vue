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
        <ProgressHeader step=1></ProgressHeader>
      </div>
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="instructions-container">
      <div>
        <h2 class="mid-div-header">Dilema</h2>
        <div class="text-grid">
          <p>Vocês estão a realizar um projeto escolar. Para provar que a ideia do vosso projeto está correta, um de vós diz que precisam de alterar 5 dos 15 números que têm. Caso contrário, terão de recomeçar o projeto. Um de vós decide alterar esses 5 números, apesar de vocês pedirem para que não o faça.
            <br><br>Vocês acabam por aceitar a alteração desses números. O vosso professor descobre essa alteração e confronta-vos. O vosso professor diz-vos que, ou um de vós explica o que aconteceu ou todos terão nota negativa. O colega que alterou os números fica em silêncio.
          </p>
          <p>Vocês não querem ter uma nota negativa nem admitir que o vosso colega teve a ideia de alterar os números.
            <br><br>Que soluções propõem para lidar com uma situação em que, por um lado sabem que um amigo vosso falsificou dados, e por outro lado sentem um conflito em relação a denunciar essa ação?
          </p>
        </div>
      </div>
      <div class="bottom-stuff">
        <template v-if="sent == false">
          <v-textarea label="Como é que tu resolverias este problema?" no-resize outlined hide-details v-model="solution" class="text-input"></v-textarea>
          <DeButton class="button" label="Enviar" @pressed="sendSolution"></DeButton>
        </template>
        <span v-else class="wait-message">A aguardar as soluções dos teus colegas de grupo <span class="three-dots">{{threeDots}}</span></span>
      </div>
    </div>
    <Footer :items="items" :label="'Grupo ' + groupId"></Footer>
  </div>
</template>

<style scoped>
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
    width: 90%;
  }

  .mid-div-header {
    padding-left: 4vw;
    font-weight: 700;
    font-size: 1.5vw;
    margin-bottom: 25px;
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
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  div.text-grid > p {
    color: var(--app-main-blue);
    font-size: 1.1vw;
    font-weight: 600;
    padding-left: 4vw;
    padding-right: 4vw;
    margin-bottom: 30px;
    display: flex;
  }

  .bottom-stuff {
    display:flex;
    margin: 0 auto;
    width: 50vw;
  }
  .button {
    margin-left: 3vw;
  }
  .wait-message {
    text-align: center;
    padding-left: 4vw;
    font-weight: 700;
    font-size: 1.3vw;
    color: var(--app-main-blue);
  }
  .three-dots {
    color: var(--app-accent);
    font-weight: 700;
    font-size: 1.3vw;
  }

  .text-input {
    background-color: white;
  }
</style>

<script>
  import Footer from '@/components/Footer.vue';
  import DeButton from '@/components/DeButton.vue';
  import ProgressHeader from '@/components/ProgressHeader.vue';
  import http from "../http-common";
  import { bus } from '../main';

  export default {
    name: 'IndividualSolution',
    components: {
     Footer,
     DeButton,
     ProgressHeader
    },
    data: () => ({
      isMod: true,
      selectedModule: undefined,
      solution: '',
      items: [],
      roomId: '',
      groupId: '',
      sent: false,
      threeDots: '.',
      timeLeft: 3 * 60,
      totalTime: 3 * 60,
      timeLeftStr: ''
    }),
    mounted() {
      this.roomId = this.$route.params.roomId;
      this.groupId = +this.$route.params.groupId;
      if (this.roomId.length !== 6) this.$router.push(`/`);
      if (this.groupId < 0 ) this.$router.push(`/`);

      http.get(`/groups/${this.roomId}`).then(response => {
        if (response && response.data && response.data.length > 0) {
          this.items = response.data[this.groupId - 1].members;
        }
      }).catch(err => {
        console.log(err);
      });

      bus.$on('group-voting', (event) => {
        if (event && event.roomId === this.roomId) {
          this.$router.push(`/groups/group_voting/${this.roomId}/${this.groupId}`);
        }
      });

      setInterval(() => {if (this.threeDots.length < 3) {this.threeDots += '.'} else this.threeDots = '.'}, 750);

      setTimeout(() => {this.solution='Não respondeu'; this.sendSolution();}, this.totalTime * 1000);

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
    methods: {
      sendSolution: function() {
        // debugger; // eslint-disable-line no-debugger
        if (this.solution && this.solution.length > 5 && this.sent === false) {
          this.sendMessage(`individual-solution:${this.roomId}:${this.groupId-1}:${this.solution}`);
          this.sent = true;
        }
      },
      strPadLeft: function(minutes,seconds) {
        return (new Array(2+1).join('0')+minutes).slice(-2) + ':' + (new Array(2+1).join('0')+seconds).slice(-2);
      }
    }
  }
</script>
