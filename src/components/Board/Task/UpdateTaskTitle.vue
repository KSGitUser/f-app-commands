<template>
    <div v-if="!update"
         @click="updateForm"
         :disabled="loading"
         style="display: flex; cursor: pointer"
         class="w100"
    >
        <div class="w100">
            <h4>
                {{taskTitle}}
            </h4>
        </div>
        <!--<div>-->
            <!--<v-btn-->
                    <!--@click="updateForm"-->
                    <!--:disabled="loading"-->
                    <!--icon-->
            <!--&gt;-->
                <!--<v-icon>edit</v-icon>-->
            <!--</v-btn>-->
        <!--</div>-->
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
                    auto-grow
                    label="Задача"
                    rows="1"
                    :rules="taskNameRules"
                    :loading="loading"
                    :disabled="loading"
                    :autofocus="true"
                    @keypress.enter="saveNewTaskTitle"
            ></v-textarea>
        </v-form>
        <v-card-actions v-if="!loading" style="margin-top: -20px; margin-bottom: -15px">
            <v-spacer></v-spacer>
            <v-btn
                    icon
                    @click="update=false"
                    :disabled="loading"
            >
                <v-icon>reply</v-icon>
            </v-btn>
            <v-btn
                    icon
                    v-if="taskTitle.trim() !== taskName.trim()"
                    @click="saveNewTaskTitle"
                    :loading="loading"
                    :disabled="loading"
            >
                <v-icon>done</v-icon>
            </v-btn>
        </v-card-actions>

    </div>

</template>

<script>
  export default {
    name: 'UpdateTaskTitle',
    props: ['taskTitle', 'columnId', 'id'],
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
    },
    methods: {
      async saveNewTaskTitle () {
        if (this.$refs.form.validate()) {
          const newTitle = {
            title: this.taskName.trim(),
            id: this.id,
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
        this.taskName = this.taskTitle
      },
    }
  }
</script>

<style scoped>
    .w100 {
        width: 100%;
    }
</style>
