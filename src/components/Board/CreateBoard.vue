<template>

    <div>
        <v-btn class="toggleBoardDialog"
               @click="boardDialog = !boardDialog"
               fab
               dark
               color="primary"
        >
            <v-icon dark>add</v-icon>
        </v-btn>

        <v-dialog
                v-model="boardDialog"
                max-width="500"
        >
            <v-card>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Создать доску</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-text-field
                                    name="name"
                                    label="Ведите название доски"
                                    type="text"
                                    v-model="boardName"
                                    required
                                    :rules="boardNameRules"
                                    @keypress.enter.prevent
                                    :autofocus="true"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                                color="primary"
                                @click="createNewBoard"
                                :loading="loading"
                                :disabled="loading"
                        >Создать доску
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="warning"
                                @click="boardName=''"
                        >Очистить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-card>
        </v-dialog>


    </div>


</template>

<script>
  export default {
    name: 'CreateBoard',
    data () {
      return {
        boardName: '',
        boardDialog: false,
        valid: false,
        boardNameRules: [
          v => !!v || 'Обязательное поле',
          v => v.length >= 3 || 'Минимум 3 символа'
        ],
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      toggleBoardDialog () {
        this.$store.dispatch('toggleBoardDialog')
      },
      async createNewBoard () {
        if (this.$refs.form.validate()) {
          const board = {
            title: this.boardName.trim(),
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          const newBoard = await dispatch('createBoard', board)
          if (newBoard === 1) {
            this.boardName = ''
            this.boardDialog = false
          }
          commit('setLoading', false)
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
    .toggleBoardDialog {
        position: fixed !important;
        bottom: 2rem;
        right: 2rem;
        z-index: 1;
    }
</style>

