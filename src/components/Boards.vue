<template>
    <v-container grid-list-lg>

        <v-dialog
                v-model="boardDialog"
                max-width="500"
        >
            <v-card>
                <create-board></create-board>
            </v-card>
        </v-dialog>


        <v-layout row>
            <v-flex xs12>
                <h1 class="text--secondary mb-3">Мои доски</h1>

                <!--загрузка данных-->
                <div
                        v-if="loadingLocal"
                        class="text-xs-center align-center"
                >
                    <v-progress-circular
                            :size="100"
                            :width="3"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </div>

                <!--если нет записей -->
                <div v-else-if="boards.length===0">
                    <h2>Пока пусто...</h2>
                </div>

                <!--список досок-->
                <v-layout
                        v-else
                        row
                        wrap
                >

                    <v-flex
                            d-flex
                            xs12
                            sm6
                            md4
                            lg3
                            v-for="board in boards"
                            :key="board.id"
                    >
                        <v-hover>
                            <v-card
                                    :to="`/board/${board.id}`"
                                    slot-scope="{ hover }"
                                    :class="`elevation-${hover ? 12 : 2}`">
                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">{{board.name}}</h3>
                                    </div>
                                </v-card-title>
                            </v-card>
                        </v-hover>

                    </v-flex>
                </v-layout>

                <!--добавление новых досок -->
                <div class="toggleBoardDialog">
                    <v-btn
                            @click="toggleBoardDialog"
                            fab
                            dark
                            color="primary"
                    >
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </div>

            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
  import CreateBoard from './CreateBoard'

  export default {
    name: 'Boards',
    components: {
      CreateBoard
    },
    computed: {
      boards () {
        return this.$store.getters.boards
      },
      loading () {
        return this.$store.getters.loading
      },
      boardDialog () {
        return this.$store.getters.boardDialog
      },
    },
    data () {
      return {
        dialog: false,
        loadingLocal: false,
      }
    },
    methods: {
      toggleBoardDialog () {
        this.$store.dispatch('toggleBoardDialog')
      },
    },
    mounted: function () {
      this.$nextTick(async () => {
        const {commit, dispatch} = this.$store
        this.loadingLocal = true
        await dispatch('fetchBoards')
        this.loadingLocal = false
      })
    },
  }
</script>
<style lang="scss" scoped>
    .toggleBoardDialog {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
    }
</style>
