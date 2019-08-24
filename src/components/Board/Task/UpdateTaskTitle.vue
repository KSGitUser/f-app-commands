<template>

    <div v-if="!update" style="display: flex" class="w100">
        <div
                @click="updateForm"
                class="w100"
                style="cursor: pointer"
        >
            <h4>
                {{task.title}}
            </h4>
        </div>
        <div>
            <v-btn
                    @click="updateForm"
                    :disabled="loading"
                    icon
            >
                <v-icon>edit</v-icon>
            </v-btn>
        </div>

    </div>

    <div
            class="w100"
            v-else
    >
        <v-form
                class="w100"
                ref="form"
                v-model="valid"
                lazy-validation
        >
            <v-textarea
                    class="w100"
                    name="name"
                    type="text"
                    v-model="taskName"
                    required
                    label="Задача"
                    auto-grow
                    rows="1"
                    :rules="taskNameRules"
                    :loading="loading"
                    :disabled="loading"
                    :autofocus="true"
                    @keypress.enter="saveNewTaskTitle"
            ></v-textarea>
        </v-form>
        <v-card-actions v-if="!loading" style="margin: -20px 0 -15px 0">
            <v-spacer></v-spacer>
            <v-btn
                    icon
                    v-if="task.title.trim() !== taskName.trim()"
                    @click="saveNewTaskTitle"
                    :loading="loading"
                    :disabled="loading"
            >
                <v-icon>done</v-icon>
            </v-btn>
            <v-btn
                    icon
                    @click="update=false"
                    :disabled="loading"
            >
                <v-icon>reply</v-icon>
            </v-btn>
        </v-card-actions>

    </div>

</template>

<script>
  export default {
    name: 'UpdateTaskTitle',
    props: ['columnId'],
    data () {
      return {
        update: false,
        taskName: '',
        valid: false,
        taskNameRules: [
          v => !!v || 'Обязательное поле',
          v => v.length >= 3 || 'Минимум 3 символа'
        ],
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      task () {
        return this.$store.getters.task
      },
    },
    methods: {
      async saveNewTaskTitle () {
        if (this.$refs.form.validate()) {
          const newTitle = {
            title: this.taskName.trim(),
            id: this.task.id,
            columnId: this.columnId,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          const res = await dispatch('updateTaskTitle', newTitle)
          if (res === 1) {
            this.update = false
          }
          commit('setLoading', false)
        }
      },
      updateForm () {
        this.update = true
        this.taskName = this.task.title
      },
    }
  }
</script>

<style scoped>
    .w100 {
        width: 100%;
    }
</style>
