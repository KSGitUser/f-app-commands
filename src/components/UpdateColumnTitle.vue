<template>
    <div class="bg pa-3">

        <v-flex v-if="!update">

            <div>
                <div class="title align-start" style="display: flex">
                    {{column.title}}
                    <v-spacer></v-spacer>
                    <v-btn
                            class="ma-0"
                            icon
                            small
                            :disabled="loading"
                            @click="updateForm"
                    >
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                </div>
                <hr class="mt-2">
            </div>

        </v-flex>


        <v-flex style="display: flex" v-else>
            <v-form
                    class="w100"
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-text-field
                        name="name"
                        label="Столбец"
                        type="text"
                        v-model="columnName"
                        required
                        :rules="columnNameRules"
                        @keypress.enter.prevent
                ></v-text-field>
            </v-form>
            <!--<v-card-actions>-->
                <!--<v-spacer></v-spacer>-->
            <v-card-actions>
                <v-btn
                        icon
                        small
                        v-if="columnName.trim() !== column.title.trim()"
                        @click="saveNewColumnTitle"
                        :loading="loading"
                        :disabled="loading"
                >
                    <v-icon>done</v-icon>
                </v-btn>
                <v-btn
                        icon
                        small
                        @click="update=false"
                        :loading="loading"
                        :disabled="loading"
                >
                    <v-icon>reply</v-icon>
                </v-btn>
            </v-card-actions>

            <!--</v-card-actions>-->
        </v-flex>
    </div>
</template>

<script>
  export default {
    props: ['column'],
    name: 'UpdateColumnTitle',
    data () {
      return {
        update: false,
        columnName: '',
        valid: false,
        columnNameRules: [
          v => !!v || 'Заголовок не может быть пустым',
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
      async saveNewColumnTitle () {
        if (this.$refs.form.validate()) {
          const column = {
            title: this.columnName.trim(),
            id: this.column.id,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          await dispatch('updateColumnTitle', column)
          this.update = false
          commit('setLoading', false)
        }
      },
      updateForm () {
        this.update = true
        this.columnName = this.column.title
      },
    }
  }
</script>

<style scoped>
.w100{
    width: 100%;
}
</style>
