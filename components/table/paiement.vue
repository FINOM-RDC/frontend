<template>
  <div class="payment-table mb-5">
    <b-table
      class="table-desktop"
      bordered
      striped
      hover
      :fields="columns"
      :items="items || []"
    >
    </b-table>
    <b-table
      class="table-mobile"
      stacked
      bordered
      striped
      hover
      :fields="columns"
      :items="items || []"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'TablePaiement',
  props: {
    items: {
      type: Array,
      default: () => [
        {
          mission: 'REDUIpljG',
          montant: '40 0000$',
          date: '24/juin/2022',
          statut: 'En cours',
        },
      ],
    },
  },
  data() {
    return {
      columns: ['mission', 'montant', 'date', 'statut', 'voir'],
    }
  },
}
</script>
