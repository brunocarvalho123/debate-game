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
        <v-icon size="2.5vw" :disabled="isMod == false" style="margin-top: -5px;" class="d-icon" @click="previousSlide">
          mdi-arrow-left-circle-outline
        </v-icon>
        Slide {{currentSlide}}/{{totalSlides}}
        <v-icon v-if="currentSlide < totalSlides" :disabled="isMod == false" size="2.5vw" style="margin-top: -5px;" class="d-icon" @click="nextSlide">
          mdi-arrow-right-circle-outline
        </v-icon>
        <span class="continue-button" v-else-if="isMod" @click="nextPage">
          Continuar
        </span>
      </div>
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
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
  .continue-button {
    margin-left: 1vh;
    padding: 5px;
  }
  .continue-button:hover {
    cursor: pointer;
    color: var(--app-accent);
    text-decoration: underline;
  }
</style>

<script>
  import http from "../http-common";
  import Footer from '@/components/Footer.vue'
  import { bus } from '../main';

  export default {
    name: 'Slides',
    components: {
     Footer
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
            const element = response.data[idx];
            this.items.push({id: idx, name: element});
          }
        }
      }).catch(err => {
        console.log(err);
      });

      bus.$on('next-slide', (event) => {
        if (event && event.roomId === this.roomId) {
          if (this.currentSlide < this.totalSlides) this.currentSlide++;
        }
      })

      bus.$on('previous-slide', (event) => {
        if (event && event.roomId === this.roomId) {
          if (this.currentSlide > 1) this.currentSlide--;
        }
      })

      bus.$on('start-game-instructions', (event) => {
        if (event && event.roomId === this.roomId) {
          this.$router.push(`/game_instructions/${this.roomId}`);
        }
      })
    },
    data: () => ({
      isMod: false,
      infoDialog: true,
      selectedModule: undefined,
      currentSlide: 1,
      totalSlides: 10,
      roomId: '',
      items: []
    }),
    methods: {
      previousSlide: function() {
        if (this.currentSlide > 1 && this.isMod) this.sendMessage(`previous-slide:${this.roomId}`);
      },
      nextSlide: function() {
        if (this.currentSlide < this.totalSlides && this.isMod) this.sendMessage(`next-slide:${this.roomId}`);
      },
      nextPage: function() {
        // debugger; // eslint-disable-line no-debugger
        if (this.totalSlides == this.currentSlide && this.isMod) {
          this.sendMessage(`start-game-instructions:${this.roomId}`);
        }
      }
    }
  }
</script>
