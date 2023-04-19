<template>
  <div v-if="mission" class="details-missions">
    <div class="actions">
      <button
        class="btn btn-primary d-flex align-items-center"
        @click="$router.go(-1)"
      >
        <v-icon color="#fff">mdi-arrow-left-bold</v-icon>
        <span class="mx-2"> Retour </span>
      </button>

      <div class="d-flex justify-between">
        <div v-if="isSumStateUser" class="sum-states-actions">
          <NuxtLink
            :to="'/dashboard/etat-des-sommes/' + mission.id"
            class="btn btn-danger d-flex align-items-center mr-0"
            @click="goToSumState"
          >
            <v-icon color="#fff">mdi-cash-multiple</v-icon>
            <span class="mx-2"> Voir L'état de somme </span>
          </NuxtLink>
        </div>
        <div v-if="isVisaUser" class="visa-actions">
          <button
            dis
            class="btn btn-success d-flex align-items-center"
            @click="() => updateMissionLevel()"
          >
            <v-icon color="#fff">mdi-eye-check</v-icon>
            <span v-if="!loading" class="mx-2"> Viser </span>
            <span v-if="loading" class="mx-2"> Loading ... </span>
          </button>
        </div>
      </div>
    </div>
    <div
      class="missions-headers d-flex justify-content-between align-items-center my-2"
    >
      <h2 class="title">
        Références : <span>{{ mission.reference }}</span>
      </h2>
      <div class="statut-infos d-flex justify-center">
        <v-alert class="p-2 mr-2" outlined>
          Initié par : <span>{{ mission.initiator.username }}</span>
        </v-alert>
        <v-alert class="p-2 mr-2" outlined type="success">
          Traitement : <span>{{ mission.level.description }}</span>
        </v-alert>
        <v-alert class="btn btn-primary p-2" outlined>
          <nuxt-link
            :to="'/dashboard/lettre/' + mission.id"
            class="text-light d-flex align-items-center justify-content-between"
          >
            <v-icon color="#fff">mdi-file-eye</v-icon>
            <span class="mr-2">Voir la lettre</span>
          </nuxt-link>
        </v-alert>
      </div>
    </div>
    <div class="mission py-4">
      <div class="informations">
        <v-card>
          <v-toolbar color="#04acec" dark dense flat>
            <v-toolbar-title>
              <span class="title">Informations</span>
            </v-toolbar-title>
          </v-toolbar>
          <div>
            <div class="d-flex justify-content-between p-3">
              <span class="key">Type : </span>
              <span class="value"> {{ type }}</span>
            </div>
            <div class="d-flex justify-content-between p-3">
              <span class="key">Zone : </span>
              <span class="value"> {{ zone }}</span>
            </div>
            <div class="d-flex justify-content-between p-3">
              <span class="key">Destination : </span>
              <span class="value"> {{ destination }}</span>
            </div>
            <div class="d-flex justify-content-between p-3">
              <span class="key">Itinéraire : </span>
              <span class="value"> {{ itineraire }}</span>
            </div>
            <div class="d-flex justify-content-between p-3">
              <span class="key">Nombre de jours : </span>
              <span class="value"> {{ duration }}</span>
            </div>
            <div class="d-flex justify-content-between p-3">
              <span class="key">Date de départ : </span>
              <span class="value"> {{ start_date }}</span>
            </div>
            <div class="d-flex justify-content-between p-3">
              <span class="key">Date de Retour : </span>
              <span class="value"> {{ end_date }}</span>
            </div>
            <div class="d-flex justify-content-between p-3">
              <span class="key">Moyen de Transport : </span>
              <span class="value"> {{ transport }}</span>
            </div>
            <div class="d-flex justify-content-between p-3">
              <span class="key">Prise en Charge : </span>
              <span class="value"> {{ organization }}</span>
            </div>
            <div class="d-flex justify-content-between p-3">
              <span class="key">Objet de la mission : </span>
              <span class="value"> {{ objet }}</span>
            </div>
          </div>
        </v-card>
      </div>
      <div class="missionnaires">
        <v-card>
          <v-toolbar color="#04acec" dark dense flat>
            <v-toolbar-title>
              <span class="title">Missionnaires</span>
            </v-toolbar-title>
          </v-toolbar>
          <div v-if="type === 'COLLECTIF'" class="mission_manager p-3">
            <div class="d-flex justify-content-between align-items-center">
              <span class="key">Nombre de missionnaires : </span>
              <span class="value"> {{ participants.length }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <span class="key">Chef de mission : </span>
              <span class="value"> {{ manager }}</span>
            </div>
          </div>
          <div class="participants p-3">
            <h3 class="participants-title">La liste des missionnaires</h3>
            <div class="p-3">
              <v-list dense>
                <v-list-item
                  v-for="(participant, index) in participants"
                  :key="index"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="value">
                        <span class="mr-2 name">{{ index + 1 }}. </span>
                        <span class="name"> {{ participant.username }}</span> /
                        <span class="function">{{
                          (participant &&
                            getFunction(participant.minister_function)) ||
                          '...'
                        }}</span>
                      </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <div
              v-if="mission.state == 'rejected'"
              class="d-flex justify-content-between align-items-center"
            >
              <span class="key">Comentaire : </span>
              <span class="value"> {{ comment }}</span>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  translateInFrenchType,
  trimUnderscore,
  convertNumberToLetter,
  formatMissionDate,
  levels,
  nextLevel,
} from '~/utils'
export default {
  name: 'DetailsMissions',
  layout: 'dashboard',
  data() {
    return {
      loading: false,
      btnCanVueBy: [
        'Sous gestionnaire de compte',
        'Coordonnateur de la cellule financière',
        'Conseiller financier',
        'comptable',
      ],
    }
  },

  computed: {
    ...mapGetters({
      getUserRole: 'missions/getUserRole',
      missionById: 'missions/missionById',
      getMinisterFunctionById: 'missions-functions/getMinisterFunctionById',
    }),
    level() {
      return levels[this.getUserRole]
    },
    isPayed() {
      return levels[this.getUserRole] === 'onze'
    },
    missionLevel() {
      return this.mission.level.title
    },
    mission() {
      return this.missionById(this.$route.params.detail)
    },
    isComptable() {
      return this.getUserRole === 'comptable'
    },
    isVisaUser() {
      return (
        this.getUserRole === 'Conseiller administratif' &&
        this.missionLevel === 'un'
      )
    },
    isValidatedUser() {
      return (
        this.getUserRole === 'Directeur du cabinet' ||
        this.getUserRole === 'ministre'
      )
    },
    isSumStateUser() {
      const missionstate = this.mission && this.mission.state === 'validated'
      const usersToShow = this.btnCanVueBy.find(
        (item) => item === this.getUserRole
      )
      return missionstate || usersToShow || this.isValidatedUser
    },
    type() {
      return (
        this.mission && translateInFrenchType(this.mission.type).toUpperCase()
      )
    },
    zone() {
      return (
        this.mission &&
        trimUnderscore(this.mission.mission_zone.title).toUpperCase()
      )
    },
    destination() {
      return this.mission && this.mission.destination.toUpperCase()
    },
    itineraire() {
      return this.mission && this.mission.itinerary.toUpperCase()
    },

    duration() {
      if (this.mission && this.mission.sum_states[0].duration === '1') {
        return (
          convertNumberToLetter(this.mission.sum_states[0].duration) +
          `(1) jour`
        )
      } else {
        return (
          convertNumberToLetter(this.mission.sum_states[0].duration || 0) +
          ` (${this.mission.sum_states[0].duration || 0})  jours`
        )
      }
    },
    start_date() {
      return formatMissionDate(this.mission && this.mission.start_date)
    },
    end_date() {
      return formatMissionDate(this.mission && this.mission.end_date)
    },
    transport() {
      return this.mission && this.mission.transport.toUpperCase()
    },
    organization() {
      return (
        this.mission && trimUnderscore(this.mission.organization).toUpperCase()
      )
    },
    objet() {
      return this.mission && this.mission.subject
    },
    participants() {
      return this.mission && this.mission.participants
    },
    manager() {
      return this.mission && this.mission.mission_manager.username.toUpperCase()
    },
    comment() {
      return this.mission.state === 'rejected'
        ? this.mission.comment
        : 'Non definis'
    },
  },
  created() {
    this.$store.dispatch('missions-functions/fetchFunctions')
  },
  methods: {
    ...mapActions({
      updateLevel: 'missions/updateLevel',
    }),
    getFunction(id) {
      return this.getMinisterFunctionById(id)
    },
    async updateMissionLevel() {
      this.loading = true
      await this.updateLevel({
        id: this.mission.id,
        level: nextLevel(this.level),
        message: 'Vous avez visé la mission',
      })
      this.loading = false
    },
    async validetPaiement() {
      this.loading = true
      try {
        const { message } = await this.$strapi.update(
          'sum-states/payed/' + this.mission.id
        )
        this.$toast.show(message)
      } catch ({ message }) {
        this.$toast.error(message)
      }
      this.loading = false
    },
    goToUpdateMission() {
      this.$router.push({
        name: '/dashboard/missions/update',
        params: { id: this.mission.id },
      })
    },
    goToSumState() {
      this.$router.push({
        name: '/dashboard/etat-des-sommes/',
        params: { index: this.mission.id },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.details-missions {
  padding: 50px;
  @media (max-width: 768px) {
    padding: 20px;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      margin-right: 10px;
      &.bg-pending {
        background-color: $primary;
        color: $white;
        margin: 0 10px;
      }
    }
  }
  .mission {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    .value {
      font-weight: bold;
      color: $primary;
    }
  }
  .missions-headers {
    .title {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  .name {
    font-weight: bold;
    font-size: 1rem;
    line-height: 120%;
    color: $primary;
    text-transform: uppercase;
  }
  .function {
    font-size: 1rem;
    line-height: 120%;
    color: $primary;
  }
}
</style>
