<template>

    <div v-if="!update" style="display: flex;" class="w100 pa-3">
        <div
                @click="updateForm"
                :disabled="loading"
                class="w100"
                style="margin-bottom: -20px; cursor: pointer"
        >
            <p class="subtitle-1">
                <v-icon small>label</v-icon>
                Ярлыки
            </p>
            <v-chip
                    outline
                    color="primary"
                    v-for="(label, idx) in labelsList"
                    :key="idx"
                    v-if="label !== -1"

            >
                {{labels[idx].title}}
            </v-chip>
        </div>
        <!--<div>-->
            <!--<v-btn-->
                    <!--@click="updateForm"-->
                    <!--:disabled="loading"-->
                    <!--icon-->
            <!--&gt;-->
                <!--<v-icon>edit</v-icon>-->
            <!--</v-btn>-->
        <!--</div>-->
    </div>

    <div
            class="w100 pa-3"
            v-else
    >
        <p class="subtitle-1">
            <v-icon small>label</v-icon>
            Ярлыки
        </p>
        <v-form class="w100">
            <v-autocomplete
                    class="w100"
                    v-model="labelsTask"
                    :items="labels"
                    label="Ярлыки"
                    item-text="title"
                    item-value="id"
                    :loading="loading"
                    :disabled="loading"
                    :autofocus="true"
                    multiple
                    @keypress.enter.prevent
                    @keypress.enter="saveTaskLabels"
            >
                <template v-slot:selection="data">
                    <v-chip
                            :selected="data.selected"
                            close
                            @input="remove(data.item)"
                    >
                        {{data.item.title}}
                    </v-chip>
                </template>
                <template v-slot:item="data">
                    <div>{{data.item.title}}</div>
                </template>
            </v-autocomplete>


        </v-form>
        <v-card-actions v-if="!loading" style="margin-top: -20px; margin-bottom: -20px">
            <v-spacer></v-spacer>

            <v-btn
                    icon
                    small
                    @click="update=false"
                    :disabled="loading"
            >
                <v-icon>close</v-icon>
            </v-btn>
            <v-btn
                    icon
                    small
                    @click="saveTaskLabels"
                    :loading="loading"
                    :disabled="loading"
            >
                <v-icon>done</v-icon>
            </v-btn>
        </v-card-actions>

    </div>

</template>

<script>
  export default {
    name: 'UpdateTaskLabels',
    props: ['columnId'],
    data () {
      return {
        update: false,
        labelsTask: [],
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      task () {
        return this.$store.getters.task
      },
      labels () {
        return this.$store.getters.labels
      },
      labelsList () {
        if (this.task.labels) {
          return this.labels.map(ll => this.task.labels.indexOf(ll.id))
        }
        return []
      },
    },
    methods: {
      async saveTaskLabels () {
        const newLabels = {
          labels: this.labelsTask,
          id: this.task.id,
          columnId: this.columnId,
        }
        const {commit, dispatch} = this.$store
        commit('setLoading', true)
        const res = await dispatch('updateTaskLabels', newLabels)
        if (res === 1) {
          this.update = false
        }
        commit('setLoading', false)
      },
      updateForm () {
        this.labelsTask = this.task.labels
        this.update = true
      },
      remove (item) {
        console.log(this.labelsTask, item)
        this.labelsTask = this.labelsTask.filter(el => +el !== +item.id)
      }
    }
  }
</script>

<style scoped>
    .w100 {
        width: 100%;
    }
</style>
