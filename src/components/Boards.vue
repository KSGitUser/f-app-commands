<template>
    <div>
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
                                <div> {{ card_text }}</div>
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

  export default {
    name: 'Boards',
    computed: {
      boards () {
        return this.$store.getters.boards
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    data () {
      return {
        //test:
      }
    },
    mounted: function () {
      this.$nextTick(this.$store.dispatch('fetchBoards'))
    }
  }
</script>
<style lang="scss" scoped>

</style>
