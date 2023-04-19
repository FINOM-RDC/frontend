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
        <div class="download-btn col-md-12 col-lg-4 my-2">
          <v-btn class="btn btn-detail__download" elevation="1"
            ><v-icon dark right class="mx-2"> mdi-download </v-icon> Exporter en
            CSV</v-btn
          >
        </div>
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
          {{ parseDateIso(item.start_date) }}
        </template>

        <template #[`item.type`]="{ item }">
          {{ item.type === 'group' ? 'Collectif' : 'Individuel' }}
        </template>
        <template #[`item.state`]="{ item }">
          {{ validateStatus(item.state) }}
        </template>
        <template #[`item.mission_zone`]="{ item }">
          {{
            replaceUnderscoreBySpace(
              item.mission_zone && item.mission_zone.title
            )
          }}
        </template>
        <template #[`item.id`]="{ item }">
          <nuxt-link :to="`/dashboard/missions/${item.id}`" prefetch>
            <v-btn class="btn btn-detail" elevation="1"> Voir Plus </v-btn>
          </nuxt-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TableAccountManager',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'References',
          align: 'left',
          value: 'reference',
        },
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

  methods: {
    parseDateIso(date) {
      const dateParsed = new Date(date)
      return `${dateParsed.getDate()}/${
        dateParsed.getMonth() + 1
      }/${dateParsed.getFullYear()}`
    },
    validateStatus(state) {
      switch (state) {
        case 'pending':
          return 'En cours'
        case 'validated':
          return 'Validé'
        case 'rejected':
          return 'Rejeté'
        case 'canceled':
          return 'Annulé'
        default:
          return 'En cours'
      }
    },
    replaceUnderscoreBySpace(str) {
      return str.replace('_', ' ')
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
}
</style>
