import URL from '../URL'

export default {
  state: {
    boards: [],
    columns: [],
    labels: [],
  },
  mutations: {
    setBoards (state, payload) {
      state.boards = [...payload]
      console.log('state.boards', payload)
    },
    setColumns (state, payload) {
      state.columns = [...payload]
      console.log('state.columns', payload)

    },
    setLabels (state, payload) {
      state.labels = [...payload]
      console.log('state.labels', payload)
    },
  },
  actions: {
    async fetchBoard ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/board?id=${payload}`,
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
              const {columns, labels} = json.data
              commit('clearSnackbar')
              commit('setColumns', columns)
              commit('setLabels', labels)
              return 1
            } else if (json.status === -1) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', Object.values(json.message).join('; '))
              commit('setSnackbarType', 'error')
              return -1
            } else if (json.status === 401) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', 'Требуется авторизация')
              commit('setSnackbarType', 'error')
              return 401
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
    async fetchBoards ({commit, getters}, payload) {
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
              commit('clearSnackbar')
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
    async createBoard ({commit, getters}, payload) {
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
        body: JSON.stringify(payload)
      })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        }).then(result => {
          console.log(result)
          if (result.status === 1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Создана новая доска')
            commit('setSnackbarType', 'success')
            this.boardName = ''
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(json.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
        })
        .catch(
          error => {
            console.error(error)
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Ошибка загрузки данных')
            commit('setSnackbarType', 'error')
          }
        )
    },
    async createColumn ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/column`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Authorization': getters.user,
        },
        method: 'POST',
        body: JSON.stringify(payload)
      })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        }).then(result => {
          console.log(result)
          if (result.status === 1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Создан новый столбец')
            commit('setSnackbarType', 'success')
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(json.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
        })
        .catch(
          error => {
            console.error(error)
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Ошибка загрузки данных')
            commit('setSnackbarType', 'error')
          }
        )
    },
  },
  getters: {
    boards (state) {
      return state.boards
    },
    columns (state) {
      return state.columns
    },
    labels (state) {
      return state.labels
    },
  }
}
