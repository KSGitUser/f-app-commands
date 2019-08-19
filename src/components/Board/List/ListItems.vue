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

        <v-list>
            <v-list-tile
                    v-for="listItem in listItems"
                    :key="listItem.id"
            >
                <v-flex>
                    <v-list-tile-action>
                        <v-checkbox
                                v-model="listItemExecution"
                                :label="listItem.title"
                        ></v-checkbox>
                    </v-list-tile-action>
                </v-flex>

                <v-btn
                        icon
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
      listItemExecution: false,
      valid: false,
      listItemName: '',
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
      }
    }
  }
</script>

<style scoped>
    .inputListItem {
        width: 100%;
    }
</style>
