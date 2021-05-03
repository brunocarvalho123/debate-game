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
        <ProgressHeader step=0></ProgressHeader>
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
        <div class="text-cell">
          <div class="text-cell-number hide-number">0</div>
          <div>Bem vindos à sala do vosso grupo! Dentro de 3 minutos, vai aparecer um dilema no ecrã. O objetivo é que vocês arranjem uma solução para este problema. Esta atividade está dividida em várias fases:</div>
        </div>
        <div class="text-cell">
          <div class="text-cell-number">1</div>
          <div>No início vão estar todos com o microfone desligado, e cada um deve escrever a solução que achar melhor. Esta resposta é anónima.</div>
        </div>
        <div class="text-cell">
          <div class="text-cell-number">2</div>
          <div>Quando acabar o tempo, começa a fase de votação. Aqui cada um deve votar nas ideias que achar melhor.</div>
        </div>
        <div class="text-cell">
          <div class="text-cell-number">3</div>
          <div>Na fase de discussão, vão ter os vossos microfones ligados. Serão apresentadas as duas propostas com mais votos, e devem decidir entre vocês uma solução final. Podem modificar as ideias como quiserem.</div>
        </div>
        <div class="text-cell">
          <div class="text-cell-number">4</div>
          <div>No fim, devem votar num colega que será o representante do grupo no debate final em frente à turma.</div>
        </div>
      </div>
      <DeButton class="button" label="Continuar" @pressed="startGame"></DeButton>
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
    margin: -10vh auto auto auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
  }
  .text-cell {
    color: var(--app-main-blue);
    font-size: 1.2vw;
    font-weight: 600;
    padding-bottom: 6vh;
    padding-left: 4vw;
    padding-right: 4vw;
    display: flex;
  }

  .text-cell-number {
    font-size: 2.5vw;
    color: var(--app-accent);
    font-weight: 700;
    position: relative;
    top: -1vh;
    margin-right: 1.3vw;
  }

  .hide-number {
    color: var(--app-background);
  }

  .button {
    position: relative;
    bottom: -6vh;
  }
</style>

<script>
  import Footer from '@/components/Footer.vue';
  import DeButton from '@/components/DeButton.vue';
  import ProgressHeader from '@/components/ProgressHeader.vue';

  export default {
    name: 'GameInstructions',
    components: {
     Footer,
     DeButton,
     ProgressHeader
    },
    data: () => ({
      isMod: true,
      selectedModule: undefined,
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
        this.$router.push('/groups/individual_solution');
      }
    }
  }
</script>
