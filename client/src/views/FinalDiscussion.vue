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
        <ProgressHeaderFinals step=1></ProgressHeaderFinals>
      </div>
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="father-container">
      <div class="team-left">
        <h1 class="battle-header"><span class="header-team">Grupo 1</span></h1>
          <div v-for="(item) in group1" v-bind:key="item.id"
            :class="item.checked ? 'person selected-person' : 'person'" >
            {{item.name}}
          </div>
      </div>
      <div class="instructions-container middle-container">
        <div class="dilema-container">
          <h2 class="dilema-title">Dilema</h2>
          <div class="text-grid">
            <p>Vocês estão a realizar um projeto escolar. Para provar que a ideia do vosso projeto está correta, um de vós diz que precisam de alterar 5 dos 15 números que têm. Caso contrário, terão de recomeçar o projeto. Um de vós decide alterar esses 5 números, apesar de vocês pedirem para que não o faça.
              <br><br>Vocês acabam por aceitar a alteração desses números. O vosso professor descobre essa alteração e confronta-vos. O vosso professor diz-vos que, ou um de vós explica o que aconteceu ou todos terão nota negativa. O colega que alterou os números fica em silêncio.
            </p>
            <p>Vocês não querem ter uma nota negativa nem admitir que o vosso colega teve a ideia de alterar os números.
              <br><br>Que soluções propõem para lidar com uma situação em que, por um lado sabem que um amigo vosso falsificou dados, e por outro lado sentem um conflito em relação a denunciar essa ação?
            </p>
          </div>
        </div>
      </div>
      <div class="team-right">
        <h1 class="battle-header"><span class="header-team">Grupo 2</span></h1>
        <div v-for="(item) in group2" v-bind:key="item.id"
          :class="item.checked ? 'person selected-person' : 'person'" >
          {{item.name}}
        </div>
      </div>
    </div>
    <Footer :items="items" label="Participantes"></Footer>
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

  .text-grid {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  div.text-grid > p {
    color: var(--app-main-blue);
    font-size: 1.1vw;
    font-weight: 600;
    padding-left: 1.5vw;
    padding-right: 1.5vw;
    margin-bottom: 30px;
    display: flex;
  }

  .battle-header {
    margin-bottom: 6vh;
    display: flex;
    justify-content: center;
  }

  .battle-header span {
    font-weight: 700;
    font-size: 1.7vw;
  }

  .header-vs {
    color: var(--app-accent);
    margin: 0 3vw;
  }

  .dilema-title {
    padding-left: 1.5vw;
    font-weight: 700;
    font-size: 1.3vw;
    margin-bottom: 3.5vh;
  }

  .dilema-container {
    margin: 0 4vw;
  }

  .father-container {
    height: 81.7vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 12vw 76vw 12vw;
    align-items: center;
  }

  .middle-container {
    width: 76vw;
  }

  .team-left {
    width: 10vw;
    margin-left: 2vw;
  }

  .team-right {
    width: 10vw;
    margin-right: 2vw;
  }

  .person {
    background-color: var(--app-secondary-blue);
    padding: 2.5vh 4vw;
    font-weight: bold;
    margin: 3vh 0;
    border-radius: 1.5vh;
    display: flex;
    justify-content: center;
  }

  .selected-person {
    border: 3px solid var(--app-accent);
  }
</style>

<script>
  import Footer from '@/components/Footer.vue';
  import ProgressHeaderFinals from '@/components/ProgressHeaderFinals.vue';
  import http from "../http-common";
  import { bus } from '../main';

  export default {
    name: 'FinalDiscussion',
    components: {
     Footer,
     ProgressHeaderFinals
    },
    data: () => ({
      isMod: false,
      selectedModule: undefined,
      roomId: '',
      items: [],
      group1: [],
      group2: [],
      timeLeft: 5 * 60,
      totalTime: 5 * 60,
      timeLeftStr: ''
    }),
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

      http.get(`/groups/${this.roomId}`).then(response => {
        if (response && response.data && response.data.length > 0) {
          this.group1 = response.data[0].members;
          this.group1[0].checked = true;
          this.group2 = response.data[1].members;
          this.group2[0].checked = true;
        }
      }).catch(err => {
        console.log(err);
      });


      setTimeout(() => {this.goVoting()}, this.totalTime * 1000);

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
      goVoting: function() {
        this.$router.push(`/final_voting/${this.roomId}`);
      },
      strPadLeft: function(minutes,seconds) {
        return (new Array(2+1).join('0')+minutes).slice(-2) + ':' + (new Array(2+1).join('0')+seconds).slice(-2);
      }
    }
  }
</script>
