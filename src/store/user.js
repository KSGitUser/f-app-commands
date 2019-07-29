import * as firebase from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('clearSnackbar')
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
      } catch (error) {
        commit('setSnackbarMsg', error.message)
        commit('setSnackbarType', 'error')
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearSnackbar')
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
      } catch (error) {
        commit('setSnackbarMsg', error.message)
        commit('setSnackbarType', 'error')
        throw error
      }
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({commit}) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
        })
        .catch(err => {
          console.error(err)
          commit('setSnackbarMsg', err.message)
          commit('setSnackbarType', 'error')
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
