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
        <ProgressHeader step=4></ProgressHeader>
      </div>
      <div class="top-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="mid-div">
      <div v-for="solution in solutions" v-bind:key="solution.id" class="coiso-div">
        <div class="paper-sticker"></div>
        <div v-if="solution.checked" class="check-sticker"></div>
        <div class="solution-div" :solution-id="solution.id">
          <span class="text-span">{{solution.text}}</span>
        </div>
      </div>
    </div>
    <Footer :items="items" :label="'Grupo ' + groupId"></Footer>
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

  .mid-div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 8vh;
    column-gap: 8vw;
    margin: 12vh auto auto auto;
  }
  .solution-div {
    display: flex;
    overflow: hidden;
    width: 25vw;
    height: 25vh;
    background-color: aquamarine;
    font-size: 1.1vw;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  .paper-sticker {
    height: 5vh;
    width: 10vw;
    background-color: blueviolet;
    position: absolute;
    margin-top: -2.5vh;
  }
  .check-sticker {
    height: 5vh;
    width: 5vh;
    background-color: green;
    position: absolute;
    margin-top: -2.5vh;
    margin-left: 25vw;
  }
  .coiso-div {
    display: flex;
    justify-content: center;
  }
  .text-span {
    overflow: hidden;
    margin-left: 6%;
    margin-right: 6%;
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
