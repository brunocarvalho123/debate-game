<template>
  <div class="main-div">
    <div class="header-container">
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-timer-sand
        </v-icon>
        <span ref="timeText" class="icon-text timer-text">{{timeLeftStr}}</span>
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
          <div v-for="(item, idx) in items" v-bind:key="item.id" @click="voteOnRep" :rep-idx="idx" :rep-id="item.id"
            :class="item.checked ? 'person selected-person' : 'person'" >
            {{item.name}}
          </div>
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
    margin: 0 auto;
  }

  .person {
    background-color: var(--app-secondary-blue);
    padding: 3vh 5vw;
    font-weight: bold;
    border-radius: 1.5vh;
    margin: 0 2vw;
  }

  .person:hover {
    cursor: pointer;
    /* box-shadow: 1px 1px 8px 1px #888888; */
    box-shadow: 6px 6px 18px -4px rgb(0, 0, 0, 40%);
  }

  .selected-person {
    border: 3px solid var(--app-accent);
    box-sizing: border-box;
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
      sent: false,
      timeLeft: 1 * 60,
      totalTime: 1 * 60,
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

      bus.$on('group-representative-res', (event) => {
        if (event && event.roomId === this.roomId) {
          this.$router.push(`/groups/group_representative_res/${this.roomId}/${this.groupId}`);
        }
      });

      setTimeout(() => {if (!this.sent) this.voteOnRep()}, this.totalTime * 1000);

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

                          if (this.timeLeft < this.totalTime/5 && this.timeLeft%2==0) {
                            this.$refs.timeText.classList.add('timer-text-final');
                          } else if (this.timeLeft < this.totalTime/5 && this.timeLeft%2==1) {
                            this.$refs.timeText.classList.remove('timer-text-final');
                          }
                        }, 1000);
    },
    methods: {
      voteOnRep: function(event) {
        // debugger; // eslint-disable-line no-debugger
        if (event && event.target && event.composedPath().filter(e=>e.className == 'person').length > 0 && !this.sent) {
          this.sendMessage(`representative-vote:${this.roomId}:${this.groupId-1}:${event.target.getAttribute('rep-id')}`);
          let tmpSolut = this.items;
          tmpSolut[+event.target.getAttribute('rep-idx')].checked = true;
          this.items = JSON.parse(JSON.stringify(tmpSolut));
          this.sent = true;
        } else {
          this.sendMessage(`representative-vote:${this.roomId}:${this.groupId-1}:0`);
          this.sent = true;
        }
      },
      strPadLeft: function(minutes,seconds) {
        return (new Array(2+1).join('0')+minutes).slice(-2) + ':' + (new Array(2+1).join('0')+seconds).slice(-2);
      }
    }
  }
</script>
