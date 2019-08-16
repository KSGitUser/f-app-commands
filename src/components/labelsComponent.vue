<template>
    <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
    >
        <template v-slot:activator="{ on }">
            <v-btn
                    v-on="on"
                    icon
            >
                <v-icon>bookmark_border</v-icon>
            </v-btn>
        </template>

        <v-card>

            <v-list>
                <v-list-tile>

                    <v-list-tile-content>
                        <v-list-tile-title>Ярлыки</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn
                                icon
                                @click="inputNewLabel=!inputNewLabel"
                        >
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>


            <V-flex v-if="inputNewLabel">
                <div class="pa-2" style="display: flex">
                    <v-flex>
                        <div style="display: flex">

                            <v-form
                                    class="w100"
                                    ref="formNewLabel"
                                    v-model="valid"
                                    lazy-validation
                            >
                                <v-text-field
                                        name="labelName"
                                        label="Новый ярлык"
                                        type="text"
                                        v-model="labelName"
                                        required
                                        :rules="labelNameRules"
                                        @keypress.enter.prevent
                                        :autofocus="true"
                                ></v-text-field>
                            </v-form>

                            <v-card-actions>
                                <v-btn
                                        icon
                                        small
                                        @click="addLabels"
                                        :loading="loading"
                                        :disabled="loading"
                                >
                                    <v-icon>done</v-icon>
                                </v-btn>
                                <v-btn
                                        icon
                                        small
                                        @click="inputNewLabel=!inputNewLabel"
                                        :loading="loading"
                                        :disabled="loading"
                                >
                                    <v-icon>close</v-icon>
                                </v-btn>
                            </v-card-actions>

                        </div>
                    </v-flex>
                </div>
                <v-divider></v-divider>
            </V-flex>

            <V-flex v-if="inputUpdateLabel">
                <div class="pa-2" style="display: flex">
                    <v-flex>
                        <div style="display: flex">
                            <v-form class="w100"
                                    ref="formUpdateLabel"
                                    lazy-validation
                            >
                                <v-text-field
                                        name="labelName"
                                        label="Новое название"
                                        type="text"
                                        v-model="UpdatelabelName"
                                        required
                                        :rules="labelNameRules"
                                        @keypress.enter.prevent
                                ></v-text-field>
                            </v-form>

                            <v-card-actions>
                                <v-btn
                                        icon
                                        small
                                        @click="updateLabels"
                                        :loading="loading"
                                        :disabled="loading"
                                >
                                    <v-icon>done</v-icon>
                                </v-btn>
                                <v-btn
                                        icon
                                        small
                                        @click="inputUpdateLabel = !inputUpdateLabel"
                                        :loading="loading"
                                        :disabled="loading"
                                >
                                    <v-icon>close</v-icon>
                                </v-btn>
                            </v-card-actions>

                        </div>
                    </v-flex>
                </div>
                <v-divider></v-divider>
            </V-flex>


            <v-list>
                <v-list-tile
                        v-for="demo in labels"
                        :key="demo.id"
                >
                    <v-flex>
                        <v-list-tile-action>
                            <v-checkbox
                                    v-model="demo.off"
                                    :label="demo.title"
                            ></v-checkbox>
                        </v-list-tile-action>
                    </v-flex>

                    <v-btn
                            icon
                            @click="updateLabelForm(demo.id)"
                    >
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-list-tile>

                <v-list-tile
                        v-if="labels.length === 0"
                >
                    <v-flex>
                        <v-list-tile-action>
                            Создайте первый ярлык
                        </v-list-tile-action>
                    </v-flex>
                </v-list-tile>

            </v-list>


            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="menu = false">Готово</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>


<script>
  export default {
    data: () => ({
      fav: true,
      valid: false,
      menu: false,
      inputNewLabel: false,
      inputUpdateLabel: false,
      message: false,
      hints: true,
      activeLabelUpdate: null,
      labelName: '',
      UpdatelabelName: '',
      UpdatelabelId: '',
      labelNameRules: [
        v => !!v || 'Название не может быть пустым',
        v => v.length >= 3 || 'Минимум 3 символа'
      ],
    }),
    methods: {
      async addLabels () {
        if (this.$refs.formNewLabel.validate()) {
          const newLabel = {
            title: this.labelName.trim(),
            id_board: this.idBoard
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          const label = await dispatch('createLabel', newLabel)
          if (label === 1) {
            this.labelName = ''
            this.inputNewLabel = !this.inputNewLabel
          }
          commit('setLoading', false)
        }
      },
      updateLabelForm (id) {
        this.inputUpdateLabel = true
        this.activeLabelUpdate = id
        const idx = this.labels.findIndex(el => +el.id === +id)
        this.UpdatelabelName = this.labels[idx].title
        this.UpdatelabelId = this.labels[idx].id
      },
      async updateLabels () {
        if (this.$refs.formUpdateLabel.validate()) {
          const newData = {
            title: this.UpdatelabelName.trim(),
            id: +this.UpdatelabelId,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          const idx = this.labels.findIndex(el => +el.id === +this.UpdatelabelId)
          const id_label = this.labels[idx].id
          const label = await dispatch('updateLabel', {newData, id_label})
          if (label === 1) {
            this.inputUpdateLabel = false
          }
          commit('setLoading', false)
        }
      },
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      labels () {
        return this.$store.getters.labels
      },
      idBoard () {
        return this.$store.getters.boardId
      },
    },
  }
</script>

<style lang="scss" scoped>
    .w100{
        width: 100%;
    }
</style>
