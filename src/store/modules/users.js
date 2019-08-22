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
          'https://jsonplaceholder.typicode.com/users?id=1'
        )
          .then(response => response.json())
          .then(json => {
            const newUser = new User(...json);
            commit('loadUser', { ...newUser });
          });

        // firebase.database().ref('departments').once('value')
        // const departments = departmentsVal.val()
        /* Object.keys(departments).forEach(key => {
            const department = departments[key]
            department.id = key;
            dataFromBase.push(
              new Departments({
                ...department
              })
            )
  
            commit('loadDepartmentData', dataFromBase)
          }) */
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
