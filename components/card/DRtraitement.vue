<template>
  <div class="card-infos">
    <div class="card-content">
      <div class="card card-generated" @click="handleClick('pending')">
        <div class="card-number">
          <h2 class="number">{{ traitements && traitements.length }}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="40"
            height="40"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"
            />
          </svg>
        </div>
        <div class="title">
          <h2>
            <span>{{
              traitements && traitements.length === 1
                ? 'Ordre de mission à traité'
                : 'Ordres de mission à traités'
            }}</span>
          </h2>
        </div>
      </div>
      <div class="card card-validated" @click="handleClick('validated')">
        <div class="card-number">
          <h2 class="number">{{ (traiteds && traiteds.length) || 0 }}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="40"
            height="40"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 48 48"
          >
            <g fill="currentColor">
              <path
                d="M32.707 22.707a1 1 0 0 0-1.414-1.414L24 28.586l-3.293-3.293a1 1 0 0 0-1.414 1.414L24 31.414l8.707-8.707Z"
              />
              <path
                fill-rule="evenodd"
                d="M38 15v21a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h11l10 10Zm-10 1a1 1 0 0 1-1-1V7H17a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V16h-8Zm1-7.172L34.172 14H29V8.828Z"
                clip-rule="evenodd"
              />
              <path d="M12 11v27a3 3 0 0 0 3 3h19v2H15a5 5 0 0 1-5-5V11h2Z" />
            </g>
          </svg>
        </div>
        <div class="title">
          <h2>
            <span>{{
              traiteds && traiteds.length === 1
                ? 'Ordre de mission traité'
                : 'Ordres de mission traités'
            }}</span>
          </h2>
        </div>
      </div>
    </div>

    <div class="missions-orders mt-5">
      <div v-show="active === 'pending'">
        <div class="missions-orders__header">
          <h2>les Ordres de mission à traité</h2>
        </div>
        <div class="table-missions-orders">
          <TableSousGest :items="traitements" />
        </div>
      </div>
      <div v-show="active === 'validated'">
        <div class="missions-orders__header">
          <h2>les Ordres de mission traités</h2>
        </div>
        <div class="table-missions-orders">
          <TableSousGest :items="traiteds" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { levels, getMissionsBylevel } from '~/utils'
export default {
  name: 'CardSGtraitement',
  data() {
    return {
      active: 'pending',
      treatments: [],
      missionsTreated: [],
    }
  },

  computed: {
    ...mapGetters({
      allMissions: 'missions/allMissions',
      getUserRole: 'missions/getUserRole',
    }),
    level() {
      return levels[this.getUserRole]
    },
    traitements() {
      return getMissionsBylevel(this.allMissions, 'DR')
    },
    traiteds() {
      return getMissionsBylevel(this.allMissions, 'MN')
    },
  },
  created() {
    this.$store.dispatch('missions/fetchMissions')
  },
  methods: {
    handleClick(missions) {
      this.active = missions
    },
  },
}
</script>

<style lang="scss" scoped>
.card-content {
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .card {
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    color: $white;
    border-radius: 10px;
    cursor: pointer;
    &-number {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .number {
        font-size: 40px;
        font-weight: bold;
      }
    }
    .title {
      margin-top: 20px;
      h2 {
        font-size: 16px;
        font-weight: 500;
      }
    }
    &.card-generated {
      background: $primary;
    }
    &.card-pending {
      background: $yellow;
    }
    &.card-validated {
      background: $green;
    }
    &.card-in-progress {
      background: $red;
    }
  }
}
.missions-orders {
  &__header {
    h2 {
      font-size: 1.2rem;
      font-weight: 600;
      color: $primary;
    }
  }
}
</style>
