<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Создать доску</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="toggleBoardDialog">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-form
                ref="boardForm"
            >
                <v-text-field
                    name="name"
                    label="Ведите название доски"
                    type="text"
                    v-model="boardName"
                    required
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="primary"
                @click="createNewBoard"
            >Создать доску: "{{ boardName !== '' ? boardName : 'Новая доска' }}"
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                @click="reset"
            >Очистить форму
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'CreateBoard',
    data () {
      return {
        boardName: 'Новая доска',
      }
    },
    methods: {
      toggleBoardDialog () {
        this.$store.dispatch('toggleBoardDialog')
      },
      reset () {
        this.$refs.boardForm.reset()
        this.boardName = ''
      },
      createNewBoard () {
        const board = {
          name: this.boardName.trim(),
        }
        if (this.boardName === '') {
          board.name = 'Новая доска'
        }
        this.$store.dispatch('createBoard', board)
          .then(() => {
            this.$store.dispatch('toggleBoardDialog')
            this.$nextTick(() => this.$store.dispatch('fetchBoards'))
          })
          .catch(() => {})
      }
    },
  }
</script>

<style scoped>

</style>
