<template>
    <div class="pa-3">
        <hr>
        <v-btn
                v-if="!formAction"
                flat
                small
                @click="formAction=!formAction"
        >
            <v-icon>add</v-icon>
            добавить карточку
        </v-btn>

        <div v-else>

            <v-form

                    class="w100"
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-textarea
                        name="name"
                        label="Задача"
                        type="text"
                        required
                        v-model="taskName"
                        :rules="taskNameRules"
                        :autofocus="true"
                ></v-textarea>
            </v-form>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        icon
                        small
                        @click="addCard"
                        :loading="loading"
                        :disabled="loading"
                >
                    <v-icon>done</v-icon>
                </v-btn>
                <v-btn
                        icon
                        small
                        @click="formAction=!formAction"
                        :disabled="loading"
                >
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-actions>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'CreateNewTask',
    props: ['id'],
    data () {
      return {
        formAction: false,
        taskName: '',
        valid: false,
        taskNameRules: [
          v => !!v || 'Заголовок не может быть пустым',
          v => v.length >= 3 || 'Минимум 3 символа'
        ],
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
    },
    methods: {
      async addCard () {
        if (this.$refs.form.validate()) {
          const newTask = {
            title: this.taskName.trim(),
            id_column: this.id,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          console.log(newTask)
          const res = await dispatch('createTask', newTask)
          if (res === 1) {
            this.formAction = false
            this.taskName = ''
          }
          commit('setLoading', false)
        }
      },
    }
  }
</script>

<style scoped>
    .w100{
        width: 100%;
    }

</style>
