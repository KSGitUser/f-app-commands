<template>
    <div>
        <div v-if="!update" class="w100 pa-3">
            <div style="display: flex">
                <div class="w100">
                    <h4>Описание</h4>

                    <textarea v-if="task.description !== ''"
                              style="overflow: hidden; resize: none; overflow-wrap: break-word"
                              ref="textarea"
                              class="w100"
                              disabled
                              v-model="task.description"
                    ></textarea>
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

        </div>

        <div
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
                        auto-grow
                        :outline="!loading"
                        :loading="loading"
                        v-model="description"
                        :rules="taskDescriptionRules"
                        :autofocus="true"
                ></v-textarea>
            </v-form>

            <v-card-actions style="margin: -20px 0 -10px 0">
                <v-spacer></v-spacer>
                <v-btn
                        icon
                        v-if="description.trim() !== task.description.trim()"
                        @click="saveNewTaskDescription"
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
    </div>


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
    },
    mounted () {
      if (this.$refs.textarea) {
        this.$refs.textarea.style.minHeight = this.$refs.textarea.scrollHeight + 'px'
      }
    },
    updated () {
      if (this.$refs.textarea) {
        this.$refs.textarea.style.minHeight = this.$refs.textarea.scrollHeight + 'px'
      }
    },
  }
</script>

<style scoped>
    .w100 {
        width: 100%;
    }
</style>
