<template>
  <div class="main-div">
    <div class="top-div">
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-arrow-left-circle-outline
        </v-icon>
        <span class="icon-text">Explicação</span>
      </div>
      <div class="header-label">
        Formação de equipas
      </div>
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="mid-div">
      <div class="group-grid">
        <div v-for="groups in matches" v-bind:key="groups.id" class="match-cell">
          <div class="group-cell">
            <div class="group-header">{{groups[0].name}}</div>
            <div class="group-body">
              <span v-for="member in groups[0].members" v-bind:key="member.id" class="member-span">
                {{items[member.id].name}}
              </span>
            </div>
            <div class="vs-sign">VS</div>
            <div class="group-header">{{groups[1].name}}</div>
            <div class="group-body">
              <span v-for="member in groups[1].members" v-bind:key="member.id" class="member-span">
                {{items[member.id].name}}
              </span>
            </div>
          </div>
        </div>

      </div>
      <DeButton class="button" label="Continuar" v-if="isMod" @pressed="goToGroups"></DeButton>
    </div>
    <Footer :items="items" label="Participantes"></Footer>
  </div>
</template>

<style scoped>
  .top-div {
    height: 11vh;
    display: flex;
    color: var(--app-main-blue);
    font-size: 1.6vw;
    font-weight: 450;
    justify-content: space-between;
    box-shadow: 0 4px 6px -6px #222;
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
  .group-grid {
    margin-top: -10vh;
    display: inline-grid;
    grid-auto-flow: column;
  }
  .group-cell {
    color: var(--app-main-blue);
    font-size: 1.2vw;
    font-weight: 350;
    padding-bottom: 6vh;
    padding-left: 4vw;
    padding-right: 4vw;
    width: 30vw;

  }
  .group-header {
    background-color: var(--app-secondary-blue);
    color: var(--app-main-blue);
    border-radius: 10px 10px 0px 0px;
    border: 1px solid var(--app-main-blue);
    text-align: center;
    font-size: 1.6vw;
    font-weight: 450;
    padding-top: 0.5vh;
    padding-bottom: 0.5vh;
  }
  .group-body {
    border-radius: 0px 0px 10px 10px;
    border: 1px solid var(--app-main-blue);
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 1.2vw;
    font-weight: 450;
    justify-content: center;
    justify-items: center;
    align-content: center;
  }
  .member-span {
    padding: 0.8vw 0vw 0.8vw 0vw;
  }
  .vs-sign {
    color: var(--app-accent);
    font-size: 1.8vw;
    font-weight: 550;
    padding-top: 1.5vh;
    padding-bottom: 1.5vh;
    text-align: center;
  }
</style>

<script>
  import Footer from '@/components/Footer.vue';
  import DeButton from '@/components/DeButton.vue';
  import http from "../http-common";
  import { bus } from '../main';

  export default {
    name: 'GameGroups',
    components: {
     Footer,
     DeButton
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

      http.get(`/groups/${this.roomId}`).then(response => {
        // debugger; // eslint-disable-line no-debugger
        if (response && response.data && response.data.length > 0) {
          this.matches = [response.data];
        }
      }).catch(err => {
        console.log(err);
      });

      bus.$on('my-info', (event) => {
        if (event && event.roomId === this.roomId) {
          this.myId = event.data[0];
          this.myName = event.data[1];
          this.myGroup = event.data[2];
        }
      })

      bus.$on('start-group-info', (event) => {
        if (event && event.roomId === this.roomId) {
          if (this.isMod) this.$router.push(`/mod_group_wait/${this.roomId}`);
          else if (this.myGroup > -1) {
            this.$router.push(`/group_info/${this.roomId}/${this.myGroup}`);
          }
        }
      });

      this.sendMessage(`my-info:${this.roomId}`);
    },
    data: () => ({
      isMod: false,
      matches: [
              // [{id:0, name:'Grupo 1', members:[0,1,2,3,4]}, {id:1, name:'Grupo 2', members:[5,6,7,8,9]}],
              //  [{id:2, name:'Grupo 3', members:[10,11,12,13,14]}, {id:3, name:'Grupo 4', members:[15,16,17,18,19]}],
              //  [{id:4, name:'Grupo 5', members:[20,21,22,23,24]}, {id:5, name:'Grupo 6', members:[25,26,27,28,29]}]
              ],
      roomId: '',
      items: [],
      myGroup: -1,
      myId: -1,
      myName: ''
    }),
    methods: {
      goToGroups: function() {
        if (this.isMod) {
          this.sendMessage(`start-group-info:${this.roomId}`);
        }
      }
    }
  }
</script>
