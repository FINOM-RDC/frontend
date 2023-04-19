<template>
  <div class="mobile-menu">
    <div class="menu-content">
      <ul role="nav" class="d-flex justify-content-around">
        <li class="nav-item">
          <nuxt-link to="/dashboard/" class="nav-link">
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
          </nuxt-link>
        </li>
        <li v-show="user && user.role.name !== '0'" class="nav-item">
          <nuxt-link to="/dashboard/traitement" class="nav-link">
            <strong></strong><strong></strong>
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
              class="feather feather-file"
            >
              <path
                d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
              ></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/dashboard/missions" class="nav-link">
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
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/dashboard/paiements" class="nav-link">
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
          </nuxt-link>
        </li>
        <li v-show="user && user.role.name === '3'" class="nav-item">
          <nuxt-link to="/dashboard/users/" class="nav-link">
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
              class="feather feather-users"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/dashboard/rapports" class="nav-link">
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
              class="feather feather-pie-chart"
            >
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationMobile',
  computed: {
    user() {
      return this.$strapi.user
    },
  },
}
</script>
<style lang="scss" scoped>
.mobile-menu {
  @media (min-width: 991px) {
    display: none;
  }
  @media (max-width: 991px) {
    position: fixed;
    bottom: 0;
    z-index: 999;

    width: 100%;

    background-color: $primary;

    .nav-item {
      list-style: none;
      a {
        padding: 20px;
        svg {
          width: 30px;
          height: 30px;
          color: $white;
        }
        &:hover {
          background-color: $white;
          svg {
            color: $primary;
          }
        }
        &.nuxt-link-exact-active {
          background-color: $white;
          svg {
            color: $primary;
          }
        }
      }
    }
  }
}
</style>
