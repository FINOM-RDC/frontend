export const state = () => ({
  user: null,
  error: null,
  loading: false,
  validation: null,
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_VALIDATION(state, validation) {
    state.validation = validation
  },
}

export const actions = {
  async login({ commit }, { identifier, password }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    commit('SET_VALIDATION', null)
    try {
      await this.$strapi
        .login({
          identifier,
          password,
        })
        .then((data) => {
          commit('SET_USER', this.$strapi.user)
          commit('SET_LOADING', false)
          commit('SET_VALIDATION', true)
          this.$router.push('/dashboard')
        })
    } catch (error) {
      this.$toast.error(error.message)
      commit('SET_ERROR', error)
      commit('SET_LOADING', false)
    }
  },
  async logout({ commit }) {
    await this.$strapi.logout()
    commit('SET_USER', null)
    commit('SET_LOADING', false)
    commit('SET_VALIDATION', null)
    this.$router.push('/login')
  },
}

export const getters = {
  user: (state) => state.user,
  error: (state) => state.error,
  loading: (state) => state.loading,
  validation: (state) => state.validation,
}
