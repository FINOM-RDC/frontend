<template>
  <div class="missions-archives">
    <div class="tableau">
      <h2>Vos 0rdres de Mission</h2>

      <div class="w-100">
        <b-tabs content-class="mt-5" @click="onClick">
          <b-tab title="Ordres de Mission validées"
            ><TableInitial :items="payed || []"
          /></b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MissionsArchives',
  layout: 'dashboard',
  middleware: 'auth',

  computed: {
    ...mapGetters({
      missions: 'missions/missions',
      pending: 'missions/pending',
      validated: 'missions/validated',
      payed: 'missions/payed',
      rejectedOrInProgress: 'missions/rejectedOrInProgress',
    }),
  },
  mounted() {
    this.$store.dispatch('missions/fetchMissions')
  },
  methods: {
    onClick() {
      alert(this.missions)
    },
  },
}
</script>
<style lang="scss" scoped>
.missions-archives {
  z-index: -1;
  padding: 10px 50px;
  background: #fff;
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    padding: 10px;
  }
  .tableau {
    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 20px;
      text-transform: uppercase;
    }
  }
}
</style>
