<template>
  <div :class="toggle ? 'dashboard active' : 'dashboard'">
    <aside class="sidebar">
      <NavigationSidebar :toggle="toggle" />
      <NavigationMobile />
    </aside>
    <div class="content">
      <div class="menu">
        <div class="toggle-btn d-flex align-items-center">
          <div class="logo-toggle btn" @click="toggleMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
          <h3 class="welcome-title">
            {{ grettings }}, {{ (user && user.username) || 'Membre' }} !
          </h3>
        </div>
        <div class="statut-role">
          rôle :
          {{ getRole }}
        </div>

        <NavigationHorizontal />
      </div>

      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardLayout',
  data() {
    return {
      toggle: false,
      grettings: '',
    }
  },
  computed: {
    ...mapGetters({
      getMinisterFunctionById: 'missions-functions/getMinisterFunctionById',
      user: 'missions/user',
    }),
    user() {
      return this.$strapi.user
    },
    getRole() {
      const role = this.user && this.user.role && this.user.role.name
      if (role === 'Authenticated') {
        return 'Membre du cabinet'
      }
      return role
    },
  },
  mounted() {
    this.grettingsByTime()
  },
  methods: {
    toggleMenu(e) {
      e.preventDefault()
      this.toggle = !this.toggle
    },

    grettingsByTime() {
      const hour = new Date().getHours()
      if (hour < 12) {
        this.grettings = 'Bonjour'
      } else if (hour < 18) {
        this.grettings = 'Bonsoir'
      } else {
        this.grettings = 'Bonsoir'
      }
    },
    fetchUser() {
      return this.$strapi.user
    },
  },
}
</script>
<style lang="scss" scoped>
.dashboard {
  display: flex;
  height: 100vh;
  .statut-role {
    text-transform: capitalize;
    font-weight: 700;
    font-size: 1rem;
    @media (max-width: 992px) {
      display: none;
    }
  }

  .sidebar {
    width: 250px;
    @media (max-width: 991px) {
      width: 0 !important;
    }
  }
  .content {
    flex: 1;

    .menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      z-index: 2000;

      .logo-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100px;
        @media (max-width: 991px) {
          width: 0;
          justify-content: flex-start;
          svg {
            display: none;
          }
        }
        .welcome-title {
          margin-left: 10px;
          color: $primary;
          font-size: 1rem !important;
          line-height: 1.2;
          font-weight: 500;
          @media (max-width: 991px) {
            font-size: 16px;
          }
        }
      }
    }
  }
  &.active {
    .sidebar {
      width: 100px;
    }
    .content {
      .menu {
        padding: 10px;
      }
    }
  }
}
</style>
