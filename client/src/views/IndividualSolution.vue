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
        <ProgressHeader step=1></ProgressHeader>
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
        <h2>Dilema</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus aliquam eleifend mi in nulla. Lacus sed viverra tellus in hac habitasse platea dictumst. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Ut eu sem integer vitae justo eget magna fermentum. Nulla aliquet enim tortor at auctor urna. Consequat semper viverra nam libero justo laoreet. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Molestie at elementum eu facilisis sed odio morbi quis. In iaculis nunc sed augue lacus viverra vitae congue eu. Dictum at tempor commodo ullamcorper a. Fermentum et sollicitudin ac orci. Risus viverra adipiscing at in. A diam maecenas sed enim ut sem viverra aliquet eget. Eget gravida cum sociis natoque penatibus et.</p>
        <p>Nulla pellentesque dignissim enim sit amet venenatis urna. Sagittis nisl rhoncus mattis rhoncus urna. Pellentesque sit amet porttitor eget dolor morbi non arcu. Vestibulum lorem sed risus ultricies tristique. Sapien pellentesque habitant morbi tristique senectus. Non quam lacus suspendisse faucibus interdum posuere lorem. Nec dui nunc mattis enim ut. Ac turpis egestas sed tempus urna et. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Auctor elit sed vulputate mi sit amet. Ut sem nulla pharetra diam.</p>
      </div>
      <div class="bottom-stuff">
        <v-textarea label="Como é que tu resolverias este problema?" no-resize outlined hide-details v-model="solution"></v-textarea>
        <DeButton class="button" label="Enviar" @pressed="startGame"></DeButton>
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
    color: var(--app-main-blue);
    font-size: 1.1vw;
    font-weight: 450;
    padding: 0vw 15vw 5vw 15vw;
  }
  .bottom-stuff {
    display:flex;
    padding: 0vw 20vw 5vw 20vw;
  }
  .button {
    margin-left: 3vw;
  }
</style>

<script>
  import Footer from '@/components/Footer.vue';
  import DeButton from '@/components/DeButton.vue';
  import ProgressHeader from '@/components/ProgressHeader.vue';

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
      startGame: function() {
        // debugger; // eslint-disable-line no-debugger
        this.$router.push('/game_groups');
      }
    }
  }
</script>
