<template>
  <div class="main-div">
    <div class="header-container">
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-home-outline
        </v-icon>
        <span class="icon-text">Início</span>
      </div>
      <div class="header-label">A aguardar jogadores... {{items.length}} / 30</div>
      <div class="header-buttons">
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
      <DeButton class="button" label="Iniciar" @pressed="sendReady" :disabled="!ready"></DeButton>
    </div>

    <v-dialog v-model="infoDialog" width="47vw">
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
  .icon-text {
    margin-left: 10px;
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
    border: 1px solid var(--app-detail);
    padding-top: 2vh;
    padding-bottom: 2vh;
  }
  .name-block {
    width: 10vw;
    height: 4.5vw;
    background-color: var(--app-secondary-blue);
    border-radius: 10px;
    color: var(--app-main-blue);
    font-size: 1.4vw;
    font-weight: 600;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog-container {
    background-color: white;
    border-radius: 10px;
    border: 2px solid var(--app-detail);
    padding: 8vh 0;
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
  import http from "../http-common";
  import DeButton from '@/components/DeButton.vue'
  import { bus } from '../main';

  export default {
    name: 'WaitingRoom',
    components: {
     DeButton
    },
    mounted() {
      this.roomId = this.$route.params.roomId;
      console.log(this.roomId);
      if (this.roomId.length !== 6) this.$router.push(`/`);

      bus.$on('me-mod', (event) => {
        if (event && event.roomId === this.roomId) {
          this.isMod = true;

          if (this.hasShown === false) {
            this.infoDialog = true;
            this.hasShown = true;
          }
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

      bus.$on('start-slides', (event) => {
        if (event && event.roomId === this.roomId) {
          this.$router.push(`/slides/${this.roomId}`);
        }
      })

      bus.$on('users', (event) => {
        if (event && event.data && event.roomId === this.roomId) {
          if (event.data[0].length > 0) {
            let users = event.data[0].split(';');
            users.pop(); // remove last trash char
            this.items = users.map((e,idx) => { return {id: idx, name: (e.includes(',') ? e.split(',')[1] : e)}});
          }

          if (this.items.length >= 1 && this.isMod) {
            this.ready = true;
          } else {
            this.ready = false;
          }
        }
      })
    },
    data: () => ({
      isMod: false,
      infoDialog: false,
      ready: false,
      roomId: '',
      hasShown: false,
      items: []
    }),
    methods: {
      sendReady: function() {
        // debugger; // eslint-disable-line no-debugger
        if (this.ready && this.isMod) {
          this.sendMessage(`start-slides:${this.roomId}`);
        }
        // this.$router.push('/slides');
      }
    }
  }
</script>
