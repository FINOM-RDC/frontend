export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Finom | Portail de Gestion de demandes d'ordre de mission",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/calendar.js', ssr: false },
    { src: '~plugins/multipleselect.js', ssr: false },
    { src: '~plugins/vuevalidate.js' },
    { src: '~plugins/vue-html2pdf.js', ssr: false },
    { src: '~/plugins/vue-persist', ssr: false },
  ],
  loading: { color: '#072b49' },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/strapi',
    '@nuxtjs/vuetify',
    'nuxt-socket-io',
    '@nuxtjs/toast',
    'nuxt-socket-io',
  ],
  io: {
    // module options
    sockets: [
      {
        name: 'main',
        url: process.env.NUXT_STRAPI_URL || 'https://finom-api.herokuapp.com/',
      },
    ],
  },
  styleResources: {
    scss: ['~assets/scss/main.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.NUXT_STRAPI_URL || 'https://finom-api.herokuapp.com/',
  },

  pwa: {
    manifest: {
      lang: 'fr',
    },
  },
  strapi: {
    url: process.env.NUXT_STRAPI_URL || 'https://finom-api.herokuapp.com/',
    entities: ['users', 'mission-orders'],
    key: 'userJwt',
    expires: '1d',
  },
  toast: {
    position: 'bottom-right',
    duration: 3000,
    action: {
      text: 'Cancel',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
