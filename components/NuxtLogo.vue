<template>
  <div class="logo d-flex justify-content-center align-items-center">
    <img :src="src" alt="Logo du Portail" class="img-fluid" width="150" />
    <h1 :class="color === 'dark' ? 'dark' : 'white'">FINOM</h1>
  </div>
</template>

<script>
export default {
  name: 'NuxtLogo',
  props: {
    src: {
      type: String,
      default: '/logo/logo.png',
    },
    color: {
      type: String,
      default: '#fff',
    },
  },
}
</script>
<style lang="scss" scoped>
.logo {
  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
  .dark {
    color: $black;
  }
  .white {
    color: $white;
  }
}
</style>
