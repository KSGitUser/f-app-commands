<template>
    <div class="pa-3">
        <v-btn
                v-if="!formAction"
                flat
                small
                @click="formAction=!formAction"
        >
            <v-icon>add</v-icon>
            добавить список
        </v-btn>

        <div v-else>
            <hr>
            <v-form

                    class="w100"
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-textarea
                        name="name"
                        label="Список"
                        type="text"
                        required
                        v-model="listTitle"
                        :rules="listTitleRules"
                        :autofocus="true"
                ></v-textarea>
            </v-form>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        icon
                        small
                        @click="addList"
                        :loading="loading"
                        :disabled="loading"
                >
                    <v-icon>done</v-icon>
                </v-btn>
                <v-btn
                        icon
                        small
                        @click="formAction=!formAction"
                        :disabled="loading"
                >
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-actions>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'CreateNewList',
    props: ['id'],
    data () {
      return {
        formAction: false,
        listTitle: '',
        valid: false,
        listTitleRules: [
          v => !!v || 'Заголовок не может быть пустым',
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
      async addList () {
        if (this.$refs.form.validate()) {
          const newList = {
            title: this.listTitle.trim(),
            id_column: this.id,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          console.log(newList)
          const res = await dispatch('createList', newList)
          if (res === 1) {
            this.formAction = false
            this.listTitle = ''
          }
          commit('setLoading', false)
        }
      },
    }
  }
</script>

<style scoped>
    .w100{
        width: 100%;
    }

</style>
