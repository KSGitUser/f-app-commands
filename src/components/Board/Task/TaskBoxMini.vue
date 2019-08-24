<template>
        <div class="title pa-1"
        >
            {{task.title}}
            <div
                    style="display: flex; flex-wrap: wrap; margin-left: -2px; justify-content: flex-end"
                    class="mt-3"
            >
                <span
                        style="background: #e5e5e5; font-size: 12px; border-radius: 50px; margin: 2px; padding: 3px
                        3px; display: block"
                        v-for="(label, idx) in labelsList"
                        :key="idx"
                        v-if="label!==-1"

                >
                    {{labels[idx].title}}
                </span>
            </div>
        </div>


</template>

<script>


  export default {
    name: 'TaskBoxMini',
    props: ['task'],
    computed: {
      labels () {
        return this.$store.getters.labels
      },
      labelsList () {
        if (this.task.labels) {
          return this.labels.map(el =>
            this.task.labels.indexOf(el.id))
        }
        return []
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
