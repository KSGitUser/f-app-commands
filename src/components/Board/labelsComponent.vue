<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" scrollable max-width="300">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>label</v-icon>
                </v-btn>
            </template>
            <v-card>

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
                <v-divider></v-divider>

                <V-flex v-if="inputNewLabel">
                    <div class="pa-3" style="margin: -15px 0">
                        <v-flex>
                            <div>

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
                                            :loading="loading"
                                            :disabled="loading"
                                            :autofocus="true"
                                            @keypress.enter="addLabels"
                                    ></v-text-field>
                                </v-form>

                                <v-card-actions
                                        style="margin-top: -20px"
                                        v-if="!loading"
                                >
                                    <v-spacer></v-spacer>
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
                    <div class="pa-3" style="margin: -15px 0">
                        <v-flex>
                            <div>
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
                                            @keypress.enter="updateLabels"
                                            :loading="loading"
                                            :disabled="loading"
                                            :autofocus="true"
                                    ></v-text-field>
                                </v-form>

                                <v-card-actions
                                        style="margin-top: -20px"
                                        v-if="!loading"
                                >
                                    <v-spacer></v-spacer>
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

                <v-card-text class="pa-0 w100" style="max-height: 300px;">

                    <v-radio-group
                            v-if="labels.length !== 0"
                            v-model="labelActiv"
                    >
                        <v-list-tile
                                v-for="demo in labels"
                                :key="demo.id"
                        >
                            <v-btn
                                    style="margin: auto 0 auto -10px"
                                    icon
                                    @click="updateLabelForm(demo.id)"
                            >
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-radio
                                    :label="demo.title"
                                    :value="demo.id"
                            ></v-radio>

                        </v-list-tile>
                    </v-radio-group>

                    <v-list-tile
                            v-if="labels.length === 0"
                    >
                        <v-flex>
                            <v-list-tile-action>
                                Создайте первый ярлык
                            </v-list-tile-action>
                        </v-flex>
                    </v-list-tile>

                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions v-show="labels.length !== 0">
                    <v-switch
                            prepend-icon="filter_list"
                            v-model="filterOff"
                            label="Применить фильтр"
                    ></v-switch>
                </v-card-actions>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="dialog = false">Готово</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </v-layout>
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
      dialog: false,
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
      setFilterOff () {
        console.log('setFilterOff', this.filterOff)
        const {commit, dispatch} = this.$store
        commit('setFilterOff', !this.filterOff)
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
      labelActiv: {
        get () {
          return this.$store.state.labelActiv
        },
        set (value) {
          this.$store.commit('setLabelActiv', value)
        }
      },
      filterOff: {
        get () {
          return this.$store.state.filterOff
        },
        set (value) {
          this.$store.commit('setFilterOff', value)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
    .w100 {
        width: 100%;
    }
</style>
