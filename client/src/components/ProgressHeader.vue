<template>
  <div class="progress-div">
    <div v-if="step==1" class="more-opaco">1. Solução individual</div>
    <div v-else class="text-div">1. Solução individual</div>

    <div class="risco"></div>

    <div v-if="step==2" class="more-opaco">2. Votação</div>
    <div v-else class="text-div">2. Votação</div>

    <div class="risco"></div>

    <div v-if="step==3" class="more-opaco">3. Discussão</div>
    <div v-else class="text-div">3. Discussão</div>

    <div class="risco"></div>

    <div v-if="step==4" class="more-opaco">4. Escolha do porta voz</div>
    <div v-else class="text-div">4. Escolha do porta voz</div>
  </div>
</template>

<style scoped>
  .progress-div {
    display: flex;
    color: var(--app-main-blue);
    font-size: 1.2vw;
    font-weight: 350;
  }
  .text-div {
    opacity: 0.6;
  }
  .more-opaco {
    opacity: 1;
    font-weight: 600;
  }
  .risco {
    background-color: var(--app-main-blue);
    height: 1px;
    width: 7vw;
    margin: auto 0.8vw auto 0.8vw;
    opacity: 0.6;
  }
</style>

<script>
  export default {
    name: 'ProgressHeader',
    props: ['step']
  }
</script>
