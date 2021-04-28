<template>
  <div :class="( (disabled) ? 'button-div-disabled' : 'button-div')" @click="pressed">
    <span class="label">{{label}}</span>
  </div>
</template>

<style scoped>
  .button-div {
    cursor: pointer;
    display: grid;
    justify-content: center;
    margin: auto;
    background-color: var(--app-accent);
    color: var(--app-background);
    border-radius: 10px;
  }
  .button-div-disabled {
    display: grid;
    justify-content: center;
    margin: auto;
    background-color: var(--app-accent);
    color: var(--app-background);
    opacity: 0.5;
    border-radius: 10px;
  }
  .label {
    margin: auto;
    font-size: 1.7vw;
    font-weight: 500;
    padding: 1vw 2vw 1vw 2vw;
  }
</style>

<script>
  export default {
    name: 'DeButton',
    props: ['label', 'disabled'],
    methods: {
      pressed() {
        if (!this.disabled) this.$emit('pressed');
      }
    }
  }
</script>
