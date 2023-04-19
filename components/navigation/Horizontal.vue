<template>
  <div class="horizontal-menu d-flex">
    <div class="notifications-content mx-3">
      <div class="notifications" @click="$bvToast.show('my-toast')">
        <div class="notifications-icon">
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
            class="feather feather-bell"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <b-badge class="notifications-badge" variant="light">4</b-badge>
        </div>
      </div>
      <b-toast id="my-toast" class="mt-5" solid>
        <template #toast-title>
          <div class="d-flex flex-grow-1 align-items-baseline">
            <b-img
              blank
              blank-color="#ff5555"
              class="mr-2"
              width="12"
              height="12"
            ></b-img>
            <strong class="mr-auto">Notice!</strong>
            <small class="text-muted mr-2">42 secondes après</small>
          </div>
        </template>
        <p class="text">Notifications</p>
      </b-toast>
    </div>
    <div class="avatar-content" @click="toggle">
      <b-avatar variant="light"></b-avatar>
      <ul :class="show ? 'menu-user active' : 'menu-user'">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="#">
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
              class="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="mx-2">Profile</span>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="#">
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
              class="feather feather-settings"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1z"
              ></path>
            </svg>
            <span class="mx-2">Paramètres</span>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logout">
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
            <span class="mx-2">Déconnexion</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationHorizontal',
  middleware: 'auth',

  data() {
    return {
      show: false,
    }
  },
  computed: {
    user() {
      return this.$strapi.user
    },
  },
  methods: {
    toggle() {
      this.show = !this.show
    },
    async logout() {
      await this.$strapi.logout()
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="scss" scoped>
.horizontal-menu {
  .notifications-content {
    margin-top: 10px;
    .notifications {
      position: relative;
      cursor: pointer;
      &-badge {
        position: absolute;
        top: -10px;
        right: 2px;
        z-index: 1;
        width: 20px;
        height: 20px;
        color: $white;
        background-color: $red;
        padding: 4px;
        border-radius: 50%;
      }
    }
  }
  .avatar-content {
    position: relative;
    .menu-user {
      flex-direction: column;
      background: $gray;
      width: 200px;
      padding: 20px 10px;
      position: absolute;
      left: -180px;
      border-radius: 5px;
      background-color: #fafafa;
      display: none;
      transition: all 0.3s ease-in-out;
      &.active {
        display: flex;
        z-index: 40000;
      }

      .nav-link {
        margin-bottom: 10px;
        color: $black;
        font-size: 14px;
        display: flex;
        align-items: center;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
