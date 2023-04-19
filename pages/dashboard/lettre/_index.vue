<template>
  <div>
    <div class="letter">
      <div class="letter__hearder">
        <div
          class="letter__hearder__title d-flex justify-content-between col-12 align-items-center mb-2"
        >
          <nuxt-link
            class="mx-2"
            :to="`/dashboard/missions/${getMission && getMission.id}`"
          >
            <v-btn>
              <v-icon>mdi-print</v-icon>
              Retour
            </v-btn>
          </nuxt-link>
          <v-btn dark>
            <v-icon>mdi-print</v-icon>
            Imprimer
          </v-btn>
        </div>
        <div v-if="getMission" class="letter__content">
          <div class="letter__content-header">
            <p class="references">
              {{ getMission.reference }}
            </p>
          </div>
          <div class="letter__content-title">
            <h2>
              ORDRE DE MISSION
              <span class="type">{{
                translateInFrenchType(getMission.type)
              }}</span>
              N° .......
            </h2>
          </div>
          <div class="letter__content-body">
            <p class="first-paragraph">
              {{
                getMission.type === 'group'
                  ? 'Les personnes dont les noms et qualités ci-dessous sont désignées'
                  : 'La personne dont les noms et qualité ci-dessous est désignée'
              }}
              pour effectuer une mission officielle au
              {{ getMission.destination }} suivant les descriptions ci-après. Il
              s'agit de :
            </p>
            <ol class="participants">
              <li
                v-for="(participant, index) in getMission.participants"
                :key="index"
              >
                <p>
                  {{ participant.username }} /
                  <span class="qualification">
                    {{
                      participant.minister_function.type || participant.function
                    }}
                  </span>
                </p>
              </li>
            </ol>
            <div class="mission-content">
              <div class="item d-flex justify-content-between">
                <p>OBJET :</p>
                <p>{{ getMission.subject }}</p>
              </div>
              <div class="item d-flex justify-content-between">
                <p>DESTINATION :</p>
                <p>{{ getMission.destination }}</p>
              </div>
              <div class="item d-flex justify-content-between">
                <p>ITINERAIRE :</p>
                <p>{{ getMission.itinerary }}</p>
              </div>
              <div class="item d-flex justify-content-between">
                <p>DURÉE :</p>
                <p>
                  {{ duration }}
                  {{ duration === 1 ? ' Jour' : 'Jours' }}
                </p>
              </div>
              <div class="item d-flex justify-content-between">
                <p>DATE DE DEPART :</p>
                <p>{{ startDate }}</p>
              </div>
              <div class="item d-flex justify-content-between">
                <p>DATE DE RETOUR :</p>
                <p>{{ endDate }}</p>
              </div>
              <div class="item d-flex justify-content-between">
                <p>MOYEN DE TRANSPORT :</p>
                <p>{{ getMission.transport }}</p>
              </div>
              <div class="item d-flex justify-content-between">
                <p>FRAIS DE MISSION :</p>
                <p>A charge du {{ trimUnderscore(getMission.organization) }}</p>
              </div>
            </div>
          </div>
          <div class="letter__content-footer">
            <p>
              Les autorités tant civiles, militaires, de la Police Nationale
              Congolaise, des services spéciaux que diplomatiques, sont priées
              d'apporter l'assistance nécessaire aux intéressés pour
              l'accomplissement de leur mission.
            </p>
            <p class="signature">Nicolas KAZADI KADIMA-NZUZI</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  translateInFrenchType,
  numberOfDays,
  formatDate,
  trimUnderscore,
} from '~/utils'
export default {
  name: 'SingleLetter',

  layout: 'dashboard',

  computed: {
    ...mapGetters({
      user: 'auth/user',
      missionById: 'missions/missionById',
      getUserRole: 'missions/getUserRole',
      getMinisterFunctionById: 'missions-functions/getMinisterFunctionById',
    }),
    duration() {
      return numberOfDays(this.getMission.start_date, this.getMission.end_date)
    },
    startDate() {
      return formatDate(this.getMission.start_date)
    },
    endDate() {
      return formatDate(this.getMission.end_date)
    },
    getMission() {
      return this.missionById(this.$route.params.index)
    },
  },

  methods: {
    translateInFrenchType,
    trimUnderscore,
  },
}
</script>
<style lang="scss" scoped>
.letter {
  padding: 50px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  font-family: 'Garamond', sans-serif !important;
  @media (max-width: 768px) {
    padding: 20px;
    display: none;
  }
  &__hearder {
    &__title {
      h1 {
        font-size: 1.5rem;
        font-weight: 600;
        color: $primary;
        margin-bottom: 30px;
        font-family: 'Garamond', sans-serif !important;
        @media (max-width: 768px) {
          font-size: 1rem;
        }
      }
    }
  }
  &__content {
    padding: 2.5cm;
    background: #fff;
    border-radius: 5px;
    font-family: 'Garamond', sans-serif !important;
    width: 100%;
    height: 29.7cm;
    margin-top: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    @media (max-width: 768px) {
      width: 100%;
      height: auto;
    }
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5cm;
      font-family: 'Garamond', sans-serif !important;
      .references {
        margin-left: 2.5cm;
        font-size: 13pt;

        text-align: justify;
        font-family: 'Garamond', sans-serif !important;
      }
      .date {
        margin-right: 2cm;
        text-align: justify;
        font-family: 'Garamond', sans-serif !important;
      }
    }
    &-title {
      margin-top: 1cm;
      font-family: 'Garamond', sans-serif !important;
      h2 {
        font-size: 13pt;
        text-align: center;
        text-transform: uppercase;
        text-decoration: underline;
        font-weight: 600;
        font-family: 'Garamond', sans-serif !important;
      }
    }
    &-body {
      margin-top: 0.5cm;
      p {
        font-size: 12pt;
        line-height: 1.5;
        text-align: justify;
        font-family: 'Garamond', sans-serif !important;
      }
      ol {
        list-style: number !important;
        list-style-type: decimal !important;
        padding: 0;
        text-align: justify;
        margin: 0.5cm 0 0;
        li {
          margin-bottom: 0.1cm;
          font-family: 'Garamond', sans-serif !important;
          p {
            margin-bottom: 0;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 13pt;
            text-align: justify;
            font-family: 'Garamond', sans-serif !important;
            span {
              font-weight: 400 !important;
              text-transform: capitalize;
              font-family: 'Garamond', sans-serif !important;
            }
          }
        }
      }
      .mission-content {
        margin-top: 1cm;
        .item {
          p:first-child {
            font-weight: 600;
            font-size: 13pt;
            text-align: justify;
            font-family: 'Garamond', sans-serif !important;
          }
        }
      }
    }
    &-footer {
      margin-top: 1cm;
      p {
        font-size: 12pt;
        line-height: 1.5;
        text-align: justify;
        font-family: 'Garamond', sans-serif !important;
      }
      .signature {
        text-align: center;
        font-size: 13pt;
        font-weight: 600;
        font-style: italic;
        margin-top: 1cm;
        font-family: 'Garamond', sans-serif !important;
      }
    }
  }
}
</style>
