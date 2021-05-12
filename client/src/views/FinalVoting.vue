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
    <div class="instructions-container">
      <div class="g_rep_container">
        <p>Quem defendeu melhor a sua ideia?</p>
        <div class="person-container">
          <div v-for="(item) in groups" v-bind:key="item.id" @click="voteOnGroup" :rep-id="item.id"
            :class="item.selected ? 'person selected-person' : 'person'" >
            {{item.name}}
          </div>

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

  div.instructions-container p {
    margin: 0 2vw;
  }

  .person-container {
    display: flex;
  }

  .person {
    background-color: var(--app-secondary-blue);
    padding: 3vh 5vw;
    font-weight: bold;
    border-radius: 1.5vh;
    margin: 0 2vw;
  }

  .selected-person {
    border: 3px solid var(--app-accent);
  }

  .g_rep_container {
    display: grid;
    align-content: space-evenly;
    height: 50vh;
    font-size: 1.2vw;
    text-align: center;
  }
</style>

<script>
  import Footer from '@/components/Footer.vue';
  import ProgressHeaderFinals from '@/components/ProgressHeaderFinals.vue';
  import http from "../http-common";
  import { bus } from '../main';

  export default {
    name: 'FinalVoting',
    components: {
     Footer,
     ProgressHeaderFinals
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

      setTimeout(() => {this.goFinalResults()}, this.totalTime * 1000);

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
      isMod: false,
      selectedModule: undefined,
      roomId: '',
      items: [],
      groups: [{name: 'Grupo 1', id: 0, selected: false}, {name: 'Grupo 2', id: 1, selected: false}],
      timeLeft: 1 * 60,
      totalTime: 1 * 60,
      timeLeftStr: ''
    }),
    methods: {
      goFinalResults: function() {
        if (this.isMod) {
          this.$router.push(`/final_results/${this.roomId}`);
        }
      },
      strPadLeft: function(minutes,seconds) {
        return (new Array(2+1).join('0')+minutes).slice(-2) + ':' + (new Array(2+1).join('0')+seconds).slice(-2);
      },
      voteOnGroup: function(event) {
        const blah = event.target.getAttribute('rep-id');
        for (let idx = 0; idx < this.groups.length; idx++) {
          let ssss = this.groups;
          ssss[idx].selected = false;
          if (idx == blah) ssss[idx].selected = true;
          this.groups = JSON.parse(JSON.stringify(ssss));
        }
      }
    }
  }
</script>
