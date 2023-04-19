<template>
  <div class="users-table mb-5">
    <b-table
      class="table-desktop w-100"
      bordered
      striped
      hover
      :fields="columns"
      :items="items || []"
    >
      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template #cell(actions)="data">
        <div class="d-flex justify-content-between">
          <div>
            <nuxt-link
              :to="`/dashboard/users/${data.item.id}`"
              class="btn btn-sm btn-primary"
              @click="$emit('edit', data.item)"
            >
              Voir / modifier
            </nuxt-link>
            <b-button
              class="btn btn-sm btn-danger"
              @click="$emit('delete', data.item)"
            >
              Désactiver
            </b-button>
          </div>
        </div>
      </template>
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
      <template #cell(actions)="data">
        <div class="d-flex justify-content-between">
          <div>
            <nuxt-link
              :to="`/dashboard/users/${data.item.id}`"
              class="btn btn-sm btn-primary mb-2"
              @click="$emit('edit', data.item)"
            >
              Voir / modifier
            </nuxt-link>
            <b-button
              class="btn btn-sm btn-danger mb-2"
              @click="$emit('delete', data.item)"
            >
              Désactiver
            </b-button>
          </div>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'TableUsers',
  props: {
    items: {
      type: Array,
      default: () => [
        {
          id: '25678900',
          noms: 'Mechack Tambwe',
          fonction: 'Conseiller en communication',
          statut: 'Actif',
        },
        {
          id: '25678901',
          noms: 'Mechack Tambwe',
          fonction: 'Conseiller en communication',
          statut: 'Actif',
        },
        {
          id: '25678902',
          noms: 'Mechack Tambwe',
          fonction: 'Conseiller en communication',
          statut: 'Actif',
        },
      ],
    },
  },
  data() {
    return {
      columns: ['id', 'noms', 'fonction', 'statut', 'Actions'],
    }
  },
}
</script>
