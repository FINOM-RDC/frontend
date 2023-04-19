<template>
  <div v-if="show" id="modal" class="content">
    <div class="card">
      <form action="" class="form">
        <div class="title">
          Etat de somme de {{ itemData.users[0].username }} en ({{ setDevise }})
        </div>
        <div
          v-for="(value, key, index) in items"
          :key="index"
          class="group-input"
        >
          <input :value="key" disabled class="input" :name="key" />
          <input
            :value="value"
            :disabled="
              key !== 'Titre de Voyage' && key !== 'Frais de Representation'
            "
            class="input"
            :name="key"
            @input="handleChange"
          />
          <div class="button">
            <v-icon color="#fff">mdi-pencil</v-icon>
          </div>
        </div>
        <div
          v-for="item in additionalCost.filter((item) => item.cost)"
          :key="item.key"
          class="group-input"
        >
          <input :value="item.title" class="input" :name="item.title" />
          <input :value="item.cost" class="input" :name="item.title" />
          <div class="button">
            <v-icon color="#fff">mdi-pencil</v-icon>
          </div>
        </div>
        <div class="title">Ajouter des frais</div>
        <div class="group-input">
          <input v-model="title" class="input" name="title" />
          <input v-model="cost" class="input" name="cost" type="number" />
          <div class="button" @click="add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
              />
            </svg>
          </div>
        </div>
        <div class="croix" @click="click">Annuler</div>
        <div v-if="loading" class="save">
          <b-spinner small class="mr-1" type="grow"></b-spinner>
          sauvegarde en cours ...
        </div>
        <div v-else class="save" @click="save">sauvegarder</div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ModalUpdateEtatDeSomme',
  props: {
    sumState: {
      type: Array,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    itemData: {
      type: Object,
      default() {
        return { users: [], additional_cost: [] }
      },
    },

    items: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data: () => {
    return {
      new: { key: '', value: '' },
      loading: false,
      title: '',
      cost: '',
      datas: [],
    }
  },

  computed: {
    itemDatas() {
      return this.itemData
    },
    setDevise() {
      let value = ''
      if (this.itemDatas.mission_expensive) {
        switch (this.itemDatas.mission_expensive.devise) {
          case 'Franc':
            value = 'Franc congolais'
            break
          case 'Dollar':
            value = 'Dollar americain'
            break
          case 'Euro':
            value = 'Euro'
            break
          default:
            value = 'Franc congolais'
            break
        }
        return value
      }
      return 'Franc congolais'
    },
    setDeviseIcon() {
      let value = ''
      if (this.itemDatas.mission_expensive) {
        switch (this.itemDatas.mission_expensive.devise) {
          case 'Franc':
            value = 'Fc'
            break
          case 'Dollar':
            value = '$'
            break
          case 'Euro':
            value = '£'
            break
          default:
            value = 'Fc'
            break
        }
        return value
      }
      return 'Fc'
    },
    additionalCost() {
      if (this.itemDatas.additional_cost)
        return [...this.itemDatas.additional_cost, ...this.datas]
      return [...this.datas]
    },
  },
  created() {
    console.log(this.itemData, this.items)
    this.datas = []
  },

  methods: {
    ...mapActions({
      fetchMission: 'sumstate/fetchMission',
    }),
    async fetch() {
      await this.$store.dispatch('zones/fetchZones')
      await this.fetchMission(this.$route.params.index)
    },
    click(e) {
      this.datas = []
      this.$nuxt.$emit('cancelModal', false)
    },
    add() {
      this.datas.push({ title: this.title, cost: parseInt(this.cost) })
      this.title = ''
      this.cost = ''
    },
    handleChange(event) {
      this.$nuxt.$emit('inputChange', event, {
        ...this.items,
        _id: this.itemData._id,
      })
    },
    async save() {
      try {
        this.loading = true
        await this.$strapi.update(
          `sum-states/additional-costs/${this.itemData._id}`,
          {
            travel_costs: parseInt(this.items['Titre de Voyage']) || 0,
            mission_representation_cost:
              parseInt(this.items['Frais de Representation']) || 0,
            go_pass_and_covid_test:
              parseInt(this.items['Go pass et test covid']) || 0,
            additional_cost: this.itemDatas.additional_cost
              ? [...this.itemDatas.additional_cost, ...this.datas].filter(
                  (item) => item.cost
                )
              : [...this.datas].filter((item) => item.cost),
          }
        )
        await this.fetch()
        this.loading = false
        this.$toast.success("L'etat de somme a été modifier !!!")
      } catch (error) {
        this.loading = false
        this.$toast.error(error.message)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
#modal.content {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: right;
  align-items: center;
  color: white;
  background: rgba(0, 0, 0, 0.35);
  .cost {
    position: absolute;
    top: 50%;
    left: 10%;
    background-color: #072b49;
    padding: 50px;
    font-weight: bold;
    font-size: 2.5em;
    animation: Total 1s ease;
    transform: translatey(-50%);
  }
  .croix {
    height: 50px;
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    color: white;
    background: #072b49;
    cursor: pointer;
  }
  .save {
    height: 50px;
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    color: white;
    background: green;
    cursor: pointer;
  }
  .card::-webkit-scrollbar {
    width: 5px;
  }
  .card {
    height: 100%;
    width: 40%;
    overflow-y: scroll;
    margin-left: 60%;
    padding-top: 20px;
    animation: content 1s ease;
    background-color: white;
    .title {
      color: black;
      width: 90%;
      font-weight: bolder;
      text-align: left;
      margin: 10px 0;
      padding: 0 10px;
    }
    .form {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .group-input {
      display: flex;
      justify-content: space-evenly;
      width: 90%;
      .input {
        height: 40px;
        width: 42.5%;
        margin: 10px 0;
        border-radius: 0;
      }
      .button {
        height: 40px;
        width: 10%;
        margin: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 0;
        background-color: green;
      }
    }
  }
}
@keyframes content {
  from {
    opacity: 0.75;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
}
@keyframes Total {
  from {
    opacity: 0.75;
    transform: translateX(-100%) translatey(-50%);
  }
  to {
    opacity: 1;
    transform: translateX(0%) translatey(-50%);
  }
}
</style>
