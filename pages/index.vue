<template>
  <NuxtLogo color="dark" />
</template>

<script>
import NuxtLogo from '~/components/NuxtLogo.vue'
export default {
  name: 'IndexPage',
  components: { NuxtLogo },
  layout: 'dashboard',
  middleware: ['redirect'],
}
</script>
