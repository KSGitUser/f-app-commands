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
                <pre>email: {{email}} | <v-btn @click="emailForm = true">изменить</v-btn></pre>
                <pre>login: {{login}}</pre>
                <pre>password: {{password}} | <v-btn @click="passwordForm = true">изменить</v-btn></pre>
            </div>

            <v-dialog
                    v-model="passwordForm"
                    max-width="500"
            >
                <v-card>
                    <update-password-form></update-password-form>
                </v-card>
            </v-dialog>

            <v-dialog
                    v-model="emailForm"
                    max-width="500"
            >
                <v-card>
                    <update-email-form></update-email-form>
                </v-card>
            </v-dialog>

        </v-flex>
    </v-layout>

</template>

<script>
  import UpdatePasswordForm from './UpdateUserPassword'
  import UpdateEmailForm from './UpdateUserEmail'

  export default {
    name: 'User',
    data () {
      return {
        passwordForm: false,
        emailForm: false,
      }
    },
    components: {UpdateEmailForm, UpdatePasswordForm},
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
