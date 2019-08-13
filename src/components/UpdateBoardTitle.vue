<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Изменить название доски</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-text-field
                        name="name"
                        label="Ведите новое название доски"
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
                    @click="saveNewBoardTitle"
                    :loading="loading"
                    :disabled="loading"
            >Сохранить название доски
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                    color="warning"
                    @click="boardName=''"
            >Очистить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'UpdateBoardTitle',
    props: ['id'],
    data () {
      return {
        boardName: '',
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
      },
    },
    methods: {
      async saveNewBoardTitle () {
        if (this.$refs.form.validate()) {
          const board = {
            title: this.boardName.trim(),
            id_board: this.id,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          await dispatch('updateBoardTitle', board)
          this.boardName = ''
          commit('setLoading', false)
          await dispatch('saveBoardTitleToStore', board)
        }
      }
    }
  }
</script>

<style scoped>

</style>
