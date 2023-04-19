<template>
  <div class="users mb-5">
    <div class="card-infos">
      <div v-show="authentificatedUser" class="normal-users">
        <CardList :data="missions" />
      </div>
      <div v-show="adminAdviserUser" class="users">
        <CardCAtraitement :data="missions" />
      </div>
      <div v-show="sousGestionaireDesCompteUser" class="users">
        <CardSGtraitement />
      </div>
      <div v-show="celluleFinanciereUser" class="users">
        <CardCFtraitement />
      </div>
      <div v-show="dircabUser" class="users">
        <CardDRtraitement />
      </div>
      <div v-show="ministre" class="users">
        <CardMNtraitement />
      </div>
      <div v-show="comptable" class="users">
        <CardCOtraitement />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardUsers',
  layout: 'dashboard',
  middleware: 'auth',
  data: () => ({
    user: {},
  }),
  computed: {
    ...mapGetters({
      missions: 'missions/missions',
    }),
    getRole() {
      return this.user && this.user.role && this.user.role.name
    },
    authentificatedUser() {
      return this.getRole === 'Authenticated'
    },
    adminAdviserUser() {
      return this.getRole === 'Conseiller administratif'
    },
    sousGestionaireDesCompteUser() {
      return this.getRole === 'Sous gestionnaire de compte'
    },
    celluleFinanciereUser() {
      return (
        this.getRole === 'Conseiller financier' ||
        this.getRole === 'Coordonnateur de la Cellule financière'
      )
    },
    dircabUser() {
      return this.getRole === 'Directeur du cabinet'
    },
    ministre() {
      return this.getRole === 'ministre'
    },
    comptable() {
      return this.getRole === 'comptable'
    },
  },

  mounted() {
    this.fetchData()
    this.fetchUser()
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch('missions/fetchMissions')
      await this.$store.dispatch('missions-functions/fetchFunctions')
    },
    fetchUser() {
      this.user = this.$strapi.user
      return this.user
    },
  },
}
</script>
<style lang="scss" scoped>
.users {
  z-index: -60;
  padding: 50px;
  background: #fff;
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    padding: 10px;
  }
}
</style>
