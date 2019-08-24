<template>
    <div>
        <!--<div class="subheading"-->
        <div class="title pa-1"
             @click="fetchTask"
        >
            {{task.title}}
            <div
                    style="display: flex; flex-wrap: wrap; margin-left: -2px; justify-content: flex-end"
                    class="mt-3"
            >
                <span
                        style="background: #e5e5e5; font-size: 12px; border-radius: 50px; margin: 2px; padding: 3px
                        3px; display: block"
                        v-for="(label, idx) in labelsList"
                        :key="idx"
                        v-if="label!==-1"

                >
                    {{labels[idx].title}}
                </span>
            </div>
        </div>

        <v-dialog
                v-model="dialog"
                width="700"
        >
            <v-card>
                <v-card-title
                        class="headline  lighten-2"
                >
                    <update-task-title :columnId="columnId" :id="task.id" :taskTitle="task.title"></update-task-title>
                </v-card-title>
                <div
                        v-if="loadingLocal"
                        class="text-xs-center align-center mt-5"
                >
                    <v-progress-circular
                            :size="100"
                            :width="3"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                    <br> <br> <br>
                </div>
                <div v-else>
                    <v-divider></v-divider>

                    <update-task-description></update-task-description>

                    <v-divider></v-divider>

                    <update-task-labels :columnId="columnId"></update-task-labels>

                    <v-card-actions
                        style="margin-top: -25px"
                    >
                        <v-spacer></v-spacer>
                        <v-btn flat @click="dialog = false">Закрыть</v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
  import UpdateTaskTitle from './UpdateTaskTitle'
  import UpdateTaskDescription from './UpdateTaskDescription'
  import UpdateTaskLabels from './UpdateTaskLabels'

  export default {
    name: 'TaskBox',
    components: {UpdateTaskLabels, UpdateTaskDescription, UpdateTaskTitle},
    props: ['task', 'columnId'],
    data () {
      return {
        dialog: false,
        columnTitle: '',
        valid: false,
        loadingLocal: false,
        columnTitleRules: [
          v => !!v || 'Обязательное поле',
          v => v.length >= 3 || 'Минимум 3 символа'
        ],
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      storeTask () {
        return this.$store.getters.task
      },
      labels () {
        return this.$store.getters.labels
      },
      labelsList () {
        if (this.task.labels) {
          return this.labels.map(el =>
            this.task.labels.indexOf(el.id))
        }
        return []
      },
    },
    methods: {
      // async createNewColumn () {
      //   if (this.$refs.form.validate()) {
      //     const column = {
      //       title: this.columnTitle.trim(),
      //       id_board: this.id,
      //     }
      //     const {commit, dispatch} = this.$store
      //     commit('setLoading', true)
      //     const res = await dispatch('createColumn', column)
      //     if (res === 1) {
      //       this.columnTitle = ''
      //       this.columnForm = false
      //     }
      //     commit('setLoading', false)
      //   }
      // },
      async fetchTask () {
        const {commit, dispatch} = this.$store
        this.dialog = !this.dialog
        this.loadingLocal = true
        commit('setLoading', true)
        await dispatch('fetchTask', this.task.id)
        this.loadingLocal = false
        commit('setLoading', false)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
