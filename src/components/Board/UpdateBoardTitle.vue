<template>

    <div v-if="!update">
        <v-toolbar-title>
            <v-btn
                    @click="updateForm"
                    :loading="loading"
                    :disabled="loading"
                    icon
            >
                <v-icon>more_vert</v-icon>
            </v-btn>
            {{boardTitle}}
        </v-toolbar-title>
    </div>


    <v-layout
            class="w100 mw500"
            v-else
    >
        <v-form
                class="w100"
                ref="form"
                v-model="valid"
                lazy-validation
        >
            <v-text-field
                    class="w100"
                    name="name"
                    type="text"
                    v-model="boardName"
                    required
                    :loading="loading"
                    :disabled="loading"
                    :rules="boardNameRules"
                    @keypress.enter.prevent
                    @keypress.enter="saveNewBoardTitle"
                    :autofocus="true"
            ></v-text-field>
        </v-form>

        <v-btn
                icon
                v-if="boardTitle.trim() !== boardName.trim() && !loading"
                @click="saveNewBoardTitle"
                :loading="loading"
                :disabled="loading"
        >
            <v-icon>done</v-icon>
        </v-btn>
        <v-btn
                v-if="!loading"
                icon
                @click="update=false"
                :disabled="loading"
        >
            <v-icon>reply</v-icon>
        </v-btn>
    </v-layout>

</template>

<script>
  export default {
    name: 'UpdateBoardTitle',
    data () {
      return {
        update: false,
        boardName: '',
        valid: false,
        boardNameRules: [
          v => !!v || 'Обязательное поле',
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
      async saveNewBoardTitle () {
        if (this.$refs.form.validate()) {
          const board = {
            title: this.boardName.trim(),
            id_board: this.boardId,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          await dispatch('updateBoardTitle', board)
          commit('setBoardTitle', this.boardName)
          this.update = false
          commit('setLoading', false)
        }
      },
      updateForm () {
        this.update = true
        this.boardName = this.boardTitle
      },
    }
  }
</script>

<style scoped>
    .w100 {
        width: 100%;
    }

    .mw500 {
        max-width: 500px;
    }
</style>
