import * as firebase from 'firebase';

class User {
    constructor(id) {
        this.id = id;
    }
}

class UserProfile {
    constructor({ id, name, username = '', email }) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        loadUser(state, object) {
            state.user = { ...object };
        }
    },
    actions: {
        async registerUser({ commit }, { email, password }) {
            commit('clearSnackbar');
            try {
                const user = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);
                commit('setUser', new User(user.uid));
            } catch (error) {
                commit('setSnackbarMsg', error.message);
                commit('setSnackbarType', 'error');
                throw error;
            }
        },
        async loginUser({ commit }, { email, password }) {
            commit('clearSnackbar');
            try {
                const user = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
                commit('setUser', new User(user.uid));
            } catch (error) {
                commit('setSnackbarMsg', error.message);
                commit('setSnackbarType', 'error');
                throw error;
            }
        },
        autoLoginUser({ commit }, payload) {
            commit('setUser', new User(payload.uid));
        },
        logoutUser({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                })
                .catch(err => {
                    console.error(err);
                    commit('setSnackbarMsg', err.message);
                    commit('setSnackbarType', 'error');
                });
        },
        async fetchUser({ commit }) {
            const dataFromBase = [];
            try {
                const userData = await fetch(
                    'https://gb-teamproject.herokuapp.com/api/v1/user',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            login: 'user123',
                            password: '111111',
                            email: 'test@test.net'
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then(response => {
                        console.log('Response => ', response);
                        response.json();
                    })
                    .then(json => {
                        const newUser = new UserProfile(...json);
                        commit('loadUser', { ...newUser });
                    });
            } catch (error) {
                alert(error.message);
                throw error;
            }
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        isUserLoggedIn(state) {
            return state.user !== null;
        }
    }
};
