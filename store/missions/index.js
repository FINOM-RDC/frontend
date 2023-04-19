export const state = () => {
  return {
    missions: [],
    mission: {},
    allMissions: [],
    missionCreated: null,
    user: {},
    loading: false,
    error: false,
    successMessage: null,
  }
}
export const mutations = {
  setMissions(state, missions) {
    state.missions = missions
  },
  setAllMissions(state, missions) {
    state.allMissions = missions
  },
  setMission(state, mission) {
    state.mission = mission
  },
  setUser(state, user) {
    state.user = user
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setError(state, error) {
    state.error = error
  },
  setSucessMessage(state, successMessage) {
    state.successMessage = successMessage
  },
  setMissionCreated(state, missionCreated) {
    state.missionCreated = missionCreated
  },
}

export const actions = {
  async fetchMissions({ commit }) {
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await this.$strapi.fetchUser()

      const data = await this.$strapi.find('mission-orders')

      // eslint-disable-next-line no-unused-vars
      const userData = data.filter((mission) => {
        const initiator = mission.initiator
          ? mission.initiator.email === user.email
          : false
        return [
          initiator,
          ...mission.participants.map((item) => item.email === user.email),
        ].some((item) => item)
      })
      commit('setUser', user)
      commit('setMissions', userData)
      commit('setAllMissions', data)
      return { data, user }
    } catch (error) {
      this.$toast.error(error.message)
    }
  },
  async createMission({ commit }, mission) {
    commit('setLoading', true)
    try {
      const data = await this.$strapi.create('mission-orders', mission)
      commit('setLoading', false)
      commit('setSucessMessage', true)
      commit('setError', false)
      commit('setMissionCreated', data)
      this.$toast.success('Ordre de mission créé avec succès !!!')
      this.$router.push('/dashboard/missions')

      return data
    } catch (error) {
      commit('setLoading', false)
      commit('setError', error)
      this.$toast.error(error.message)
    }
  },
  async updateLevel({ commit }, { id, level, message }) {
    commit('setLoading', true)
    try {
      const data = await this.$strapi.update(
        'mission-orders/level/' + id + '/' + level
      )
      commit('setLoading', false)
      commit('setError', false)
      this.$toast.show(message)
      return data
    } catch (error) {
      commit('setLoading', false)
      commit('setError', error)
      this.$toast.error(error.message)
    }
  },
  async updateMissionOrder({ commit }, { id, level, message, state }) {
    commit('setLoading', true)
    try {
      await this.$strapi.update('mission-orders/' + id, {
        state: state || 'rejected',
        comment: message || '',
      })
      const data = await this.$strapi.update(
        'mission-orders/level/' + id + '/' + level
      )
      commit('setLoading', false)
      commit('setError', false)
      this.$toast.show(
        state ? message : " ... L' ordre de mission est encours de traitement"
      )
      return data
    } catch (error) {
      commit('setLoading', false)
      commit('setError', error)
      this.$toast.error(error.message)
    }
  },
  cancelError({ commit }, mission) {
    if (this.error) commit('setError', false)
    else commit('setError', mission)
  },
}
export const getters = {
  missions: (state) => state.missions,

  pending(state) {
    return state.missions.filter(
      (mission) =>
        mission.level.title !== 'six' &&
        mission.level.title !== 'huit' &&
        mission.level.title !== 'sept' &&
        mission.level.title !== 'neuf' &&
        mission.level.title !== 'onze'
    )
  },
  validated(state) {
    return state.missions.filter(
      (mission) =>
        mission.state === 'validated' ||
        mission.level.title === 'six' ||
        mission.level.title === 'onze'
    )
  },
  payed(state) {
    return state.missions
      .filter((mission) => mission.level.title === 'onze')
      .map((item) => ({ ...item, state: 'validated' }))
  },
  rejectedOrInProgress(state) {
    return state.missions.filter(
      (mission) =>
        (mission.state === 'rejected' ||
          mission.state === 'in-progress' ||
          mission.level.title === 'sept' ||
          mission.level.title === 'huit' ||
          mission.level.title === 'neuf') &&
        mission.level.title !== 'six' &&
        mission.level.title !== 'onze'
    )
  },
  loading(state) {
    return state.loading
  },
  successMessage(state) {
    return state.successMessage
  },
  error(state) {
    return state.error
  },
  missionCreated(state) {
    return state.missionCreated
  },
  missionById: (state) => (id) => {
    return (
      state.missions.find((mission) => mission.id === id) ||
      state.allMissions.find((mission) => mission.id === id)
    )
  },
  user: (state) => state.user,
  getUserRole: (state) => {
    return state.user.role && state.user.role.name
  },
  treatmentsByLevel: (state) => (level) => {
    if (level === 'trois' || level === 'quatre')
      return state.allMissions.filter(
        (mission) =>
          mission.level.title === 'trois' || mission.level.title === 'quatre'
      )
    const treatments = state.allMissions.filter(
      (mission) => mission && mission.level.title === level
    )
    return treatments
  },
  allMissions: (state) => state.allMissions,
}
