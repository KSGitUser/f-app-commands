import URL from '../URL'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null,
    email: null,
    login: null,
    password: null,
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      localStorage.setItem('user', payload)
      console.log('====== SET USER ======== ', state.user)
    },
    setUserHeader (state, payload) {
      const Authorization = payload.headers.get('Authorization')
      if (Authorization) {
        state.user = Authorization
        localStorage.setItem('user', Authorization)
        console.log('====== USER Header ======== ', state.user)
      }
    },
    setUserLogin (state, payload) {
      state.login = payload
    },
    setUserEmail (state, payload) {
      state.email = payload
    },
    setUserPassword (state, payload) {
      state.password = payload
    },
  },
  actions: {
    async registerUser ({commit}, payload) {
      commit('setLoading', true)
      return fetch(`${URL}/api/v1/user`,
        {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
          method: 'POST',
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(
          json => {
            console.log(json)
            if (json.status === -1) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', Object.values(json.message).join('; '))
              commit('setSnackbarType', 'error')
            } else {
              commit('clearSnackbar')
              commit('setSnackbarMsg', 'Успешная регистрация')
              commit('setSnackbarType', 'success')
            }
            commit('setLoading', false)
            return json.status
          }
        )
        .catch(
          error => {
            console.error(error)
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Ошибка регистрации')
            commit('setSnackbarType', 'error')
            commit('setLoading', false)
          }
        )
    },
    async loginUser ({commit}, payload) {
      commit('setLoading', true)
      return fetch(`${URL}/api/v1/user/auth`,
        {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
          method: 'POST',
          body: JSON.stringify(payload)
        })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        })
        .then(
          json => {
            if (json.status === 1) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', 'Успешная авторизация')
              commit('setSnackbarType', 'success')
            } else {
              commit('clearSnackbar')
              commit('setSnackbarMsg', Object.values(json.message).join('; '))
              commit('setSnackbarType', 'error')
            }
            commit('setLoading', false)
            return json.status
          }
        )
        .catch(
          error => {
            console.error(error)
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Ошибка авторизации')
            commit('setSnackbarType', 'error')
            commit('setLoading', false)
          }
        )
    },
    async resetPassword ({commit}, payload) {
      commit('setLoading', true)
      return fetch(`${URL}/api/v1/user/recovery`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(
          json => {
            if (json.status === -1) {
              commit('clearSnackbar')
              commit('setSnackbarMsg', Object.values(json.message).join('; '))
              commit('setSnackbarType', 'error')
            } else {
              commit('clearSnackbar')
              commit('setSnackbarMsg', 'Пароль выслан на e-mail')
              commit('setSnackbarType', 'success')
            }
            commit('setLoading', false)
            return json.status
          }
        )
        .catch(
          error => {
            console.error(error)
            commit('clearSnackbar')
            commit('setSnackbarMsg', 'Ошибка восстановления пароля')
            commit('setSnackbarType', 'error')
            commit('setLoading', false)
          }
        )
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', payload)
      localStorage.setItem('user', payload)
    },
    async logoutUser ({commit, getters}, payload) {
      fetch(`${URL}/api/v1/user`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': getters.user,
          },
          method: 'DELETE',
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
          }
        )
      commit('setUser', null)
      localStorage.removeItem('user')
    },
    profileUser ({commit, getters}, payload) {
      commit('clearSnackbar')
      commit('setLoading', true)
      return fetch(`${URL}/api/v1/user`,
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
        .then(
          json => {
            console.log(json)
            commit('setLoading', false)
            commit('setUserLogin', json.data.login)
            commit('setUserEmail', json.data.email)
            commit('setUserPassword', json.data.password)
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
    updateUserEmail ({commit, getters}, payload) {
      commit('clearSnackbar')
      return fetch(`${URL}/api/v1/user/change-email`,
        {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': getters.user,
          },
          method: 'POST',
          body: JSON.stringify(payload),
        })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        })
        .then(
          json => {
            console.log(json)
            if (json.status === 401) {
              commit('setSnackbarMsg', 'Требуется авторизация')
              commit('setSnackbarType', 'error')
            } else if (json.status === -1) {
              commit('setSnackbarMsg', Object.values(json.message).join('; '))
              commit('setSnackbarType', 'error')
            } else if (json.status === 1) {
              commit('setSnackbarMsg', 'Подтвердите новый email пройдя по сслыке в письме')
              commit('setSnackbarType', 'success')
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
    updateUserPassword ({commit, getters}, payload) {
      commit('clearSnackbar')
      return fetch(`${URL}/api/v1/user/change-password`,
        {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': getters.user,
          },
          method: 'POST',
          body: JSON.stringify(payload),
        })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        })
        .then(
          json => {
            console.log(json)
            if (json.status === 401) {
              commit('setSnackbarMsg', 'Требуется авторизация')
              commit('setSnackbarType', 'error')
            } else if (json.status === -1) {
              commit('setSnackbarMsg', Object.values(json.message).join('; '))
              commit('setSnackbarType', 'error')
            } else if (json.status === 1) {
              commit('setSnackbarMsg', 'Пароль изменен')
              commit('setSnackbarType', 'success')
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
    updateUserLogin ({commit, getters}, payload) {
      commit('clearSnackbar')
      return fetch(`${URL}/api/v1/user`,
        {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': getters.user,
          },
          method: 'PATCH',
          body: JSON.stringify(payload),
        })
        .then(response => {
          commit('setUserHeader', response)
          return response.json()
        })
        .then(
          json => {
            console.log(json)
            if (json.status === 401) {
              commit('setSnackbarMsg', 'Требуется авторизация')
              commit('setSnackbarType', 'error')
            } else if (json.status === -1) {
              commit('setSnackbarMsg', Object.values(json.message).join('; '))
              commit('setSnackbarType', 'error')
            } else if (json.status === 1) {
              commit('setSnackbarMsg', 'Имя изменено')
              commit('setSnackbarType', 'success')
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
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    },
    email (state) {
      return state.email
    },
    login (state) {
      return state.login
    },
    password (state) {
      return state.password
    },
  }
}
