<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Создать столбец</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-text-field
                        name="title"
                        label="Ведите название столбца"
                        type="text"
                        v-model="columnTitle"
                        required
                        :rules="columnTitleRules"
                        @keypress.enter.prevent
                        :autofocus="true"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn
                    color="primary"
                    @click="createNewColumn"
                    :loading="loading"
                    :disabled="loading"
            >Создать столбец
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                    color="warning"
                    @click="columnTitle=''"
            >Очистить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'CreateColumn',
    props: ['id'],
    data () {
      return {
        columnTitle: '',
        valid: false,
        columnTitleRules: [
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
      //   toggleBoardDialog () {
      //     this.$store.dispatch('toggleBoardDialog')
      //   },
      async createNewColumn () {
        if (this.$refs.form.validate()) {
          const column = {
            title: this.columnTitle.trim(),
            id_board: this.id,
          }
          //console.log(column)
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          await dispatch('createColumn', column)
          this.columnTitle = ''
          commit('setLoading', false)
          await dispatch('fetchBoard', this.id)
        }
      }
    }
  }
</script>

<style scoped>

</style>
