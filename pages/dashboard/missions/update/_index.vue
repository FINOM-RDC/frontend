<template>
  <div class="mission">
    <div
      v-if="$fetchState.pending"
      class="loading d-flex justify-content-center align-items-center h-100"
    >
      <LoadingMain />
    </div>
    <h2 v-if="!$fetchState.pending" class="mission-title">
      Modifier un ordre de mission
    </h2>
    <div v-if="!$fetchState.pending" class="mission-content card">
      <div class="mission-content__form">
        <form class="form-group" @submit.prevent="submit">
          <div class="form-group">
            <label for="title">Type de la Mission</label>

            <multi-select
              v-model="mission.type"
              :options="options.type"
              :reduce="(text) => text.value"
              label="text"
            />
          </div>

          <div v-show="mission.type === 'individual'" class="form-group">
            <label for="title">Noms de missionnaire</label>
            <multi-select
              v-model="mission.participants"
              :options="users"
              label="text"
              :reduce="(text) => text.value"
              multiple
              :selectable="() => mission.participants.length < 1"
            ></multi-select>
          </div>
          <div v-show="mission.type === 'group'" class="form-group">
            <label for="title">Chef de la mission</label>
            <multi-select
              v-model="mission.mission_manager"
              :options="users"
              label="text"
              :reduce="(text) => text.value"
              multiple
              :selectable="() => mission.participants.length < 1"
            ></multi-select>
          </div>
          <div v-show="mission.type === 'group'" class="form-group">
            <label for="title">Noms de missionnaire</label>
            <multi-select
              v-model="mission.participants"
              :options="users"
              :reduce="(text) => text.username"
              label="text"
              multiple
            />
          </div>

          <div class="d-flex justify-content-between">
            <div class="form-group middle-input">
              <label for="title">Zone de la mission</label>
              <multi-select
                v-model="mission.mission_zone"
                :options="options.zones"
                :reduce="(text) => text.title"
                label="text"
              />
            </div>
            <div class="form-group middle-input">
              <label for="destinantion">Destination</label>
              <b-input
                v-model="mission.destination"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="form-group middle-input">
              <label for="Itinéraire">Itinéraire</label>
              <input
                v-model="mission.itineraire"
                type="text"
                class="form-control"
              />
            </div>
            <div class="form-group middle-input">
              <label for="title">Prise en Charge</label>
              <multi-select
                v-model="mission.support"
                :options="options.support"
                :reduce="(text) => text.value"
                label="text"
                @input="handleSupport"
              />
            </div>
          </div>

          <div
            v-show="mission.support === 'other'"
            class="form-group middle-input"
          >
            <label for="Itinéraire">Organisation</label>
            <input
              v-model="mission.organization"
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="destinantion">Moyen de Transport</label>
            <b-input
              v-model="mission.transport"
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-group form-group--date mt-3">
            <div class="date-depart middle-input">
              <label for="date">Date de départ</label>
              <b-form-datepicker
                v-model="mission.start_date"
                placeholder="Choisir la date de départ"
                :min="min"
                :max="max"
                locale="fr"
                class="mb-2"
              ></b-form-datepicker>
            </div>
            <div class="date-depart middle-input">
              <label for="date">Date de fin</label>
              <b-form-datepicker
                v-model="mission.end_date"
                placeholder="Choisir la date"
                :min="min"
                :max="max"
                locale="fr"
                class="mb-2"
              ></b-form-datepicker>
            </div>
          </div>
          <div class="form-group">
            <p class="duration">
              <span class="form-title">Durée:</span>
              <span v-if="mission.start_date && mission.end_date">
                {{ duration === 1 ? '1 jour' : duration + ' jours' }}
              </span>
            </p>
          </div>
          <div class="form-group">
            <label for="description">Objet</label>
            <textarea
              v-model="mission.subject"
              class="form-control"
              rows="5"
              placeholder="Objet de la mission"
            ></textarea>
          </div>
          <div class="submit-btn">
            <button class="btn btn-primary" type="submit">
              <span v-if="loading">
                <b-spinner small type="grow"></b-spinner>
                Validation en cours ...
              </span>
              <span v-else> Valider </span>
            </button>
            <span v-if="validation" class="alert-message d-block">
              {{ errorMessage || error.message }}
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  numberOfDays,
  // capitalize,
  createInitialByNameAndLastName,
  validations,
} from '~/utils'

export default {
  name: 'CreateMission',
  layout: 'dashboard',
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const lastDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 15
    )

    return {
      mission: {
        id: '',
        type: '',
        mission_manager: [],
        participants: [],
        mission_zone: '',
        destination: '',
        itineraire: '',
        start_date: '',
        end_date: '',
        subject: '',
        organization: '',
        support: '',
        transport: '',
        type_paiement: '',
      },
      participants: [],
      users: [
        {
          value: '',
          text: 'Choisir le participant',
          role: '',
        },
      ],
      options: {
        type: [
          { value: 'group', text: 'Collectif' },
          { value: 'individual', text: 'Individuel' },
        ],
        support: [
          { value: 'TRESOR_PUBLIC', text: 'Trésor Public' },
          { value: 'TIERCE', text: 'Autres' },
        ],
        users: [],
        zones: [],
      },
      min: today,
      max: lastDay,

      errorMessage: '',
      validation: null,
    }
  },
  async fetch() {
    const response = await this.$strapi.findOne(
      'mission-orders',
      this.$route.params.index
    )
    const participantIDs = response.participants.map(
      (participant) => participant.id
    )

    for (const element of participantIDs) {
      const userResponse = await this.$strapi.findOne('users', element)
      this.participants.push(userResponse)
    }
    this.mission = response
  },
  computed: {
    duration() {
      return numberOfDays(this.mission.start_date, this.mission.end_date)
    },
    ...mapGetters({
      loading: 'missions/loading',
      successMessage: 'missions/successMessage',
      error: 'missions/error',
      missionCreated: 'missions/missionCreated',
    }),
  },
  created() {
    this.$fetch()
  },
  methods: {
    handleError(error) {
      this.$toast.error(error)
    },
    submit() {
      if (validations(this.mission, this.errors) === true) {
        this.$store.dispatch(
          'missions/createMission',
          this.getMissionData(this.mission)
        )
      } else {
        this.validation = true
        this.errorMessage = 'Veuillez remplir tous les champs'
      }
    },
    getUserUsernameAndRoleSelected(userSelected) {
      const user = this.users.filter((user) => user.value === userSelected)
      return `${user})`
    },
    handleSupport() {
      if (this.mission.support === 'TRESOR_PUBLIC') {
        this.mission.organization = 'TRESOR_PUBLIC'
      }
    },
    getMissionData(mission) {
      if (mission.type === 'individual') {
        const data = {
          type: mission.type,
          organization: mission.organization,
          participants: mission.participants,
          start_date: mission.start_date,
          end_date: mission.end_date,
          itinerary: mission.itineraire,
          subject: mission.subject,
          mission_zone: mission.mission_zone,
          destination: mission.destination,
          initiator: this.$strapi.user.id,
          transport: mission.transport,

          reference:
            'CAB-MIN/FIN/' +
            createInitialByNameAndLastName(
              this.$strapi.user.last_name,
              this.$strapi.user.Name
            ) +
            '/2022',
        }
        return data
      } else {
        const data = {
          type: mission.type,
          organization: mission.organization,
          participants: mission.participants,
          start_date: mission.start_date,
          end_date: mission.end_date,
          itinerary: mission.itineraire,
          subject: mission.subjet,
          mission_zone: mission.mission_zone,
          destination: mission.destination,
          initiator: this.$strapi.user.id,
          transport: mission.transport,
          reference:
            'CAB-MIN/FIN/' +
            createInitialByNameAndLastName(
              this.$strapi.user.last_name,
              this.$strapi.user.Name
            ) +
            '/2022',
          mission_manager: mission.mission_manager,
        }
        return data
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.error-message {
  color: red;
}
.mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f1f1;
  height: 200vh;
  padding: 50px;
  @media (max-width: 992px) {
    padding: 30px 10px;
  }
  &-title {
    font-size: 3rem;
    text-align: center;
    color: $primary;
    font-weight: bold;
    margin-bottom: 50px;
    @media (max-width: 992px) {
      font-size: 2rem;
    }
  }
  &-content {
    width: 90%;
    padding: 20px;
    @media (max-width: 992px) {
      width: 100%;
    }
    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      & > form {
        width: 100%;
        & > div {
          margin-bottom: 20px;
        }
      }

      & > .success-message {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 100px;
        @media (max-width: 992px) {
          padding-top: 50px;
        }
        @media (max-width: 768px) {
          padding-top: 0;
          justify-content: center;
        }
        h2 {
          font-size: 2rem;
          margin-top: 50px;
        }

        .checkmark {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: block;
          stroke-width: 2;
          stroke: #4bb71b;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #4bb71b;
          animation: fill 0.4s ease-in-out 0.4s forwards,
            scale 0.3s ease-in-out 0.9s both;
          position: relative;
          top: 5px;
          right: 5px;
          margin: 0 auto;
        }
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: #4bb71b;
          fill: #fff;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }

        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes scale {
          0%,
          100% {
            transform: none;
          }

          50% {
            transform: scale3d(1.1, 1.1, 1);
          }
        }

        @keyframes fill {
          100% {
            box-shadow: inset 0px 0px 0px 30px #4bb71b;
          }
        }
      }
      .title {
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 20px;
      }
      .form-group {
        &--date {
          display: flex;
          justify-content: space-between;
          @media (max-width: 992px) {
            flex-direction: column;
          }
        }
        .form-title {
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 20px;
        }
      }
    }
  }
}
.middle-input {
  width: calc(50% - 20px) !important;
  @media (max-width: 992px) {
    width: 100% !important;
  }
}
</style>
