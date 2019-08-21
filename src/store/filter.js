export default {
  state: {
    filterOff: false,
    labelActiv: null,
  },
  mutations: {
    setFilterOff (state, payload) {
      state.filterOff = payload
    },
    setLabelActiv (state, payload) {
      state.labelActiv = payload
    },
  },
  actions: {
    setFilterOff (state, payload) {
      commit('setFilterOff', payload)
    },
    setLabelActiv (state, payload) {
      commit('setLabelActiv', payload)
    },
  },
  getters: {
    filterOff (state) {
      return state.filterOff
    },
    labelActiv (state) {
      return state.labelActiv
    },
  }
}
