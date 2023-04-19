<template>
  <div
    :class="
      toggle
        ? 'main-menu active d-flex flex-column'
        : 'main-menu  d-flex flex-column'
    "
  >
    <nuxt-link to="/dashboard" class="nav-link">
      <div
        class="logo-content d-flex align-items-center justify-content-around"
      >
        <div class="logo d-flex mt-1">
          <img
            src="/logo/logo-white.png"
            alt="Logo Finom"
            class="img-fluid"
            width="40px"
          />

          <h2 class="logo-content-title">FINOM</h2>
        </div>
      </div>
    </nuxt-link>
    <div class="menu-content">
      <ul role="nav">
        <li class="nav-item">
          <nuxt-link to="/dashboard/" class="nav-link">
            <strong></strong>
            <strong></strong>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Tableau de Bord</span>
          </nuxt-link>
        </li>
        <li
          v-if="getUserRole !== 'Sous gestionnaire de compte'"
          class="nav-item"
        >
          <nuxt-link to="/dashboard/missions" class="nav-link">
            <strong></strong>
            <strong></strong>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-edit"
            >
              <path
                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              ></path>
              <path
                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              ></path>
            </svg>
            <span>Missions</span>
          </nuxt-link>
        </li>
        <li
          v-if="getUserRole !== 'Sous gestionnaire de compte'"
          class="nav-item"
        >
          <nuxt-link to="/dashboard/paiements" class="nav-link">
            <strong></strong>
            <strong></strong>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-credit-card"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <span>Paiements</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="logout-btn" @click="logout">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-log-out"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span>Déconnexion</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { views } from '~/utils'
export default {
  name: 'NavigationSidebar',

  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      getMinisterFunctionById: 'missions-functions/getMinisterFunctionById',
      getUserRole: 'missions/getUserRole',
    }),
    user() {
      return this.$strapi.fetchUser()
    },
    getLinks() {
      return views[this.getUserRole]
    },
    setDefaultUrl(params) {
      return this.$router.history.current.path.test(params)
    },
  },

  methods: {
    logout() {
      this.$strapi.logout()
      this.$router.push('/login')
    },
    minister() {
      return this.user === 'ministre'
    },
  },
}
</script>
<style lang="scss" scoped>
.main-menu {
  background-color: $primary;
  height: 100vh;
  width: 250px;
  position: fixed;

  @media (max-width: 991px) {
    display: none !important;
  }

  .logo-content {
    padding: 20px;
    background-color: $black;
    .logo-content-title {
      color: $white;
      font-size: 1.2rem;
      font-weight: 600;
      margin-left: 20px;
    }
    .logo-toggle {
      margin-left: 20px;
      cursor: pointer;
      svg {
        fill: $white;
        width: 20px;
        height: 20px;
        font-size: 30px;
      }
    }
  }
  .menu-content {
    margin-top: 40px;
    position: relative;

    .nav-item {
      margin-bottom: 20px;

      a {
        @include menuItem;
        color: $white;
        font-weight: 500;
        cursor: pointer;
        margin-bottom: 0 !important;
        padding: 10px 40px;
        margin-left: 20px;
        border: 1px solid transparent;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        transition: 0.3s;
        &:hover {
          border: 1px solid $white;
          background-color: $white;
          color: $primary;
          svg {
            color: $primary;
          }
        }
        &.nuxt-link-exact-active {
          border: 1px solid $white;
          background-color: $white;
          color: $primary;
          position: relative;

          svg {
            color: $primary;
          }
          strong:nth-child(1) {
            background: $white;
            position: absolute;
            top: -20px;
            height: 20px;
            width: 100%;

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: -39px;
              width: 100%;
              height: 20px;
              background-color: $primary;
              border-bottom-right-radius: 20px;
            }
          }
          strong:nth-child(2) {
            background: $white;
            position: absolute;
            bottom: -20px;
            height: 20px;
            width: 100%;
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: -39px;
              width: 100%;
              height: 20px;
              background-color: $primary;
              border-top-right-radius: 20px;
            }
          }
        }

        svg {
          color: $white;
          width: 20px;
          height: 20px;
          font-size: 30px;
        }
        span {
          margin-left: 10px;
        }
      }
    }
  }
  .logout-btn {
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;
    a {
      @include menuItem;
      color: $white;
      font-weight: 500;
      cursor: pointer;
      margin-bottom: 0 !important;
      padding: 10px 40px;
      margin-left: 20px;
      border: 1px solid transparent;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      transition: all 0.3s ease;
      span {
        margin-left: 20px;
      }
    }
  }

  &.active {
    width: 100px;
    .logo-content {
      padding: 10px;
      &-title {
        display: none;
      }
    }
    .menu-content {
      .nav-item {
        a {
          padding: 20px;
          &.nuxt-link-exact-active {
            strong:nth-child(1) {
              &::before {
                left: -19px;
              }
            }
            strong:nth-child(2) {
              &::before {
                left: -19px;
              }
            }
          }
          span {
            display: none;
          }
        }
      }
    }
    .logout-btn {
      position: absolute;
      bottom: 0;
      margin-bottom: 20px;
      a {
        padding: 20px;
        span {
          display: none;
        }
      }
    }
  }
}
</style>
