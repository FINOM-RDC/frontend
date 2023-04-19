export const state = () => ({
  ministerFunctions: [],
  ministerFunction: null,
})

export const mutations = {
  setMinisterFunctions(state, ministerFunctions) {
    state.ministerFunctions = ministerFunctions
  },
  setMinisterFunction(state, ministerFunction) {
    state.ministerFunction = ministerFunction
  },
}

export const actions = {
  async fetchFunction({ commit }, id) {
    const data = await this.$strapi.findOne('minister-functions', id)
    commit('setMinisterFunction', data)
  },
  async fetchFunctions({ commit }) {
    const data = await this.$strapi.find('minister-functions')
    commit('setMinisterFunctions', data)
  },
}

export const getters = {
  getMinisterFunctionById: (state) => (id) => {
    const ministerFunction = state.ministerFunctions.find(function (
      ministerFunction
    ) {
      return ministerFunction.id === id
    })
    return ministerFunction && ministerFunction.type
  },
  ministerFunction: (state) => {
    return state.ministerFunction
  },
}
