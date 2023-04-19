<template>
  <div class="mission">
    <h2 class="mission-title">Initier un ordre de mission</h2>
    <div class="mission-content card">
      <div class="mission-content__form">
        <form class="form-group" @submit.prevent="submit">
          <div class="form-group">
            <label for="title">Type de la Mission</label>

            <multi-select
              v-model="mission.type"
              :options="options.type"
              :reduce="(text) => text.value"
              label="text"
              @input="handleType"
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
            <label for="title">Noms de missionnaire</label>
            <multi-select
              v-model="mission.participants"
              :options="users"
              :reduce="(text) => text.value"
              label="text"
              multiple
            />
          </div>
          <div v-show="mission.type === 'group'" class="form-group">
            <label for="title">Chef de la mission</label>
            <multi-select
              v-model="mission.mission_manager"
              :options="toSelect()"
              label="text"
              :reduce="(text) => text.value"
              :disabled="mission.participants.length < 1"
              :selectable="() => mission.participants.length > 1"
            ></multi-select>
          </div>

          <div class="d-flex justify-content-between">
            <div class="form-group middle-input">
              <label for="title">Zone de la mission</label>
              <multi-select
                v-model="mission.zone"
                :options="options.zones"
                :reduce="(text) => text.value"
                label="text"
                @input="handleZone"
              />
            </div>
            <div class="form-group middle-input">
              <label for="destinantion">Destination</label>
              <multi-select
                v-model="mission.destination"
                :options="currentDestination()"
                :reduce="(text) => text"
                label="text"
                multiple
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
              <div v-if="mission.support === 'TIERCE'" class="form-group pt-3">
                <label for="Itinéraire">Organisation</label>
                <input
                  v-model="mission.organization"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="destinantion">Moyen de Transport</label>
            <multi-select
              v-model="mission.transport"
              :options="options.transport"
              :reduce="(text) => text.value"
              label="text"
              @input="handleSupport"
            />
          </div>
          <v-radio-group v-model="dateType" row>
            <v-radio
              label="Date"
              :value="true"
              name="toggle"
              @change="() => handleRadio(true)"
            ></v-radio>
            <v-radio
              label="Jour"
              name="toggle"
              :value="false"
              @change="() => handleRadio(false)"
            ></v-radio>
          </v-radio-group>
          <div v-if="dateType" class="form-group form-group--date">
            <div class="date-depart middle-input">
              <label for="date">Date de départ</label>
              <b-form-datepicker
                v-model="mission.start_date"
                placeholder="Choisir la date de départ"
                :min="min"
                :max="max"
                locale="fr"
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
              ></b-form-datepicker>
            </div>
          </div>
          <div v-if="!dateType" class="col-12">
            <div class="form-group">
              <label for="dure">Durée</label>
              <b-input
                id="dure"
                v-model="mission.duration"
                type="number"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group">
            <p class="duration">
              <span class="form-title">Durée:</span>
              <span
                v-if="
                  mission.start_date && mission.end_date && dateType === true
                "
              >
                {{ duration === 1 ? '1 jour' : duration + ' jours' }}
              </span>
              <span v-if="mission.duration !== '' && dateType === false">
                {{
                  mission.duration === 1
                    ? '1 jour'
                    : mission.duration + ' jours'
                }}
              </span>
            </p>
          </div>
          <div class="form-group">
            <label for="description">Objet</label>
            <textarea
              v-model="mission.subjet"
              class="form-control"
              rows="5"
              placeholder="Objet de la mission"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="description"
              >Uploader un soubassement (facultatif)</label
            >
            <b-form-file
              v-model="mission.soubassement"
              placeholder="Choisissez un fichier et déposez-le ici..."
              drop-placeholder="déposez-le ici..."
            ></b-form-file>
            <div class="mt-3">
              Nom du fichier:
              {{ mission.soubassement ? mission.soubassement.name : '' }}
            </div>
          </div>
          <div class="submit-btn">
            <button class="btn btn-success col-12 fw-bold" type="submit">
              <span v-if="loading">
                <b-spinner small type="grow"></b-spinner>
                <span class="pr-2"> Validation en cours ...</span>
              </span>
              <span v-else> Valider </span>
            </button>
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
  capitalize,
  createInitialByNameAndLastName,
  validations,
} from '~/utils'
import pays from '~/data/worldNation.js'

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
        type: '',
        mission_manager: [],
        participants: [],
        zone: 'Sur place',
        destination: '',
        itineraire: '',
        start_date: today,
        end_date: '',
        subjet: '',
        organization: '',
        support: '',
        transport: '',
        type_paiement: '',
        duration: '',
        soubassement: null,
      },
      users: [
        {
          value: '',
          text: 'Choisir le participant',
          role: '',
        },
      ],
      dateType: false,
      destinations: {
        'En Afrique': pays
          .filter((item) => item.region === 'Africa')
          .map(({ translations, name }) =>
            translations.fr ? translations.fr : name
          ),
        'En Europe': pays
          .filter((item) => item.region === 'Europe')
          .map(({ translations, name }) =>
            translations.fr ? translations.fr : name
          ),
        'En Asie': pays
          .filter((item) => item.region === 'Asia')
          .map(({ translations, name }) =>
            translations.fr ? translations.fr : name
          ),
        'En Amerique': pays
          .filter((item) => item.region === 'Americas')
          .map(({ translations, name }) =>
            translations.fr ? translations.fr : name
          ),
        'En Oceanie': pays
          .filter((item) => item.region === 'Oceania')
          .map(({ translations, name }) =>
            translations.fr ? translations.fr : name
          ),
        'Sur Place': ['Kinshasa'],
        'En Province': [
          'Kinshasa',
          'Bandundu',
          'Bas-Uele',
          'Haut-Katanga',
          'Kasai-Occidental',
          'Kasai-Oriental',
          'Kongo Central',
          'Kongo Lékoumou',
          'Kongo-Brazzaville',
          'Likouala',
          'Lomami',
          'Mai-Ndombe',
          'Maniema',
          'Nord-Kivu',
          'Sud-Kivu',
          'Orientale',
          'Sud-Ubangi',
          'Tanganyika',
        ],
      },
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
        transport: [
          {
            value: 'Avion',
            text: 'Voie Aérienne',
          },
          {
            value: 'Vehicule',
            text: 'Voie Terrestre',
          },
          {
            value: 'Bateau',
            text: 'Voie Maritime',
          },
        ],
      },
      min: today,
      max: lastDay,
      errorMessage: '',
      validation: null,
    }
  },
  async fetch() {
    const fetchUsers = await this.$strapi.find('users')
    const fetchZones = await this.$strapi.find('mission-zones')
    this.users = fetchUsers.map((user) => ({
      value: user.id,
      text: user.username,
      role: user.function,
    }))
    this.options.zones = fetchZones.map((zone) => ({
      value: zone.id,
      text: capitalize(zone.title),
    }))
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
    currentDestination() {
      const find = this.options.zones.find(
        (item) => item.value === this.mission.zone
      )
      if (find) return this.destinations[find?.text]
      return []
    },
    handleRadio(item) {
      this.mission.duration = ''
      this.mission.start_dat = false
      this.mission.end_date = false
      this.dateType = item
    },
    submit() {
      if (validations(this.mission, this.errors) === true) {
        this.$store.dispatch(
          'missions/createMission',
          this.getMissionData(this.mission)
        )
      } else {
        this.validation = true
        this.$toast.error('Veuillez remplir tous les champs')
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
    handleType() {
      this.mission.mission_manager = []
      this.mission.participants = []
    },
    handleZone() {
      this.mission.destination = []
    },
    toSelect() {
      return this.mission.participants.map((participant) => {
        return this.users.find((user) => user.value === participant)
      })
    },
    getMissionData(mission) {
      const newDate =
        mission.duration !== ''
          ? {
              start_date: false,
              end_date: false,
              duration: mission.duration,
            }
          : {
              start_date: mission.start_date,
              end_date: mission.end_date,
            }
      if (mission.type === 'individual') {
        const data = {
          type: mission.type,
          organization: mission.organization,
          participants: mission.participants,
          itinerary: mission.itineraire,
          subject: mission.subjet,
          missionZone: mission.zone,
          destination: mission.destination.join(' - '),
          initiator: this.$strapi.user.id,
          transport: mission.transport,
          ...newDate,
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
          itinerary: mission.itineraire,
          subject: mission.subjet,
          missionZone: mission.zone,
          destination: mission.destination.join(' - '),
          initiator: this.$strapi.user.id,
          transport: mission.transport,
          ...newDate,
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
  height: max-content;
  padding: 100px;
  @media (max-width: 992px) {
    padding: 30px 10px;
  }
  &-title {
    width: 97.5%;
    font-size: 2rem;
    text-align: center;
    color: $primary;
    background: white;
    font-weight: bold;
    border: 1px solid rgba(128, 128, 128, 0.159);
    border-radius: 5px;
    padding: 50px;
    margin-bottom: 30px;
  }
  &-content {
    width: 97.5%;
    padding: 20px;
    @media (max-width: 992px) {
      width: 100%;
    }
    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      padding: 20px;
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
