<template>
  <div v-if="show" class="container">vas tev faire foutre</div>
</template>
<script>
export default {
  name: 'ModalUpdateEtatDeSomme',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 50px;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.239);
}
</style>
