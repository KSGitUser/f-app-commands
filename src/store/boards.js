import URL from '../URL'

class Board {
    constructor (name, userId, image) {
        this.name = name
        this.userId = userId
        // this.image = image
    }
}

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
    fetchBoards ({commit}, payload) {
      commit('clearSnackbar')
      commit('setLoading', true)
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
              console.log('json ',json)
              if (json.status === 1){
                  commit('setBoards', json.data.boards)
              }
              if (json.status === 401) {
                  commit('setSnackbarMsg', 'Требуется авторизация')
                  commit('setSnackbarType', 'error')
              }
              commit('setLoading', false)
          }
        )
        .catch(
          error => {
            console.error(error)
            commit('setSnackbarMsg', 'Ошибка загрузки данных')
            commit('setSnackbarType', 'error')
            commit('setLoading', false)
            return false
          }
        )
    },
    
      createBoard ({ commit }, { name, userId, image }) {
          commit('clearError')
          commit('setLoading', true)
        
              fetch(`${URL}/api/v1/board`, {
                  mode: 'cors',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Headers': '*',
                      'Authorization': localStorage.getItem('user'),
                  },
                  method: 'POST',
                  body: JSON.stringify({
                      name,
                      userId,
                      image
                  })
              })
                  .then(response => response.json())
                  .then (result => {
            
              commit('createBoard', new Board(board.name, board.userId))
              commit('setLoading', false)
              this.$router.push(`/boards/${board.name}`)
            
          })
                .catch (error => {
              commit('setLoading', false)
              commit('setSnackbarMsg', error.message)
              commit('setSnackbarType', 'error')
              commit('setBoardDialog', false)
          })
      }
    
    
  },
  getters: {
    boards (state) {
      return state.boards
    },

  }
}
