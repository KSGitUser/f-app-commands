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
    // async registerUser ({commit}, {email, password}) {
    //   commit('clearSnackbar')
    //   try {
    //     const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    //     commit('setUser', new User(user.uid))
    //   } catch (error) {
    //     commit('setSnackbarMsg', error.message)
    //     commit('setSnackbarType', 'error')
    //     throw error
    //   }
    // },
    async registerUser ({commit}, payload) {
      commit('clearSnackbar')
      //commit('setUser', new User(user.uid))
      fetch('https://gb-teamproject.herokuapp.com/api/v1/user',
        //fetch('http://app-commands-master/api/v1/user',
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(
          json => {
            console.log(json)
            this.$router.push('/user')
            this.$store.dispatch('togleRegisterDialog')
            //this.$store.dispatch('setSnackbarMsg', 'Успешная регистрация')
            this.$store.dispatch('setSnackbarMsg', json)
            this.$store.dispatch('setSnackbarType', 'success')
          }
        )
        .catch(
          error => {
            console.error(error)
            commit('setSnackbarMsg', 'Ошибка регистрации')
            commit('setSnackbarType', 'error')
          }
        )
    },
    loginUser ({commit}, payload) {
      commit('clearSnackbar')

      fetch('https://gb-teamproject.herokuapp.com/api/v1/user/auth',
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
            console.log(json)
            this.$router.push('/board')
            this.$store.dispatch('togleLoginDialog')
            //commit('setUser', new User(user.uid))
            this.$store.dispatch('setSnackbarMsg', 'Успешная авторизация')
            this.$store.dispatch('setSnackbarType', 'success')
          }
        )
        .catch(
          error => {
            console.error(error)
            commit('setSnackbarMsg', 'Ошибка авторизации')
            commit('setSnackbarType', 'error')
          }
        )

      // try {
      //   const user = await firebase.auth().signInWithEmailAndPassword(email, password)
      //   commit('setUser', new User(user.uid))
      // } catch (error) {
      //   commit('setSnackbarMsg', error.message)
      //   commit('setSnackbarType', 'error')
      //   throw error
      // }
    },
    resetPassword ({commit}, payload) {
      commit('clearSnackbar')

      fetch('https://gb-teamproject.herokuapp.com/api/v1/user/recovery',
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
            console.log(json)
            this.$router.push('/board')
            this.$store.dispatch('togleResetPasswordDialog')
            this.$store.dispatch('setSnackbarMsg', 'Пароль выслан на e-mail')
            this.$store.dispatch('setSnackbarType', 'success')
          }
        )
        .catch(
          error => {
            console.error(error)
            commit('setSnackbarMsg', 'Ошибка восстановления пароля')
            commit('setSnackbarType', 'error')
          }
        )
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
