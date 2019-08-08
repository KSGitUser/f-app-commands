import URL from '../URL'

export default {
  state: {
    boards: [],
  },
  mutations: {
    setBoards (state, payload) {
      state.boards = [...payload]
      console.log(payload)
    },
    createBoard (state, payload) {
      state.boards.push(payload)
    }
  },
  actions: {
    async fetchBoards ({commit, getters}, payload) {
      commit('clearSnackbar')
      return fetch(`${URL}/api/v1/board`,
        {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': getters.user,

          },
          method: 'GET',
        })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        })
        .then(json => {
            console.log('json ', json)
            if (json.status === 1) {
              commit('setBoards', json.data.boards)
            }
            if (json.status === 401) {
              commit('setSnackbarMsg', 'Требуется авторизация')
              commit('setSnackbarType', 'error')
            }
          }
        )
        .catch(
          error => {
            console.error(error)
            commit('setSnackbarMsg', 'Ошибка загрузки данных')
            commit('setSnackbarType', 'error')
          }
        )
    },
    async createBoard ({commit, getters}, {name}) {
      commit('clearSnackbar')
      return fetch(`${URL}/api/v1/board`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Authorization': getters.user,
        },
        method: 'POST',
        body: JSON.stringify({
          name,
        })
      })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        }).then(result => {
          console.log(result)
          if (result.status === 1) {
            commit('setSnackbarMsg', 'Создана новая доска')
            commit('setSnackbarType', 'success')
            this.boardName = ''
          }
          if (result.status === 401) {
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
        })
        .catch(
          error => {
            console.error(error)
            commit('setSnackbarMsg', 'Ошибка загрузки данных')
            commit('setSnackbarType', 'error')
          }
        )
    }
  },
  getters: {
    boards (state) {
      return state.boards
    },
  }
}
