<template>
  <div class="main-div">
    <div class="header-container">
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-home-outline
        </v-icon>
        <span class="icon-text">Início</span>
      </div>
      <div class="header-label">
        <ProgressHeaderFinals step=2></ProgressHeaderFinals>
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
        <img src="confetti_esq.svg" class="home-img" alt="">
      </div>
      <div class="instructions-container middle-container">
        <div class="g_rep_container">
        <p id="winner-text">O vencedor é:</p>
        <div ref="pCont" class="person-container">
          <img src="light_crown.svg" class="crown-img" alt="">
          <div class="person">Grupo 2</div>
        </div>
      </div>
      </div>
      <div class="team-right">
        <img src="confetti_right.svg" class="home-img" alt="">
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
    position: relative;
    transition: transform 500ms ease-in-out;
    transform: scale(0.2);
  }

  .person-container-bigger {
    transform: scale(1.2);
  }

  .person-container-bigger-bigger {
    transform: scale(1.5);
  }

  .home-img {
    visibility: hidden;
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
    color: var(--app-main-blue);
  }

  #winner-text {
    font-weight: 600;
    font-size: 1.5vw;
    margin-bottom: 5vh;
  }

  .father-container {
    height: 89.7vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 37.5vw 25vw 37.5vw;
    align-items: center;
  }

  .middle-container {
    width: 25vw;
  }

  .team-left {
    width: 34.5vw;
    margin-left: 3vw;
    /* background-color: pink; */
    height: 100%;
    display: flex;
    opacity: 50%;
  }

  .team-right {
    width: 34.5vw;
    margin-right: 3vw;
    /* background-color: pink; */
    height: 100%;
    display: flex;
    opacity: 50%;
  }

  .team-left img, .team-right img {
    /* background-color: pink; */
    position: relative;
    bottom: 15vh;
  }

  .crown-img {
    position: absolute;
    width: 7vw;
    top: -6.3vh;
  }
</style>

<script>
  import VueConfetti from 'vue-confetti'
  import Vue from 'vue'

  import Footer from '@/components/Footer.vue';
  import ProgressHeaderFinals from '@/components/ProgressHeaderFinals.vue';
  import http from "../http-common";
  import { bus } from '../main';

  Vue.use(VueConfetti);

  export default {
    name: 'FinalResults',
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

      bus.$on('start-game-groups', (event) => {
        if (event && event.roomId === this.roomId) {
          this.$router.push(`/game_groups/${this.roomId}`);
        }
      })



      this.$confetti.start();
                         this.$confetti.update({
                          particles: [
                            {
                              type: 'rect',
                            },
                            {
                              type: 'circle',
                            },
                          ],
                          defaultSize: 5,
                          defaultColors: [
                            '#0f2b46',
                            '#f46f52',
                            '#d2e1e8'
                          ],
                          });


      setTimeout(() => { this.$refs.pCont.classList.add('person-container-bigger-bigger'); }, 100);
      setTimeout(() => { this.$refs.pCont.classList.remove('person-container-bigger-bigger');
                         this.$refs.pCont.style.transition = 'transform 200ms ease-in-out';
                         this.$refs.pCont.classList.add('person-container-bigger');
                         }, 600);

      setTimeout(() => {
        this.$confetti.stop();
      }, 5000);
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
