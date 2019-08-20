<template>
    <div>
        <div
                @click="fetchList"
        >
            {{list.title}}
        </div>

        <v-dialog
                v-model="dialog"
                width="700"
        >
            <v-card>
                <v-card-title
                        class="headline  lighten-2"
                >
                    <update-list-title
                            :columnId="columnId"
                            :id="list.id"
                            :listTitle="list.title"
                            :list="list"
                    ></update-list-title>
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
                        <list-items :list="list"></list-items>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
  import UpdateListTitle from './UpdateListTitle'
  import ListItems from './ListItems'

  export default {
    name: 'ListBox',
    components: {
      UpdateListTitle,
      ListItems
    },
    props: ['list', 'columnId'],
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
    },
    methods: {
      async fetchList () {
        const {commit, dispatch} = this.$store
        this.dialog = !this.dialog
        this.loadingLocal = true
        commit('setLoading', true)
        await dispatch('fetchList', this.list.id)
        this.loadingLocal = false
        commit('setLoading', false)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
