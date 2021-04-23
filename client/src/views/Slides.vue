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
        <v-icon size="2.5vw" style="margin-top: -5px;" class="d-icon" @click="previousSlide">
          mdi-arrow-left-circle-outline
        </v-icon>
        Slide {{currentSlide}}/{{totalSlides}}
        <v-icon v-if="currentSlide < totalSlides" size="2.5vw" style="margin-top: -5px;" class="d-icon" @click="nextSlide">
          mdi-arrow-right-circle-outline
        </v-icon>
        <span class="continue-button" v-else @click="nextPage">
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
  import Footer from '@/components/Footer.vue'

  export default {
    name: 'Slides',
    components: {
     Footer
    },
    data: () => ({
      isMod: true,
      infoDialog: true,
      selectedModule: undefined,
      currentSlide: 1,
      totalSlides: 10,
      items: [{id:0, name:'Russell'},
              {id:1, name:'Cabrera'},
              {id:2, name:'Newton'},
              {id:3, name:'Mercer'},
              {id:4, name:'Hobbs'},
              {id:5, name:'Alvarez'},
              {id:6, name:'Hicks'},
              {id:7, name:'Puckett'},
              {id:8, name:'Mohammed'},
              {id:9, name:'Mullins'},
              {id:10, name:'Robson'},
              {id:11, name:'Dennis'},
              {id:12, name:'Montes'},
              {id:13, name:'Whittle'},
              {id:14, name:'Kaur'},
              {id:15, name:'Milne'},
              {id:16, name:'Oneal'},
              {id:17, name:'Rogers'},
              {id:18, name:'Stewart'},
              {id:19, name:'Kent'},
              {id:20, name:'Klein'},
              {id:21, name:'Rivers'},
              {id:22, name:'Keeling'},
              {id:23, name:'Beasley'},
              {id:24, name:'Markham'},
              {id:25, name:'Wolf'},
              {id:26, name:'Crawford'},
              {id:27, name:'Chang'},
              {id:28, name:'Henry'},
              {id:29, name:'Wilkerson'}]
    }),
    methods: {
      previousSlide: function() {
        if (this.currentSlide > 1) this.currentSlide--;
        // debugger; // eslint-disable-line no-debugger
        console.log('TODO');
      },
      nextSlide: function() {
        if (this.currentSlide < this.totalSlides) this.currentSlide++;
        // debugger; // eslint-disable-line no-debugger
        console.log('TODO');
      },
      nextPage: function() {
        // debugger; // eslint-disable-line no-debugger
        this.$router.push('/game_instructions');
      }
    }
  }
</script>
