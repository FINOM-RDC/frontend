<template>
  <div class="missions-archives">
    <div class="tableau">
      <h2>Vos 0rdres de Mission</h2>
      <div
        class="row justify-content-between align-items-center flex-wrap-reverse"
      >
        <div class="tableau__cta">
          <nuxt-link
            to="/dashboard/missions/initier-un-ordre"
            class="btn btn-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
              />
            </svg>
            Initier un ordre de Mission</nuxt-link
          >
        </div>
      </div>
      <div class="w-100">
        <b-tabs content-class="mt-5" @click="onClick">
          <b-tab title="Ordres de Mission Générées" active
            ><TableInitial :items="missions || []"
          /></b-tab>
          <b-tab title="Ordres de Mission en cours"
            ><TableInitial :items="pending || []"
          /></b-tab>
          <b-tab title="Ordres de Mission validées"
            ><TableInitial :items="validated || []"
          /></b-tab>
          <b-tab title="Ordres de Mission Rejectés"
            ><p><TableInitial :items="rejectedOrInProgress || []" /></p
          ></b-tab>
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
  data() {
    return {
      socket: null,
    }
  },
  computed: {
    ...mapGetters({
      missions: 'missions/missions',
      pending: 'missions/pending',
      validated: 'missions/validated',
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
