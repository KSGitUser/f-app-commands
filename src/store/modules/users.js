'use strict';

class User {
    constructor({ id, name, username = '', email }) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }
}

export default {
    state: {
        user: { name: 'Sergey' }
    },
    mutations: {
        loadUser(state, object) {
            state.user = { ...object };
        }
    },
    actions: {
        async fetchUser({ commit }) {
            const dataFromBase = [];
            try {
                const userData = await fetch(
                    'https://gb-teamproject.herokuapp.com/api/v1/user',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'cache-control': 'no-cache'
                        },
                        body: JSON.stringify({
                            login: 'user123',
                            password: '111111',
                            email: 'test@test.net'
                        })
                    }
                )
                    .then(response => {
                        console.log("Response =>", response)
                        response.json();
                    })
                    .then(json => {
                        const newUser = new User(...json);
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
        }
    }
};
