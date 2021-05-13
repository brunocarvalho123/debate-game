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
        <v-icon size="2.5vw" v-if="isMod" style="margin-top: -5px;" class="d-icon" @click="previousSlide">
          mdi-arrow-left-circle-outline
        </v-icon>
        Slide {{currentSlide}}/{{totalSlides}}
        <v-icon v-if="(currentSlide < totalSlides) && isMod" size="2.5vw" style="margin-top: -5px;" class="d-icon" @click="nextSlide">
          mdi-arrow-right-circle-outline
        </v-icon>
        <span class="continue-button" v-else-if="isMod" @click="nextPage">
          Continuar
        </span>
      </div>
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="slide-container">
      <img :src="slides[currentSlide-1]" class="slide-img" :alt="'slide' + currentSlide">
    </div>

    <Footer :items="items" label="Participantes"></Footer>
  </div>
</template>

<style scoped>
  .main-div {
    display: grid;
    /* grid-template-rows: 0.1fr 1fr; */
    height: 100vh;
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
  .continue-button {
    margin-left: 1vh;
    padding: 5px;
  }
  .continue-button:hover {
    cursor: pointer;
    color: var(--app-accent);
    text-decoration: underline;
  }

  .slide-container {
    margin: 0 auto;
    width: 83vw;
    height: 81.5vh;
    display: flex;
    justify-content: center;
    align-self: center;
    margin-bottom: 8.5vh;
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
      items: [],
      slides: ['https://i.gyazo.com/702626a7d41e244a77d02691b2fde65e.png',
               'https://i.gyazo.com/70d47e673f4319ca62c7556dc50d6354.png',
               'https://i.gyazo.com/37bbc4cc36c4d6d4278bee79d78ce7a6.png',
               'https://i.gyazo.com/b5ddab8fd6a908b530226bd8ceb769ee.png',
               'https://i.gyazo.com/fa23fafd4b6647e018e95c47d5d5c76a.png',
               'https://i.gyazo.com/9f2fabbd3bd2227d55276c278aed916d.png',
               'https://i.gyazo.com/1dd15bcc0a3f5000a0e2e137a4ca56dc.png',
               'https://i.gyazo.com/573b10715faab3ec07765d6754828c87.png',
               'https://i.gyazo.com/47d088a86a6d30df7bc65df05abc73e1.png',
               'https://i.gyazo.com/cb187313efe68dac8e7e94a27a1e9557.png']
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
