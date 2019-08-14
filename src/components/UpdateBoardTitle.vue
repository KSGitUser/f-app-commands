<template>
    <v-flex class="pa-2">
        <div style="display: flex">
            <v-flex>
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                    <v-text-field
                            name="name"
                            :label="boardTitle"
                            type="text"
                            v-model="boardName"
                            required
                            :rules="boardNameRules"
                            @keypress.enter.prevent
                    ></v-text-field>
                </v-form>
            </v-flex>

            <v-btn
                    icon
                    fab
                    @click="saveNewBoardTitle"
                    :loading="loading"
                    :disabled="loading"
            >
                <v-icon>edit</v-icon>
            </v-btn>
        </div>
    </v-flex>
</template>

<script>
  export default {
    name: 'UpdateBoardTitle',
    data () {
      return {
        boardName: '',
        valid: false,
        boardNameRules: [
          v => !!v || 'Название доски не может быть пустым',
          v => v.length >= 3 || 'Минимум 3 символа'
        ],
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      boardTitle () {
        return this.$store.getters.boardTitle
      },
      boardId () {
        return this.$store.getters.boardId
      },
    },
    methods: {
      async saveNewBoardTitle () {
        if (this.$refs.form.validate()) {
          const board = {
            title: this.boardName.trim(),
            id_board: this.boardId,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          await dispatch('updateBoardTitle', board)
          commit('setBoardTitle', this.boardName)
          commit('setLoading', false)
        }
      }
    }
  }
</script>

<style scoped>

</style>
