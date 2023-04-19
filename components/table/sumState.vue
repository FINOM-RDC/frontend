<template>
  <div class="sum-state">
    <div class="sum-state__title">
      <h2 class="text-left title">
        Etat des sommes à payer rélatif à une mission
        <span>
          {{
            (data[0] && getZoneById(data[0].mission_order.mission_zone).title
              ? getZoneById(
                  data[0].mission_order.mission_zone
                ).title.toLowerCase()
              : '') || ''
          }}</span
        >
        suivant l'ordre de mission
        <span>{{
          data[0] && getTranslateType(data[0].mission_order.type)
        }}</span>
      </h2>
      <p class="description text-left">
        N° <span>{{ data[0] && data[0].mission_order.reference }}</span> du
        <span>{{
          data[0] && formatDate(data[0].mission_order.start_date)
        }}</span>
      </p>
    </div>
    <div class="sum-state-table mt-3">
      <v-data-table
        :headers="headers"
        :items="data && data"
        loading
        loading-text="Chargement... Veuillez patienter."
        no-data-text="Aucune donnée disponible."
        :footer-props="{ itemsPerPageText: 'Ligne par Page' }"
        sort-by-text="Filtré par"
        locale="fr-FR"
        :calculate-widths="true"
        class="elevation-2"
      >
        <template #[`item.covid`]="{ item }">
          <span>{{ item.covid || getCurrencyFormat(156435) }}</span>
        </template>
        <template #[`item.unit_price`]="{ item }">
          <span>{{ getCurrencyFormat(item.unit_price) }}</span>
        </template>
        <template #[`item.cost`]="{ item }">
          <span>{{ getCurrencyFormat(item.cost) }}</span>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            color="'green'"
            @click="
              () => {
                editItem(item)
              }
            "
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </div>
    <ModalUpdateEtatDeSomme
      :show="show"
      :item-data="itemData"
      :sum-state="data"
      :items="items"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { translateInFrenchType } from '~/utils'

export default {
  name: 'TabeSumState',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    headers: [
      {
        text: 'Noms de participants',
        align: 'start',
        sortable: false,
        value: 'users[0].username',
      },
      { text: 'Fonction', value: 'users[0].function' },
      { text: 'Nombre de Jours', value: 'duration' },
      { text: 'Total', value: 'cost' },
      { text: 'statut', value: 'state' },
      { text: 'Actions', value: 'actions' },
    ],
    show: false,
    items: {
      type: Object,
      default(rawProps) {
        return { name: 'hello' }
      },
    },
    itemData: {},
    editedIndex: -1,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nouveau frais' : 'Editer les frais'
    },
    ...mapGetters({
      getZoneById: 'zones/getZoneById',
    }),
  },
  created() {
    this.$nuxt.$on('cancelModal', ($event) => {
      this.show = !this.show
    })

    this.$nuxt.$on('inputChange', (event) => {
      this.items = { ...this.items, [event.target.name]: event.target.value }
    })
    this.$nuxt.$on('update-items', ($event) => {})
  },
  methods: {
    ...mapActions({
      fetchZones: 'zones/fetchZones',
    }),
    editItem(item) {
      this.$nuxt.$emit('cancelModal', item)
      this.itemData = item
      this.items = {
        'Frais de mission': item.unit_price,
        'Go pass et test covid': item.mission_expensive.go_pass_and_covid_test,
        'Frais de Representation': item.mission_representation_cost,
        'Titre de Voyage': item.travel_costs,
      }
    },
    deleteItem(item) {},

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    getTranslateType(str) {
      return translateInFrenchType(str)
    },
    getCurrencyFormat(number) {
      return number
    },
    formatDate(date) {
      const dateFormat = new Date(date)
      return new Intl.DateTimeFormat('fr-Fr').format(dateFormat)
    },
  },
}
</script>
<style lang="scss" scoped>
.sum-state {
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: $primary;
  }
}
.update::disabled {
  cursor: not-allowed;
}
.container {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  padding: 30px 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.239);
}
</style>
