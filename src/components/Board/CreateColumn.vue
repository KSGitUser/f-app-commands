<template>
    <div>
        <div v-if="!columnForm">
            <v-card-actions>
                <v-btn flat small @click="columnForm = !columnForm">
                    <v-icon>add</v-icon>
                    добавить столбец
                </v-btn>
            </v-card-actions>
        </div>

        <div class="pa-3" v-else>
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-textarea
                        name="title"
                        label="Ведите название столбца"
                        type="text"
                        v-model="columnTitle"
                        required
                        rows="1"
                        auto-grow
                        :loading="loading"
                        :disabled="loading"
                        :rules="columnTitleRules"
                        @keypress.enter.prevent
                        @keypress.enter="createNewColumn"
                        :autofocus="true"
                        @blur="columnForm=false"
                ></v-textarea>
            </v-form>
            <v-card-actions
                    v-if="!loading"
                    style="margin-top: -20px"
            >
                <v-spacer></v-spacer>
                <v-btn
                        icon
                        small
                        @click="columnForm=!columnForm"
                        :disabled="loading"
                >
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn
                        icon
                        small
                        @click="createNewColumn"
                        :loading="loading"
                        :disabled="loading"
                >
                    <v-icon>done</v-icon>
                </v-btn>
            </v-card-actions>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'CreateColumn',
    props: ['id'],
    data () {
      return {
        columnForm: false,
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
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
