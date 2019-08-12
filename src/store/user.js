import URL from '../URL';

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
            localStorage.setItem('user', payload);
            console.log('======USER======== ', localStorage.getItem('user'));
        },
        loadUser(state, object) {
            state.user = { ...object };
        }
    },
    actions: {
        async registerUser({ commit }, payload) {
            commit('clearSnackbar');
            return fetch(`${URL}/api/v1/user`, {
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    if (json.status === -1) {
                        console.log(json.message);
                        commit('setSnackbarMsg', json.message);
                        commit('setSnackbarType', 'error');
                        return false;
                    } else {
                        commit('togleRegisterDialog');
                        commit('setSnackbarMsg', 'Успешная регистрация');
                        commit('setSnackbarType', 'success');
                        return true;
                    }
                })
                .catch(error => {
                    console.error(error);
                    commit('setSnackbarMsg', 'Ошибка регистрации');
                    commit('setSnackbarType', 'error');
                    return false;
                });
        },
        async loginUser({ commit }, payload) {
            commit('clearSnackbar');

            return fetch(`${URL}/api/v1/user/auth`, {
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(response => {
                    const Authorization = response.headers.get('Authorization');
                    if (Authorization) {
                        commit('setUser', Authorization);
                    }
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    if (json.status === 1) {
                        commit('togleLoginDialog');
                        commit('setSnackbarMsg', 'Успешная авторизация');
                        commit('setSnackbarType', 'success');
                        return true;
                    } else {
                        commit('setSnackbarMsg', json.message);
                        commit('setSnackbarType', 'error');
                        return false;
                    }
                })
                .catch(error => {
                    console.error(error);
                    commit('setSnackbarMsg', 'Ошибка авторизации');
                    commit('setSnackbarType', 'error');
                    return false;
                });
        },
        async resetPassword({ commit }, payload) {
            commit('clearSnackbar');
            return fetch(`${URL}/api/v1/user/recovery`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    if (json.status === -1) {
                        commit('setSnackbarMsg', json.message);
                        commit('setSnackbarType', 'error');
                        return false;
                    } else {
                        commit('setSnackbarMsg', 'Пароль выслан на e-mail');
                        commit('setSnackbarType', 'success');
                        return true;
                    }
                })
                .catch(error => {
                    console.error(error);
                    commit('setSnackbarMsg', 'Ошибка восстановления пароля');
                    commit('setSnackbarType', 'error');
                    return false;
                });
        },
        autoLoginUser({ commit }, payload) {
            commit('setUser', payload);
            localStorage.setItem('user', payload);
        },
        logoutUser({ commit }) {
            commit('setUser', null);
            localStorage.removeItem('user');
        },
        async fetchUser({ commit }) {
            const dataFromBase = [];
            try {
                const userData = await fetch(
                    'https://gb-teamproject.herokuapp.com/api/v1/user'
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
        user(state) {
            return state.user;
        },
        getUser(state) {
            return state.user;
        },
        isUserLoggedIn(state) {
            return state.user !== null;
        }
    }
};
