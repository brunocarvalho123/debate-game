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
        <v-icon size="2.5vw" style="margin-top: -5px;" class="d-icon" @click="nextSlide">
          mdi-arrow-right-circle-outline
        </v-icon>
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
      items: [{id:0, name:'Pedro'},
              {id:1, name:'Mario'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'GandaMarioXDDDDDDs'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:2, name:'Joana'},
              {id:3, name:'Antunes'}]
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
      }
    }
  }
</script>
