import URL from '../URL'

export default {
  state: {
    boards: null,
  },
  mutations: {
    setBoards (state, payload) {
      state.boards = payload
    }
  },
  actions: {
    async fetchBoards ({commit}, payload) {
      commit('clearSnackbar')
      return fetch(`${URL}/api/v1/board`,
        {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': localStorage.getItem('user'),
          },
          method: 'GET',
        })
        .then(response => response.json())
        .then(
          json => {
            console.log(json)
          }
        )
        .catch(
          error => {
            console.error(error)
            commit('setSnackbarMsg', 'Ошибка загрузки данных')
            commit('setSnackbarType', 'error')
            return false
          }
        )
    },

  },
  getters: {
    boards (state) {
      return state.boards
    },

  }
}
