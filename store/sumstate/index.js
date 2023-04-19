export const state = () => {
  return {
    sumState: [],

    loading: false,
  }
}

export const mutations = {
  setSumState(state, sumState) {
    state.sumState = sumState
  },
  setLoading(state, loading) {
    state.loading = loading
  },
}

export const actions = {
  async fetchMission({ commit }, id) {
    commit('setLoading', true)
    try {
      const data = await this.$strapi.find('sum-states', {
        mission_order: id,
      })
      const response = data || []

      commit('setSumState', response)
      localStorage.setItem(id, JSON.stringify(response))
    } catch (error) {
      commit('setError', error)
      this.$toast.error(error.message)
      throw error
    } finally {
      commit('setLoading', false)
    }
  },
  filterState({ commit }, data) {
    commit('setSumState', data)
  },
}

export const getters = {
  sumState(state) {
    return state.sumState
  },
}
