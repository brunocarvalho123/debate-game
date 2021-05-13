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
        Discussão de grupo
      </div>
      <div class="header-buttons">
        <v-icon size="2.5vw" style="margin-top: -5px;" class="b-icon" color="var(--app-main-blue)">
          mdi-information-outline
        </v-icon>
        <span class="icon-text">Ajuda</span>
      </div>
    </div>
    <div class="mid-div">
      <div class="timer">{{timeLeft}} min</div>
      <ProgressHeader :step=step></ProgressHeader>
    </div>
    <Footer :items="items" label="Participantes"></Footer>
  </div>
</template>

<style scoped>
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

  .timer {
    color: var(--app-main-blue);
    font-size: 1.8vw;
    font-weight: 600;
    text-align: center;
    margin-top: -15vh;
  }
</style>

<script>
  import Footer from '@/components/Footer.vue';
  import ProgressHeader from '@/components/ProgressHeader.vue';
  import http from "../http-common";
  import { bus } from '../main';

  export default {
    name: 'ModGroupWait',
    components: {
     Footer,
     ProgressHeader
    },
    mounted() {
      this.roomId = this.$route.params.roomId;
      if (this.roomId.length !== 6) this.$router.push(`/`);

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

      bus.$on('start-finals', (event) => {
        if (event && event.roomId === this.roomId) {
          this.goFinalInfo();
        }
      });

      setInterval(() => {
                          if (this.totalSecs > 0)
                            this.totalSecs--;
                          else
                            return;

                          if (this.totalSecs <= (20*60)-(9 * 60) && this.totalSecs > (20*60)-(11 * 60)) {
                            this.step = 2;
                          } else if (this.totalSecs <= (20*60)-(11 * 60) && this.totalSecs > (20*60)-(18 * 60)) {
                            this.step = 3;
                          } else if (this.totalSecs < (20*60)-(18 * 60)) {
                            this.step = 4;
                          }
                          const minutes = Math.floor(this.totalSecs/60);
                          const seconds = this.totalSecs - minutes * 60;
                          this.timeLeft = this.strPadLeft(minutes,seconds);
                        }, 1000);
    },
    data: () => ({
      items: [],
      groupId: '',
      totalSecs: 12 * 60,
      timeLeft: '',
      step: 1
    }),
    methods: {
      goFinalInfo: function() {
        this.$router.push(`/final_info/${this.roomId}`);
      },
      strPadLeft: function(minutes,seconds) {
        return (new Array(2+1).join('0')+minutes).slice(-2) + ':' + (new Array(2+1).join('0')+seconds).slice(-2);
      }
    }
  }
</script>
