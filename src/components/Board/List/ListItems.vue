<template>
    <div>
        <v-card>
            <v-list>
                <v-list-tile>

                    <v-list-tile-content>
                        <v-list-tile-title>Добавить список задач</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn
                                icon
                                @click="inputNewListItem=!inputNewListItem"
                        >
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card>
        <v-divider></v-divider>

        <v-flex v-if="inputNewListItem">
            <div class="pa-2" style="display: flex">
                <v-flex>
                    <div style="display: flex">

                        <v-form
                                class="inputListItem"
                                ref="formListItem"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-text-field
                                    name="labelName"
                                    label="Новый список задач"
                                    type="text"
                                    v-model="listItemName"
                                    required
                                    :rules="listItemRules"
                                    @keypress.enter.prevent
                                    @keypress.enter="addListItem"
                                    :autofocus="true"
                            ></v-text-field>
                        </v-form>

                        <v-card-actions>
                            <v-btn
                                    icon
                                    small
                                    @click="addListItem"
                                    :loading="loading"
                                    :disabled="loading"
                            >
                                <v-icon>done</v-icon>
                            </v-btn>
                            <v-btn
                                    icon
                                    small
                                    @click="inputNewListItem=!inputNewListItem"
                                    :disabled="loading"
                            >
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </div>
                </v-flex>
            </div>
            <v-divider></v-divider>
        </v-flex>

        <v-flex v-if="updateTitle">
            <div class="pa-2" style="display: flex">
                <v-flex>
                    <div style="display: flex">
                        <v-form class="inputListItem"
                                ref="formUpdateListItemTitle"
                                lazy-validation
                        >
                            <v-text-field
                                    name="listItemName"
                                    label="Новое название"
                                    type="text"
                                    v-model="updateListItemName"
                                    required
                                    :rules="listItemRules"
                                    @keypress.enter.prevent
                                    @keypress.enter="updateListItemTitle"
                            ></v-text-field>
                        </v-form>

                        <v-card-actions>
                            <v-btn
                                    icon
                                    small
                                    @click="updateListItemTitle"
                                    :loading="loading"
                                    :disabled="loading"
                            >
                                <v-icon>done</v-icon>
                            </v-btn>
                            <v-btn
                                    icon
                                    small
                                    @click="updateTitle = !updateTitle"
                                    :disabled="loading"
                            >
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-card-actions>

                    </div>
                </v-flex>
            </div>
            <v-divider></v-divider>
        </v-flex>


        <v-list>
            <v-list-tile
                    v-for="listItem in listItems"
                    :key="listItem.id"
            >
                <v-flex>
                    <v-list-tile-action>
                        <v-checkbox
                                :input-value="listItemExecution(listItem.id)"
                                :label="listItem.title"
                                @change="updateListItemExecution(listItem.id, listItem.execution)"
                        ></v-checkbox>
                    </v-list-tile-action>
                </v-flex>

                <v-btn
                        icon
                        @click="updateListItemForm(listItem.id)"
                >
                    <v-icon>edit</v-icon>
                </v-btn>

            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
  export default {
    name: 'ListItems',
    props: ['list'],
    data: () => ({
      inputNewListItem: false,
      updateTitle: false,
      valid: false,
      listItemName: '',
      updateListItemName: '',
      updateListItemId: '',
      listItemRules: [
        v => !!v || 'Название не может быть пустым',
        v => v.length >= 1 || 'Минимум 1 символ'
      ],
    }),
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      listItems () {
        return this.$store.getters.listItems
      },
      listItemExecution () {
        return this.$store.getters.listItemExecution
      }
    },
    methods: {
      async addListItem () {
        if (this.$refs.formListItem.validate()) {
          const newListItem = {
            title: this.listItemName.trim(),
            id_list: this.list.id,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          const listItem = await dispatch('createListItem', newListItem)
          if (listItem === 1) {
            this.listItemName = ''
            this.inputNewListItem = !this.inputNewListItem
          }
          commit('setLoading', false)
        }
      },
      updateListItemForm (id) {
        this.updateTitle = true
        const idx = this.listItems.findIndex(el => +el.id === +id)
        this.updateListItemName = this.listItems[idx].title
        this.updateListItemId = id
      },
      async updateListItemTitle () {
        if (this.$refs.formUpdateListItemTitle.validate()) {
          const newData = {
            title: this.updateListItemName.trim(),
            id: +this.updateListItemId,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          const listItem = await dispatch('updateListItemTitle', newData)
          if (listItem === 1) {
            this.updateTitle = false
          }
          commit('setLoading', false)
        }
      },
      async updateListItemExecution (id, execution) {
        if (execution === 1) {
          execution = 0
        } else execution = 1

        const Data = {
          id,
          execution,
        }
        const {commit, dispatch} = this.$store
        commit('setLoading', true)
        const result = await dispatch('updateListItemExecution', Data)
        if (result === 1) {
          commit('setLoading', false)
        }
      }
    }
  }
</script>

<style scoped>
    .inputListItem {
        width: 100%;
    }
</style>
