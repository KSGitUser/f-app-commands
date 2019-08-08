<template>
    <div>

        <v-dialog
                v-model="boardDialog"
                max-width="500"
        >
            <v-card>
                <create-board></create-board>
            </v-card>
        </v-dialog>

        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Мои доски</h1>
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
                <div
                        v-else-if="boards.length!==0"
                >
                    <v-card
                            :to="`/board/${board.id}`"
                            v-for="board in boards"
                            :key="board.id"
                            class="elevation-10 mb-3"
                    >
                        <v-layout row>
                            <v-flex>
                                <v-card-text>
                                    <h2 class="text--primary">{{board.name}}</h2>
                                    <p>{{board.name}}</p>
                                </v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </div>
                <div v-else>
                    <h2>Пока пусто...</h2>
                </div>


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

    </div>
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
