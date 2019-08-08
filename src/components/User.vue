<template>
    <v-layout row>
        <v-flex class="text-xs-center align-center">
            <h1 class="text--secondary mb-3">Профиль пользователя</h1>
            <div
                    v-if="loading"
                    class="text-xs-center align-center"
            >
                <v-progress-circular
                        :size="100"
                        :width="3"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </div>

            <div v-else>
                <pre>email: {{email}}</pre>
                <pre>login: {{login}}</pre>
                <pre>password: {{password}}</pre>
            </div>

        </v-flex>
    </v-layout>

</template>

<script>
  export default {
    name: 'User',
    mounted: function () {
      this.$nextTick(async () => {
        const {commit, dispatch} = this.$store
        await dispatch('profileUser')
      })
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      email () {
        return this.$store.getters.email
      },
      login () {
        return this.$store.getters.login
      },
      password () {
        return this.$store.getters.password
      },
    },
  }
</script>

<style scoped>

</style>
