<template>

    <div v-if="!update" style="display: flex" class="w100 pa-3">
        <div class="w100">
            <h4>Описание</h4>

            <p v-if="task.description !== ''">
                {{task.description}}
            </p>
            <p class="font-weight-thin" v-else>добавьте описание...</p>
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

    <v-layout
            class="w100 pa-3"
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
                    label="Описание"
                    v-model="description"
                    required
                    :rules="taskDescriptionRules"
                    :autofocus="true"
            ></v-textarea>
        </v-form>

        <div>

            <v-btn
                    icon
                    small
                    v-if="description.trim() !== task.description.trim()"
                    @click="saveNewTaskDescription"
                    :loading="loading"
                    :disabled="loading"
            >
                <v-icon>done</v-icon>
            </v-btn>
            <br>
            <v-btn
                    icon
                    small
                    @click="update=false"
                    :disabled="loading"
            >
                <v-icon>close</v-icon>
            </v-btn>
        </div>

    </v-layout>

</template>

<script>
  export default {
    name: 'UpdateTaskDescription',
    data () {
      return {
        update: false,
        description: '',
        valid: false,
        taskDescriptionRules: [
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
      async saveNewTaskDescription () {
        if (this.$refs.form.validate()) {
          const newDescription = {
            description: this.description.trim(),
            id: this.task.id,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          const res = await dispatch('updateTaskDescription', newDescription)
          if (res === 1) {
            this.update = false
          }
          commit('setLoading', false)
        }
      },
      updateForm () {
        this.description = this.task.description
        this.update = true
      },
    }
  }
</script>

<style scoped>
    .w100 {
        width: 100%;
    }
</style>
