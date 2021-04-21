<template>
  <div class="main-div">
    <div class="top-div">
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-arrow-left-circle-outline
        </v-icon>
        <span class="icon-text">Explicação</span>
      </div>
      <div class="top-label">
        Formação de equipas
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
        <div class="text-cell">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
        <div class="text-cell">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
        <div class="text-cell">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
        <div class="text-cell">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
        <div class="text-cell">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
        <div class="text-cell">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
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
    margin-top: -10vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .text-cell {
    color: var(--app-main-blue);
    font-size: 1.2vw;
    font-weight: 350;
    padding-bottom: 6vh;
    padding-left: 4vw;
    padding-right: 4vw;
  }
</style>

<script>
  import Footer from '@/components/Footer.vue';
  import DeButton from '@/components/DeButton.vue';

  export default {
    name: 'GameGroups',
    components: {
     Footer,
     DeButton
    },
    data: () => ({
      isMod: true,
      selectedModule: undefined,
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
      startGame: function() {
        this.$router.push('/game_instructions');
      }
    }
  }
</script>
