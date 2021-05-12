<template>
  <div class="main-div">
    <div class="header-container">
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-timer-sand
        </v-icon>
        <span class="icon-text">{{timeLeftStr}}</span>
      </div>
      <div class="header-label">
        <ProgressHeader step=2></ProgressHeader>
      </div>
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="solutions-grid">
      <div v-for="solution in solutions" v-bind:key="solution.id" class="coiso-div">
        <div class="paper-sticker">
          <img src="sticker_img.svg" class="sticker-img" alt="sticker img">
        </div>
        <div class="solution-div">
          <span class="text-span">{{solution.text}}</span>
          <img src="note_img.svg" class="solution-img" @click="voteOnSolution" :solution-id="solution.id" alt="texture img">
        </div>
        <img v-if="solution.checked" src="maneta-img.svg" class="check-sticker" alt="sticker img">
      </div>
      <div class="coiso-div">
        <div class="paper-sticker">
          <img src="sticker_img.svg" class="sticker-img" alt="sticker img">
        </div>
        <div class="solution-div">
          <span class="text-span">Nenhuma das anteriores</span>
          <img src="note_img.svg" class="solution-img" alt="texture img">
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

  .solutions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 8vh;
    column-gap: 8vw;
    margin: 0 auto;
    /* height: 81.7vh; */
    height: 71.7vh;
    width: 84.3vw;
    align-self: center;
  }

  .solution-div {
    display: flex;
    overflow: hidden;
    width: 22vw;
    height: 24.1vh;
    /* background-color: aquamarine; */
    font-size: 1.1vw;
    justify-content: center;
    text-align: center;
    align-items: center;
    position: relative;
    box-shadow: 6px 6px 18px -4px rgb(0, 0, 0, 60%)
  }
  .solution-div:hover {
    cursor: pointer;
  }
  .paper-sticker {
    /* background-color: blueviolet; */
    position: absolute;
    margin-top: -2.5vh;
    z-index: 1;
  }

  .sticker-img {
    height: 5vh;
    width: 10vw;
  }

  .check-sticker {
    height: 7vh;
    width: 6.3vh;
    position: absolute;
    margin-top: -2.5vh;
    margin-left: 21vw;
  }
  .coiso-div {
    display: flex;
    justify-content: center;
    transform: scale(0.9);
    transform-origin: 25% 30%;
    transition: transform 200ms ease-out;
  }
  .text-span {
    overflow: hidden;
    margin-left: 6%;
    margin-right: 6%;
    z-index: 1;
    color: var(--app-main-blue);
  }

  .solution-img {
    width: 37.7vw;
    margin-right: 10vw;
    position: absolute;
    top: -10px;
    left: -8px;
  }

</style>

<script>
  import Footer from '@/components/Footer.vue';
  import ProgressHeader from '@/components/ProgressHeader.vue';
  import http from "../http-common";
  import { bus } from '../main';

  export default {
    name: 'GroupVoting',
    components: {
     Footer,
     ProgressHeader
    },
    data: () => ({
      items: [],
      solutions: [],
      roomId: '',
      groupId: '',
      sent: false,
      timeLeft: 3 * 60,
      totalTime: 3 * 60,
      timeLeftStr: ''
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

      bus.$on('get-group-solutions', (event) => {
        if (event && event.roomId === this.roomId) {
          let res = event.data[0].split(';,');
          res[res.length-1] = res[res.length-1].slice(0, -1);
          for (let idx = 0; idx < res.length; idx++) {
            const element = res[idx];
            this.solutions.push({id:idx, text:element});
          }
        }
      });

      bus.$on('group-discussion', (event) => {
        if (event && event.roomId === this.roomId) {
          this.$router.push(`/groups/group_discussion/${this.roomId}/${this.groupId}`);
        }
      });

      this.sendMessage(`get-group-solutions:${this.roomId}:${this.groupId-1}`);

      setTimeout(() => {
        const divCoisos = document.querySelectorAll('.coiso-div');
        for (const div of divCoisos) {
          const randomNumber = Math.floor(Math.random() * (5 - (-5) + 1) + (-5));
          div.style.transform = `scale(1) rotate(${randomNumber}deg)`;
        }
      }, 100);

      setTimeout(() => {if (this.sent === false) this.voteOnSolution();}, this.totalTime * 1000);

      setInterval(() => {
                          if (this.timeLeft > 0)
                            this.timeLeft--;
                          else
                            return;

                          if (this.timeLeft >= 225 && this.timeLeft < 230) {
                            this.step = 2;
                          } else if (this.timeLeft >= 220 && this.timeLeft < 225) {
                            this.step = 3;
                          } else if (this.timeLeft < 220) {
                            this.step = 4;
                          }
                          const minutes = Math.floor(this.timeLeft/60);
                          const seconds = this.timeLeft - minutes * 60;
                          this.timeLeftStr = this.strPadLeft(minutes,seconds);
                        }, 1000);

    },
    methods: {
      voteOnSolution: function(event) {
        // debugger; // eslint-disable-line no-debugger
        if (event && event.target && event.composedPath().filter(e=>e.className == 'solution-div').length > 0 && !this.sent) {
          this.sendMessage(`individual-vote:${this.roomId}:${this.groupId-1}:${event.target.getAttribute('solution-id')}`);
          let tmpSolut = this.solutions;
          tmpSolut[+event.target.getAttribute('solution-id')].checked = true;
          this.solutions = JSON.parse(JSON.stringify(tmpSolut));
          this.sent = true;
        } else {
          this.sendMessage(`individual-vote:${this.roomId}:${this.groupId-1}:0`);
          this.sent = true;
        }
      },
      strPadLeft: function(minutes,seconds) {
        return (new Array(2+1).join('0')+minutes).slice(-2) + ':' + (new Array(2+1).join('0')+seconds).slice(-2);
      }
    }
  }
</script>
