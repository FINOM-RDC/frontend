<template>
  <div class="single-sum-state">
    <div class="sum-state-header mb-5">
      <div
        class="letter__hearder__title col-12 d-flex justify-content-between between align-items-center mt-4 mb-2"
      >
        <nuxt-link
          class="mx-2"
          :to="`/dashboard/missions/${
            sumState.length > 0 && sumState[0].mission_order.id
          }`"
          prefetch
        >
          <v-btn>
            <v-icon>mdi-print</v-icon>
            Retour
          </v-btn>
        </nuxt-link>

        <div class="d-flex align-items-center">
          <v-btn
            v-if="isValidetUser"
            :disabled="disabled()"
            class="btn btn-success d-flex align-items-center mr-2"
            @click="() => updateMissionLevel()"
          >
            <v-icon color="#fff">mdi-check</v-icon>
            <span v-if="!loading" class="mx-2"> Valider </span>
            <span v-if="loading" class="mx-2"> Loading ... </span>
          </v-btn>
          <v-btn
            v-if="isMinister"
            :disabled="disabled()"
            class="btn bg-pending d-flex align-items-center mr-2"
            @click="() => pendingMissionOrder()"
          >
            <v-icon color="#fff">mdi-account-clock-outline</v-icon>
            <span v-if="!pending" class="mx-2"> Mettre en attente </span>
            <span v-if="pending" class="mx-2"> Loading ... </span>
          </v-btn>
          <v-btn
            v-if="isRejectUser"
            :disabled="disabled()"
            class="btn btn-danger d-flex align-items-center mr-2"
            @click="() => Onrejected()"
          >
            <v-icon color="#fff">mdi-check</v-icon>
            <span class="mx-2"> Rejetter </span>
          </v-btn>
        </div>
      </div>
      <div class="sum-state-header-title d-flex justify-content-between"></div>
    </div>
    <div v-if="rejected" class="rejected" @click="() => Onrejected()">
      <form class="right" @click="(e) => e.stopPropagation()">
        <div class="title">
          Veillez entre votre raison pour rejété cet Etat de somme :
        </div>
        <textarea v-model="message" class="input mt-3 py-2" />
        <v-btn class="btn p-3 bg-success" @click="() => rejectMissionOrder()">
          <span v-if="!loading">sauvegarder</span>
          <span v-if="loading">loading ...</span>
        </v-btn>
      </form>
    </div>

    <TableSumState v-if="sumState.length > 0" :data="sumState" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { levels, nextLevel, rejectedLevels } from '~/utils'

export default {
  name: 'SingleSumState',
  layout: 'dashboard',
  data() {
    return { rejected: false, loading: false, message: '', pending: false }
  },
  fetch() {
    this.fetchMission(this.$route.params.index)
  },
  computed: {
    ...mapGetters({
      sumState: 'sumstate/sumState',
      missionById: 'missions/missionById',
      getUserRole: 'missions/getUserRole',
    }),

    level() {
      return levels[this.getUserRole]
    },
    rejectedLevel() {
      return rejectedLevels[this.getUserRole]
    },
    missionLevel() {
      return this.mission ? this.mission.level.title : ''
    },
    verifyLevel() {
      if (this.getUserRole === 'Sous gestionnaire de compte')
        return !(this.missionLevel === this.level || this.missionLevel === 'un')
      else return !(this.missionLevel === this.level)
    },
    mission() {
      if (this.sumState.length > 0)
        return this.missionById(this.sumState[0].mission_order.id)
      return null
    },
    isVisaUser() {
      return this.getUserRole === 'Sous gestionnaire de compte'
    },
    isValidetUser() {
      return (
        this.getUserRole === 'Sous gestionnaire de compte' ||
        this.getUserRole === 'Directeur du cabinet' ||
        this.getUserRole === 'ministre' ||
        this.getUserRole === 'Conseiller financier' ||
        this.getUserRole === 'Coordonateur de la cellule financière'
      )
    },
    isMinister() {
      return this.getUserRole === 'ministre'
    },
    isRejectUser() {
      return (
        this.getUserRole === 'Directeur du cabinet' ||
        this.getUserRole === 'ministre' ||
        this.getUserRole === 'Conseiller financier' ||
        this.getUserRole === 'Coordonateur de la cellule financière'
      )
    },
  },
  methods: {
    ...mapActions({
      fetchMission: 'sumstate/fetchMission',
      updateLevel: 'missions/updateLevel',
      updateMissionOrder: 'missions/updateMissionOrder',
      filterState: 'sumstate/filterState',
    }),
    disabled() {
      return this.verifyLevel
    },
    async rejectMissionOrder() {
      this.rejected = true
      this.loading = true
      await this.updateMissionOrder({
        id: this.mission._id,
        level: this.rejectedLevel,
        message: this.message,
      })
      await this.fetchData()
      this.loading = false
      this.$toast.success("L' ordre de mission a été rejeté")
      this.$router.push('/dashboard')
    },
    async pendingMissionOrder() {
      this.pending = true
      await this.updateMissionOrder({
        id: this.mission._id,
        level: this.level,
        message: "... L' ordre de mission est en cours de traitement",
        state: 'pending',
      })
      await this.fetchData()
      this.$toast.success('Vous avez mis la mission en attente')
      this.$router.push('/dashboard')
      this.pending = false
    },
    async updateMissionLevel(type) {
      this.loading = true
      switch (this.getUserRole) {
        case 'Sous gestionnaire de compte':
          await this.updateMissionOrder({
            id: this.mission._id,
            level: nextLevel(this.level),
            message: '... la mission est en cours de validation',
            state: 'pending',
          })
          break

        default:
          await this.updateMissionOrder({
            id: this.mission._id,
            level: nextLevel(this.level),
            message: '... la mission est en cours de validation',
            state: 'pending',
          })
          break
      }
      await this.fetchData()
      this.loading = false
      this.$toast.success('La mission a été validé  ')
      this.$router.push('/dashboard')
    },
    async fetchData() {
      await this.$store.dispatch('missions/fetchMissions')
      await this.$store.dispatch('missions-functions/fetchFunctions')
    },
    filterCost(newValue, obj) {
      const cost =
        parseInt(newValue.cost) -
        parseInt(newValue.go_pass_and_covid_test) -
        parseInt(newValue.mission_representation_cost) -
        parseInt(newValue.travel_costs)

      const newCost =
        parseInt(cost) +
        parseInt(obj.go_pass_and_covid_test) +
        parseInt(obj.mission_representation_cost) +
        parseInt(obj.travel_cost)

      // console.log({ ...newValue, cost: newCost, ...obj })
      return { ...newValue, cost: newCost, ...obj }
    },
    Onrejected() {
      this.rejected = !this.rejected
    },
    goToUpdateMission() {
      this.$router.push({
        name: '/dashboard/missions/update',
        params: { id: this.mission._id },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.single-sum-state {
  z-index: -1;
  padding: 10px 50px;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;

  @media (max-width: 992px) {
    padding: 10px;
  }
  .bg-pending {
    background-color: $primary;
    color: $white;
  }
}
.rejected {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.35);
  .right {
    width: 40%;
    height: 100%;
    margin-left: 60%;
    background: white;
    padding: 30px;
    animation: content 1s ease;
    .title {
      color: black;
      width: 100%;
      font-weight: bolder;
      text-align: left;
    }
    .input {
      height: 200px;
      width: 100%;
      border: none;
      border-radius: 0px;
      background: rgba(0, 0, 0, 0.35);
    }
    .btn {
      height: auto;
      width: 100%;
      background-color: black;
      color: white;
    }
  }
  @keyframes content {
    from {
      opacity: 0.95;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }
}
</style>
