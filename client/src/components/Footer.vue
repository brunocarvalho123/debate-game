<template>
  <div class="footer-container">
    <div class="slot first-slot">
      {{label}}
    </div>
    <template v-if="items.length > 8">
      <div v-for="nr in oneToEight" v-bind:key="nr" class="slot mid-slot">
        {{items[nr].name}}
      </div>
      <div class="slot last-slot">
        + {{items.length - 8}}
      </div>
    </template>
    <template v-else>
      <div v-for="item in items" v-bind:key="item.id" class="slot mid-slot">
        {{item.name}}
      </div>
    </template>
  </div>
</template>

<style scoped>
  .footer-container {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: var(--app-secondary-blue);
    color: var(--app-main-blue);
    height: 8vh;
    z-index: 1;
  }
  .slot {
    padding-top: 2.2vh;
    padding-bottom: 1.8vh;
    padding-left: 2.6vw;
    padding-right: 2.6vw;
    font-size: 1.2vw;
    /* font-weight: 350; */
    border-color: white;
    border-style: solid;
    border-width: 0px 3px 0px 0px;
  }
  .first-slot {
    background-color: var(--app-main-blue);
    color: white;
    font-size: 1.4vw;
    font-weight: 600;
    padding-left: 2.5vw;
    padding-right: 3.5vw;
    border-width: 0px;
    border-radius: 0px 5vw 0px 0px;
  }
  .last-slot {
    border-width: 0px;
  }
</style>

<script>
  export default {
    name: 'Footer',
    props: ['items','label'],
    data: () => ({
      oneToEight: [0,1,2,3,4,5,6,7]
    })
  }
</script>
