import URL from '../URL'

export default {
  state: {
    boards: [],
    columns: [],
    labels: [],
    title: '',
    boardId: null,
    task: {},
    list: null
  },
  mutations: {
    setBoards (state, payload) {
      state.boards = [...payload]
      console.log('state.boards', payload)
    },
    addBoards (state, payload) {
      state.boards = state.boards.concat(payload)
      console.log('state.boards add', payload)
      console.log('state.boards', state.boards)
    },
    setBoardTitle (state, payload) {
      state.title = payload
      console.log('state.title', payload)
    },
    setColumns (state, payload) {
      state.columns = [...payload]
      console.log('state.columns', payload)
    },
    addColumns (state, payload) {
      state.columns = state.columns.concat(payload)
      console.log('state.columns add', payload)
      console.log('state.columns', state.columns)
    },
    addTask (state, payload) {
      const idx = state.columns.findIndex(el => +el.id === +payload.id_column)
      state.columns[idx].tasks = state.columns[idx].tasks.concat(payload)
    },
    setLabels (state, payload) {
      state.labels = [...payload]
      console.log('state.labels', payload)
    },
    addLabels (state, payload) {
      state.labels = state.labels.concat(payload)
      console.log('state.labels add', payload)
      console.log('state.labels', state.labels)
    },
    updateLabels (state, payload) {
      const idx = state.labels.findIndex(el => +el.id === +payload.id)
      state.labels[idx] = payload
    },
    updateColumn (state, payload) {
      const idx = state.columns.findIndex(el => +el.id === +payload.id)
      state.columns[idx] = payload
      state.columns = state.columns.concat()
    },
    updateTaskTitle (state, payload) {
      const idxCol = state.columns.findIndex(el => +el.id === +payload.columnId)
      const idxTask = state.columns[idxCol].tasks.findIndex(el => +el.id === +payload.id)
      state.columns[idxCol].tasks[idxTask].title = payload.title
      state.columns = state.columns.concat()
      state.task.title = payload.title
    },
    setBoardId (state, payload) {
      state.boardId = +payload
      console.log('state.boardId', +payload)
    },
    setTask (state, payload) {
      payload.description = payload.description !== null ? payload.description : ''
      state.task = payload
      console.log('state.task', payload)
    },
    setList (state, payload) {
      state.list = payload
      console.log('state.list', payload)
    },
    addList (state, payload) {
      const idx = state.columns.findIndex(el => +el.id === +payload.id_column)
      state.columns[idx].lists = state.columns[idx].lists.concat(payload)
    },
    updateTaskDescription(state, payload) {
      state.task.description = payload.description
    },
    updateTaskLabels(state, payload) {
       const idxCol = state.columns.findIndex(el => +el.id === +payload.columnId)
       const idxTask = state.columns[idxCol].tasks.findIndex(el => +el.id === +payload.id)
       state.columns[idxCol].tasks[idxTask].labelTasks = payload.labels
       state.columns = state.columns.concat()
       state.task.labelTasks = payload.labels
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
              const {title, columns, labels, id} = json.data
              commit('setBoardTitle', title)
              commit('setColumns', columns)
              commit('setLabels', labels)
              commit('setBoardId', id)
            } else if (json.status === -1) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', Object.values(json.message).join('; '))
              commit('setSnackbarType', 'error')
            } else if (json.status === 401) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', 'Требуется авторизация')
              commit('setSnackbarType', 'error')
            }
            return json.status
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
    async fetchBoards ({commit, getters}) {
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
            } else if (json.status === 401) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', 'Требуется авторизация')
              commit('setSnackbarType', 'error')
            }
            return json.status
          }
        )
        .catch(
          error => {
            console.error(error)
            commit('clearSnackbar')
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
            payload.id = result.data.id
            commit('addBoards', payload)
            this.boardName = ''
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
    async updateBoardTitle ({commit, getters}, payload) {
      let {id_board} = payload
      return fetch(`${URL}/api/v1/board/${id_board}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Authorization': getters.user,
        },
        method: 'PATCH',
        body: JSON.stringify(payload)
      })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        }).then(result => {
          console.log(result)
          if (result.status === 1) {
            this.boardName = ''
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
            payload.id = result.data.id
            payload.lists = []
            payload.tasks = []
            commit('addColumns', payload)
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
    async createLabel ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/label`, {
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
            payload.id = result.data.id
            commit('addLabels', payload)
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
    async createTask ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/task`, {
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
            payload.id = result.data.id
            payload.position = result.data.position
            payload.description = null
            payload.labelTasks = []
            commit('addTask', payload)
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
    async updateLabel ({commit, getters}, {newData, id_label}) {
      return fetch(`${URL}/api/v1/label/${id_label}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Authorization': getters.user,
        },
        method: 'PATCH',
        body: JSON.stringify(newData)
      })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        }).then(result => {
          console.log('updateLabel', result)
          if (result.status === 1) {
            commit('updateLabels', newData)
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
    async updateColumnTitle ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/column/${payload.id}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Authorization': getters.user,
        },
        method: 'PATCH',
        body: JSON.stringify(payload)
      })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        }).then(result => {
          console.log('updateLabel', result)
          if (result.status === 1) {
            commit('updateColumn', payload)
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
    async fetchTask ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/task?id=${payload}`,
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
              commit('setTask', json.data)
            } else if (json.status === -1) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', Object.values(json.message).join('; '))
              commit('setSnackbarType', 'error')
            } else if (json.status === 401) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', 'Требуется авторизация')
              commit('setSnackbarType', 'error')
            }
            return json.status
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
    async createList ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/list`, {
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
            payload.id = result.data.id
            payload.position = result.data.position
            commit('addList', payload)
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
    async fetchList ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/list?id=${payload}`,
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
              commit('setList', json.data)
            } else if (json.status === -1) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', Object.values(json.message).join('; '))
              commit('setSnackbarType', 'error')
            } else if (json.status === 401) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', 'Требуется авторизация')
              commit('setSnackbarType', 'error')
            }
            return json.status
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
    async updateTaskTitle ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/task/${payload.id}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Authorization': getters.user,
        },
        method: 'PATCH',
        body: JSON.stringify(payload)
      })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        }).then(result => {
          console.log('updateLabel', result)
          if (result.status === 1) {
            commit('updateTaskTitle', payload)
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
    async updateTaskDescription ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/task/${payload.id}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Authorization': getters.user,
        },
        method: 'PATCH',
        body: JSON.stringify(payload)
      })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        }).then(result => {
          console.log(result)
          if (result.status === 1) {
            commit('updateTaskDescription', payload)
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
    async updateTaskLabels ({commit, getters}, payload) {
      return fetch(`${URL}/api/v1/task/${payload.id}`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Authorization': getters.user,
        },
        method: 'PATCH',
        body: JSON.stringify(payload)
      })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        }).then(result => {
          console.log(result)
          if (result.status === 1) {
            commit('updateTaskLabels', payload)
          } else if (result.status === -1) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', Object.values(result.message).join('; '))
            commit('setSnackbarType', 'error')
          } else if (result.status === 401) {
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Требуется авторизация')
            commit('setSnackbarType', 'error')
          }
          return result.status
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
    boardTitle (state) {
      return state.title
    },
    boardId (state) {
      return state.boardId
    },
    task (state) {
      return state.task
    },
    list (state) {
      return state.list
    }
  }
}
