<template>

    <div v-if="!update" style="display: flex" class="w100">
        <div class="w100">
            <h4>
                {{listTitle}}
            </h4>
        </div>
        <div>
            <v-btn
                    @click="updateForm"
                    :disabled="loading"
                    icon
            >
                <v-icon>edit</v-icon>
            </v-btn>
        </div>

    </div>


    <v-layout
            class="w100"
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
                    v-model="listName"
                    required
                    :rules="listNameRules"
                    @keypress.enter.prevent
                    :autofocus="true"
            ></v-text-field>
        </v-form>

        <v-btn
                icon
                v-if="listTitle.trim() !== listName.trim()"
                @click="saveNewListTitle"
                :loading="loading"
                :disabled="loading"
        >
            <v-icon>done</v-icon>
        </v-btn>
        <v-btn
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
    name: 'UpdateListTitle',
    props: ['listTitle', 'columnId', 'id'],
    data () {
      return {
        update: false,
        listName: '',
        valid: false,
        listNameRules: [
          v => !!v || 'Обязательное поле',
          v => v.length >= 3 || 'Минимум 3 символа'
        ],
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
    },
    methods: {
      async saveNewListTitle () {
        if (this.$refs.form.validate()) {
          const newTitle = {
            title: this.listName.trim(),
            id: this.id,
            columnId: this.columnId,
          }
          const {commit, dispatch} = this.$store
          commit('setLoading', true)
          const res = await dispatch('updateListTitle', newTitle)
          if (res === 1) {
            this.update = false
          }
          commit('setLoading', false)
        }
      },
      updateForm () {
        this.update = true
        this.listName = this.listTitle
      },
    }
  }
</script>

<style scoped>
    .w100 {
        width: 100%;
    }
</style>
