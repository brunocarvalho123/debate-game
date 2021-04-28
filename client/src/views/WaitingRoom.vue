<template>
  <div class="main-div">
    <div class="top-div">
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-home-outline
        </v-icon>
        <span class="icon-text">Início</span>
      </div>
      <div class="top-label">A aguardar jogadores... {{items.length}} / 30</div>
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="mid-div">
      <div class="user-pool">
        <div v-for="item in items" v-bind:key="item.id" class="name-block">
          {{item.name}}
        </div>
      </div>
      <DeButton class="button" label="Iniciar" @pressed="beginGame" :disabled="!ready"></DeButton>
    </div>

    <v-dialog v-model="infoDialog" width="40vw">
      <div class="dialog-container">
        <div class="info-text">
          <p>A sua sala de jogo foi criada com sucesso!</p>
          <p>Basta partilhar o código de acesso com os jogadores ou, se preferir,<br>pode obter um link partilhável ou enviar convites por email.</p>
        </div>
        <div class="code-text">
          <span>Código de acesso:</span><br>
          <span style="color: var(--app-accent)">{{roomId}}</span>
        </div>
        <div class="links-row">
          <span class="links"><v-icon size="1.7vw" class="b-icon" color="var(--app-main-blue)">mdi-link</v-icon> Obter link partilhavel</span>
          <span class="links"><v-icon size="1.7vw" class="b-icon" color="var(--app-main-blue)">mdi-email</v-icon> Enviar links por email</span>
        </div>
        <!-- <v-btn color="var(--app-accent)" text @click="infoDialog=false">
          Cancelar
        </v-btn> -->
      </div>
    </v-dialog>
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
  .mid-div {
    display: grid;
    justify-content: center;
    margin: auto;
  }
  .module-select {
    width: 35vw;
    margin-top: -12vh !important;
  }
  .button {
    margin-top: 7vh;
  }
  .user-pool {
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-auto-flow: row;
    background-color: white;
    height: 60vh;
    width: 90vw;
    border-radius: 10px;
    border: 2px solid var(--app-detail);
    padding-top: 2vh;
    padding-bottom: 2vh;
  }
  .name-block {
    width: 10vw;
    height: 4vw;
    background-color: var(--app-secondary-blue);
    border-radius: 10px;
    border: 1px solid var(--app-detail);
    color: var(--app-main-blue);
    font-size: 1.4vw;
    font-weight: 450;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog-container {
    background-color: white;
    border-radius: 10px;
    border: 2px solid var(--app-detail);
    padding: 1.3vw;
    text-align: center;
    color: var(--app-main-blue);
    font-size: 1.2vw;
    font-weight: 400;
  }
  .code-text {
    margin-top: 2vw;
    font-size: 1.6vw;
    font-weight: 500;
  }
  .links-row {
    margin-top: 2vw;
  }
  .links {
    margin-left: 2vw;
    margin-right: 2vw;
  }
  .links:hover {
    cursor: pointer;
    color: var(--app-accent)
  }
  .b-icon {
    margin-bottom: 0.2vh;
  }
</style>

<script>
  import DeButton from '@/components/DeButton.vue'
  import { bus } from '../main';

  export default {
    name: 'WaitingRoom',
    components: {
     DeButton
    },
    mounted() {
      this.roomId = this.$route.params.roomId;
      bus.$on('changeIt', (data) => {
        const parsedData = data.data.split(':');
        if (parsedData[2].length > 0) {
          let users = parsedData[2].split(';');
          users.pop();
          this.items = users.map((e,idx) => { return {id: idx, name: e}});
        }
        if (this.items.length >= 10 && data.data.is_mod) {
          this.ready = true;
        } else {
          this.ready = false;
        }

      })
    },
    data: () => ({
      isMod: true,
      infoDialog: false,
      ready: false,
      roomId: '',
      selectedModule: undefined,
      items: []
      // items: [{id:0, name:'Russell'},
      //         {id:1, name:'Cabrera'},
      //         {id:2, name:'Newton'},
      //         {id:3, name:'Mercer'},
      //         {id:4, name:'Hobbs'},
      //         {id:5, name:'Alvarez'},
      //         {id:6, name:'Hicks'},
      //         {id:7, name:'Puckett'},
      //         {id:8, name:'Mohammed'},
      //         {id:9, name:'Mullins'},
      //         {id:10, name:'Robson'},
      //         {id:11, name:'Dennis'},
      //         {id:12, name:'Montes'},
      //         {id:13, name:'Whittle'},
      //         {id:14, name:'Kaur'},
      //         {id:15, name:'Milne'},
      //         {id:16, name:'Oneal'},
      //         {id:17, name:'Rogers'},
      //         {id:18, name:'Stewart'},
      //         {id:19, name:'Kent'},
      //         {id:20, name:'Klein'},
      //         {id:21, name:'Rivers'},
      //         {id:22, name:'Keeling'},
      //         {id:23, name:'Beasley'},
      //         {id:24, name:'Markham'},
      //         {id:25, name:'Wolf'},
      //         {id:26, name:'Crawford'},
      //         {id:27, name:'Chang'},
      //         {id:28, name:'Henry'},
      //         {id:29, name:'Wilkerson'}]
    }),
    methods: {
      beginGame: function() {
        // debugger; // eslint-disable-line no-debugger
        this.$router.push('/slides');
      }
    }
  }
</script>
