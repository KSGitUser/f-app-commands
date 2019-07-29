export default {
  state: {
    // 'success', 'info', 'error', null
    snackbarType: null,
    snackbarMsg: null,
  },
  mutations: {
    setSnackbarMsg (state, payload) {
      state.snackbarMsg = payload
    },
    setSnackbarType (state, payload) {
      state.snackbarType = payload
    },
    clearSnackbar (state) {
      state.snackbarType = null
      state.snackbarMsg = null
    },
  },
  actions: {
    setSnackbarMsg ({commit}, payload) {
      commit('setSnackbarMsg', payload)
    },
    setSnackbarType ({commit}, payload) {
      commit('setSnackbarType', payload)
    },
    clearSnackbar ({commit}) {
      commit('clearSnackbar')
    },
  },
  getters: {
    snackbarType (state) {
      return state.snackbarType
    },
    snackbarMsg (state) {
      return state.snackbarMsg
    },
  }
}
