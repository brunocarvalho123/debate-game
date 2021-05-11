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
        <ProgressHeader step=4></ProgressHeader>
      </div>
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="instructions-container">
      <div class="g_rep_container">
        <p>Agora devem votar no colega que vai defender a vossa ideia no debate contra o outro grupo.<br>Caso não votem em ninguém, será escolhido um porta voz aleatoriamente.</p>
        <div class="person-container">
          <div class="person">Sofia</div>
          <div class="person">Pedro</div>
          <div class="person selected-person">Maria</div>
          <div class="person">Bruno</div>
        </div>
      </div>
    </div>
    <Footer :items="items" :label="'Grupo ' + groupId"></Footer>
  </div>
</template>

<style scoped>
  .icon-text {
    margin-left: 10px;
  }
 
  .b-icon {
    margin-bottom: 0.2vh;
  }

  div.instructions-container p {
    margin: 0 2vw;
  }

  .person-container {
    display: flex;
  }

  .person {
    background-color: var(--app-secondary-blue);
    padding: 3vh 5vw;
    font-weight: bold;
    border-radius: 1.5vh;
    margin: 0 2vw;
  }

  .selected-person {
    border: 3px solid var(--app-accent);
  }

  .g_rep_container {
    display: grid;
    align-content: space-evenly;
    height: 50vh;
    font-size: 1.2vw;
  }

</style>

<script>
  import Footer from '@/components/Footer.vue';
  import ProgressHeader from '@/components/ProgressHeader.vue';
  import http from "../http-common";
  import { bus } from '../main';

  export default {
    name: 'GroupRepresentative',
    components: {
     Footer,
     ProgressHeader
    },
    data: () => ({
      items: [],
      solutions: [],
      roomId: '',
      groupId: '',
      sent: false
    }),
    mounted() {
      this.roomId = this.$route.params.roomId;
      this.groupId = +this.$route.params.groupId;
      if (this.roomId.length !== 6) this.$router.push(`/`);
      if (this.groupId < 0 ) this.$router.push(`/`);

      http.get(`/groups/${this.roomId}`).then(response => {
        if (response && response.data && response.data.length > 0) {
          this.items = response.data[this.groupId - 1].members;
        }
      }).catch(err => {
        console.log(err);
      });

      bus.$on('get-group-solutions-voted', (event) => {
        if (event && event.roomId === this.roomId) {
          let res = event.data[0].split(';,');
          res[res.length-1] = res[res.length-1].slice(0, -1);
          for (let idx = 0; idx < res.length; idx++) {
            const element = res[idx];
            this.solutions.push({id:idx, text:element});
          }
          console.log(event);
        }
      });

      bus.$on('group-representative', (event) => {
        if (event && event.roomId === this.roomId) {
          this.$router.push(`/groups/group_representative/${this.roomId}/${this.groupId}`);
        }
      });

      this.sendMessage(`get-group-solutions-voted:${this.roomId}:${this.groupId-1}`);

    }
  }
</script>
