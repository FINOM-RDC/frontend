/* eslint-disable vue/valid-v-slot */
<template>
  <div class="missions-table mb-5">
    <v-card>
      <v-card-title class="table-search">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          single-line
          hide-details
          class="searchfield"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        loading
        loading-text="Chargement... Veuillez patienter."
        no-data-text="Aucune donnée disponible."
        :footer-props="{ itemsPerPageText: 'Ligne par Page' }"
        sort-by-text="Filtré par"
        locale="fr-FR"
        :calculate-widths="true"
      >
        <template #[`item.start_date`]="{ item }">
          {{
            formatDate(item.start_date) === '1 janvier 1970'
              ? 'Open'
              : formatDate(item.start_date)
          }}
        </template>

        <template #[`item.type`]="{ item }">
          {{ item.type === 'group' ? 'Collectif' : 'Individuel' }}
        </template>
        <template #[`item.state`]="{ item }">
          <div :class="bgColor(item.state, item) + ' state'">
            {{ validateStatus(item.state, item) }}
          </div>
        </template>
        <template #[`item.mission_zone`]="{ item }">
          {{
            replaceUnderscoreBySpace(
              item.mission_zone && item.mission_zone.title
            )
          }}
        </template>
        <template #[`item.id`]="{ item }">
          <nuxt-link
            v-if="item.level.title !== 'six' || !isComptable"
            :to="`/dashboard/missions/${item.id}`"
            prefetch
          >
            <v-btn class="btn btn-detail" elevation="1"> Voir en détail </v-btn>
          </nuxt-link>
          <v-btn
            v-if="item.level.title === 'six' && isComptable"
            class="btn btn-detail"
            elevation="1"
            @click="() => validetPaiement(item)"
          >
            <span v-if="!loading" class="mx-2"> payé</span>
            <span v-if="loading" class="mx-2"> Loading ... </span>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate, validateStatus } from '~/utils'
export default {
  name: 'TableInitial',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      headers: [
        {
          text: 'Initiateur',
          value: 'initiator.username',
        },
        {
          text: 'Zone',
          value: 'mission_zone',
        },
        {
          text: 'Date de départ',
          value: 'start_date',
        },

        {
          text: 'Type',
          value: 'type',
        },
        {
          text: 'Statut',
          value: 'state',
        },
        {
          text: 'Traitement',
          value: 'level.description',
        },
        {
          text: 'Voir Plus',
          value: 'id',
        },
      ],
      search: '',
    }
  },
  computed: {
    ...mapGetters({
      getUserRole: 'missions/getUserRole',
      missionById: 'missions/missionById',
      getMinisterFunctionById: 'missions-functions/getMinisterFunctionById',
    }),
    isComptable() {
      return this.getUserRole === 'comptable'
    },
  },

  methods: {
    parseDateIso(date) {
      if (!date) return 'Open'
      else {
        const dateParsed = new Date(date)
        return `${dateParsed.getDate()}/${
          dateParsed.getMonth() + 1
        }/${dateParsed.getFullYear()}`
      }
    },
    validateStatus,
    formatDate,
    replaceUnderscoreBySpace(str) {
      return str.replace('_', ' ')
    },
    async validetPaiement(item) {
      this.loading = true
      try {
        const { message } = await this.$strapi.update(
          'sum-states/payed/' + item.id
        )
        this.$toast.show(message)
      } catch ({ message }) {
        this.$toast.error(message)
      }
      this.loading = false
    },
    bgColor(state, item) {
      if (item) {
        if (item.level.title === 'six' || item.level.title === 'onze') {
          return 'bg-validated'
        } else if (
          item.level.title === 'sept' ||
          item.level.title === 'neuf' ||
          item.level.title === 'huit'
        ) {
          return 'bg-rejected'
        }
      }
      switch (state) {
        case 'pending':
          return 'bg-pending'
        case 'validated':
          return 'bg-validated'
        case 'rejected':
          return 'bg-rejected'
        case 'inProgress':
          return 'bg-inProgress'
        case 'finished':
          return 'bg-finished'
        default:
          return 'bg-pending'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.missions-table {
  margin: 20px 0;

  .v-card {
    padding: 20px;

    .download-btn {
      width: 50%;
      display: flex;
      justify-content: flex-end;
      @media (max-width: 992px) {
        width: 100%;
      }
    }

    .btn-detail {
      background-color: $green;
      color: $white;
      border-radius: 0;
      &__download {
        background-color: $primary;
        color: $white;
        justify-self: end;
        @media (max-width: 768px) {
          width: 100%;
        }
      }
    }
  }
  .state {
    padding: 5px 10px;
    border-radius: 5px;
    color: $white;
    &.bg-pending {
      background-color: $yellow;
    }
    &.bg-validated {
      background-color: $green;
    }
    &.bg-rejected {
      background-color: $red;
    }
    &.bg-inProgress {
      background-color: $blue;
    }
  }
}
</style>
