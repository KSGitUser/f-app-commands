<template>
    <div>
        <div
                @click="fetchTask"
        >
            {{task.title}}
        </div>

        <v-dialog
                v-model="dialog"
                width="700"
        >
            <v-card>
                <v-card-title
                        class="headline  lighten-2"
                >
                    {{task.title}}
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
                    <v-card-text>
                        <pre>{{storeTask}}</pre>
                    </v-card-text>
                </div>

                <!--<div class="pa-3" >-->
                <!--<v-form-->
                <!--ref="form"-->
                <!--v-model="valid"-->
                <!--lazy-validation-->
                <!--&gt;-->
                <!--<v-text-field-->
                <!--name="title"-->
                <!--label="Ведите название столбца"-->
                <!--type="text"-->
                <!--v-model="columnTitle"-->
                <!--required-->
                <!--:rules="columnTitleRules"-->
                <!--@keypress.enter.prevent-->
                <!--:autofocus="true"-->
                <!--&gt;</v-text-field>-->
                <!--</v-form>-->
                <!--<v-card-actions>-->
                <!--<v-spacer></v-spacer>-->
                <!--<v-btn-->
                <!--icon-->
                <!--small-->
                <!--@click="createNewColumn"-->
                <!--:loading="loading"-->
                <!--:disabled="loading"-->
                <!--&gt;-->
                <!--<v-icon>done</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn-->
                <!--icon-->
                <!--small-->
                <!--@click="columnForm=!columnForm"-->
                <!--:disabled="loading"-->
                <!--&gt;-->
                <!--<v-icon>close</v-icon>-->
                <!--</v-btn>-->
                <!--</v-card-actions>-->
                <!--</div>-->

            </v-card>
        </v-dialog>

    </div>
</template>

<script>
  export default {
    name: 'TaskBox',

    props: ['task'],
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
      }
    },
    methods: {
      async createNewColumn () {
        if (this.$refs.form.validate()) {
          const column = {
            title: this.columnTitle.trim(),
            id_board: this.id,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          const res = await dispatch('createColumn', column)
          if (res === 1) {
            this.columnTitle = ''
            this.columnForm = false
          }
          commit('setLoading', false)
        }
      },
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
