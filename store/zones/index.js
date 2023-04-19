export const state = () => {
  return {
    zones: [],
  }
}

export const mutations = {
  setZones(state, zones) {
    state.zones = zones
  },
}

export const actions = {
  async fetchZones({ commit }) {
    const data = await this.$strapi.find('mission-zones')
    commit('setZones', data)
    return data
  },
}

export const getters = {
  getZoneById: (state) => (id) => {
    console.log(state, id)
    return (
      state.zones.length > 0 &&
      (state.zones.find((zone) => zone.id === id) || { title: '' })
    )
  },
}
