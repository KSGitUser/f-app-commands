import * as firebase from 'firebase';

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
        registerUser ({ commit }, { email, password }) {
            commit('clearError');
            commit('setLoading', true);
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', new User(user.uid));
                    commit('setLoading', false)
                })
                .catch(error => {
                    commit('setLoading', false);
                    commit('setError', error.message);
                })

        },
        loginUser ({ commit }, { email, password }) {
            commit('clearError');
            commit('setLoading', true);
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', new User(user.uid));
                    commit('setLoading', false)
                })
                .catch(error => {
                    commit('setLoading', false);
                    commit('setError', error.message);
                })
        },
        autoLoginUser ({ commit }, payload) {
            commit('setUser', new User(payload.uid))
        },
        logoutUser ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
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