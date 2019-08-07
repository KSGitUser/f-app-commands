<template>
    <div>
        <div class="demo">
            <v-layout grey lighten-3 row align-center>
                <v-btn flat
                       @click="toggleBoardDialog">
                    <v-icon>add</v-icon>
                    добавить доску
                </v-btn>
                <v-dialog persistent
                          v-model="boardDialog"
                          max-width="500"
                >
                    <v-card>
                        <create-board></create-board>
                    </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
            </v-layout>

        </div>

        <h2>Доски пользователя</h2>

        <div
                v-if="loading"
                class="text-xs-center align-center"
        >
            <v-progress-circular
                    :size="70"
                    :width="3"
                    color="grue"
                    indeterminate
            ></v-progress-circular>
        </div>
        <div
                v-else-if="boards.length!==0"
        >

            <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card
                            v-for="board in boards"
                            :key="board.id"
                    >
                        <v-img
                                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                                aspect-ratio="2.75"
                        ></v-img>

                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{board.name}}</h3>
                                <div> {{  }}</div>
                            </div>
                        </v-card-title>

                    </v-card>
                </v-flex>
            </v-layout>

        </div>
        <div v-else>
            <h2>пока пусто...</h2>
        </div>
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
      }
    },
    methods: {
      toggleBoardDialog () {
        this.$store.dispatch('toggleBoardDialog')
      },
    },
    mounted: function () {
      this.$nextTick(() => this.$store.dispatch('fetchBoards'))
    },
  }
</script>
<style lang="scss" scoped>

</style>
