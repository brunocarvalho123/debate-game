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
      <h2 class="mid-div-header">Dilema</h2>
      <div class="text-grid">
        <p>You and your peer are working in a school project. Your peer says that you will need to change 5 out 15 numbers to prove that the idea of your project is correct, otherwise you will need to re-do the entire work. Your peer changes those 5 numbers, although you ask them not to.</p>
        <p>You have accepted the change in those numbers. Your teacher finds out and confronts you and your peer. Your teacher tells you that either one of you speaks up or both will get a negative mark. Your peer keeps silent.</p>
        <p>You don’t want to get a negative mark neither to admit that your peer came up with the idea of changing those numbers.</p>
        <p>What solutions would you propose to deal with a situation, where you know that a friend faked data and you feel a conflict regarding reporting such misconduct action?</p>
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
    padding: 0vw 20vw 5vw 20vw;
    margin-top: 9vh;
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
