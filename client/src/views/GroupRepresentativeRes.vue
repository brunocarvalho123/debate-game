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
        <div class="person-container">
          <p>O porta voz escolhido foi:</p>
          <div class="person">{{repName}}</div>
        </div>
        <p>Dentro de momentos vão começar os debates finais.<br>Podem aproveitar este tempo para preparar o discurso do porta voz.</p>
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
    display: grid;
    width: 19vw;
    text-align: center;
    margin: 0 auto;
  }

  .person {
    background-color: var(--app-secondary-blue);
    padding: 3.3vh 5vw;
    font-weight: bold;
    border-radius: 1.5vh;
    margin: 3vh 2vw 0 2vw;
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
    name: 'GroupRepresentativeRes',
    components: {
     Footer,
     ProgressHeader
    },
    data: () => ({
      items: [],
      repName: '',
      roomId: '',
      groupId: '',
      timeLeft: 0,
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

      bus.$on('get-group-rep-voted', (event) => {
        if (event && event.roomId === this.roomId) {
          this.repName = event.data[0];
          this.timeLeft = (+event.data[1])/1000;
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
        }
      });

      bus.$on('start-finals', (event) => {
        if (event && event.roomId === this.roomId) {
          this.goFinalInfo();
        }
      });
      this.sendMessage(`get-group-rep-voted:${this.roomId}:${this.groupId-1}`);


    },
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
