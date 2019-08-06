<template>
    <div>
        <h2>Доски пользователя</h2>
        <pre>{{this.$store.dispatch('fetchBoards')}}</pre>
        <hr>
    </div>

</template>

<script>

  export default {
    name: 'Boards',
    computed: {
      boards () {
        return this.$store.getters.boards
      }
    },
    data () {
      return {
        //test:
      }
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>

</style>
